"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";
import { ScheduleContext } from "@/lib/scheduleContext";

import { Navigation } from "@/components/navigation.js";
import { Expenses } from "@/components/Expenses/Expenses";
import { PackingList } from "@/components/Packing/PackingList";
import { ViewSchedules } from "@/components/Schedule/ViewSchedules";

import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/datepicker";
import { Location } from "@/components/Schedule/Location";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);
  const {
    schedules,
    addDate,
    addSchedule,
    filteredDates,
    filteredSchedules,
    isFilterApplied,
    applyFilter,
    setIsFilterApplied,
  } = useContext(ScheduleContext);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);

  const addDateHandler = async (e) => {
    e.preventDefault();

    try {
      await addDate({ selectedDates });
    } catch (e) {
      console.log(e.message);
    }
  };

  const addScheduleHandler = async (e) => {
    e.preventDefault();

    if (!selectedDates) {
      console.log("No selected dates");
      return;
    }

    const newActivity = {
      id: uuidv4(),
      title: title,
      selectedLocation: selectedLocation,
      notes: notes,
    };

    try {
      await addSchedule(selectedDates, newActivity, user.uid);
      // Reset the form fields
      setTitle("");
      setNotes("");
      setSelectedLocation(null);
    } catch (e) {
      console.log("Error in Adding Activity: ", e);
    }
  };

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading, schedules]);

  return (
    <>
      <Navigation />

      <section className="mb-24 mt-4 px-4">
        <section>
          <h2 className="text-4xl font-bold">Schedule</h2>
        </section>

        {/* Modal Toggle */}
        <section className="mt-4">
          <form onSubmit={addScheduleHandler}>
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

        {/* Date Filters */}
        <section className="mt-4 flex items-center gap-2" type="button">
          <button onClick={() => setIsFilterApplied(false)}>
            <div className="flex h-[75px] items-center justify-center rounded-xl border px-6">
              <p className="text-md font-medium text-black">All</p>
            </div>
          </button>

          {filteredDates &&
            filteredDates.map((date, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => applyFilter(date)}
                >
                  <div className="flex h-[75px] flex-col items-center justify-center rounded-xl border px-6">
                    <p className="text-lg font-medium uppercase">{date.day}</p>
                    <p className="text-xs font-medium uppercase">
                      {date.month}
                    </p>
                  </div>
                </button>
              );
            })}

          <button type="button">
            <div className="flex h-[75px] items-center justify-center rounded-xl border px-6">
              <p className="text-sm font-medium uppercase ">
                <PlusCircle className="h-5 w-5 stroke-2 text-gray-400" />
              </p>
            </div>
          </button>
        </section>

        {/* List of Schedules */}
        <section>
          <div className="mb-8 mt-10 flex justify-between ">
            <h4 className="text-md font-medium  text-gray-800">
              All activities •
            </h4>
          </div>

          {isFilterApplied
            ? filteredSchedules.map((item, index) => (
                <ViewSchedules key={index} schedule={item} />
              ))
            : schedules.map((item, index) => (
                <ViewSchedules key={index} schedule={item} />
              ))}
        </section>
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
 * [x] Create the Schedule feature
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
