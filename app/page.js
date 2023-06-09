"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";
import { ScheduleContext } from "@/lib/scheduleContext";

import { Navigation } from "@/components/navigation.js";
import { Expenses } from "@/components/Expenses/Expenses";
import { PackingList } from "@/components/Packing/PackingList";
import { ViewSchedules } from "@/components/Schedule/ViewSchedules";

import { AddScheduleModal } from "@/components/Schedule/AddScheduleModal";
import { PlusCircle } from "lucide-react";

// import { Input } from "@/components/ui/input";
// import { DatePickerWithRange } from "@/components/ui/datepicker";
// import { Location } from "@/components/Schedule/Location";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// import { cn } from "@/lib/utils";
// import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);
  const {
    schedules,
    filteredDates,
    filteredSchedules,
    isFilterApplied,
    applyFilter,
    setIsFilterApplied,
  } = useContext(ScheduleContext);

  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  return (
    <>
      <Navigation />

      <AddScheduleModal
        onShow={showAddScheduleModal}
        onClose={() => setShowAddScheduleModal(false)}
      />

      <section className="mb-24 mt-4 px-4">
        {/* Add Schedule */}
        <section className="sticky top-0 pt-4 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between pb-3 ">
            <h2 className="text-xl font-medium">Schedule</h2>
            <div className="flex gap-4">
              {/* Modal Toggle */}
              <button
                data-modal-target="authentication-modal"
                className="flex  items-center   gap-2   rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                onClick={() => setShowAddScheduleModal(true)}
              >
                <PlusCircle className="h-5 w-5" /> Add Event
              </button>
            </div>
          </div>
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
 * [x] Install @react-google-maps/api & use-places-autocomplete
 * [x] Load Google Maps onto the website
 * [x] Apply Searchbox Input and generate Places
 *
 * [x] Create the Schedule feature
 *    [x] Schedule Input
 *        [x] Title form
 *        [x] Location form
 *        [x] Search addresses based on location input
 *            [x] Display an Interactive Map
 *            [ ] Apple Maps / Google Maps clickable link
 *
 *    [x] Filter Schedules
 *    [x] Delete a Schedule
 *    [ ] Edit the Schedule
 *
 * [x] Read user input from client (title, location, dates, etc.) and store into Firebase
 * [x] Read data from Firebase and display UI
 *
 *
 * Up Next.
 *
 * [ ] Refactor Modal to display desired design in Figma
 *
 * [x] Move Schedule form/input into a new component (AddScheduleModal)
 * [ ] Create two different Modals, one for adding and one for viewing.
 *
 *
 * [ ] Stress test, bug hunt; refactor and fix.
 */
