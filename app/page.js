"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";
import { ScheduleContext } from "@/lib/scheduleContext";

import { Navigation } from "@/components/navigation.js";
import { Expenses } from "@/components/Expenses/Expenses";
import { PackingList } from "@/components/Packing/PackingList";

import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/datepicker";
import { Location } from "@/components/Schedule/Location";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ViewSchedules } from "@/components/Schedule/ViewSchedules";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);
  const { schedule, addSchedule } = useContext(ScheduleContext);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduleData = {
      title,
      selectedLocation,
      selectedDates,
      notes,
    };

    await addSchedule(scheduleData);
  };

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  return (
    <>
      <Navigation />

      <section className="mb-24 mt-4 px-4">
        <section>
          <h2 className="text-4xl font-bold">Schedule</h2>
        </section>

        {/* Modal Toggle */}
        <section className="mt-4">
          <form onSubmit={handleSubmit}>
            <label className="leading-2 text-xs">Title</label>
            <div className="my-2 flex items-center gap-4">
              <Input
                type="text"
                placeholder="What are you thinking of doing?..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Maps & Places API */}
            <div className="h-full w-full">
              <label className="leading-2 text-xs">Location</label>
              <Location
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            </div>

            {/* Search Results */}
            <div className="mt-4">
              <p className="leading-2 mb-2 text-xs">Dates</p>
              <DatePickerWithRange setSelectedDates={setSelectedDates} />
            </div>

            {/* Text Area */}
            <div className="mt-4">
              <p className="leading-2 mb-2 text-xs">Notes</p>
              <Textarea
                placeholder="Additional notes..."
                maxLength="250"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button className={cn("mt-4 w-full")} type="submit">
              Submit
            </Button>
          </form>
        </section>

        {/* List of Schedules */}

        {schedule &&
          schedule.map((item, index) => (
            <ViewSchedules key={index} schedule={item} />
          ))}
      </section>

      <Expenses />
      <PackingList />
    </>
  );
}

/**
 *
 * Be proud of what you've done.
 *
 * [x] Create a Packing Categroy similar to Expenses
 * [x] Read data from Firebase, store into app -> display UI
 * [x] Add item to an array of items within a Packing Category
 * [x] Delete Packing Category
 * [x] Delete an item from an array of items in Packing Category
 * [x] Add Checkbox state to Packing Items
 *
 *
 * Up Next.
 *
 * [x] Install @react-google-maps/api & use-places-autocomplete
 * [x] Load Google Maps onto the website
 * [x] Apply Searchbox Input and generate Places
 *
 *
 * [ ] Create the Schedule feature
 *    [x] Title form
 *    [x] Location form
 *    [x] Search addresses based on location input
 *        [x] Display an Interactive Map
 *        [ ] Apple Maps / Google Maps clickable link
 *
 *    [x] Delete a Schedule
 *    [ ] Edit the Schedule
 *
 *
 * [x] Read user input from client (title, location, dates, etc.) and store into Firebase
 * [x] Read data from Firebase and display UI
 * [ ] Stress test, bug hunt; refactor and fix.
 */
