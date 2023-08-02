"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";
import { ScheduleContext } from "@/lib/scheduleContext";

import { Navigation } from "@/components/navigation.js";
import { Expenses } from "@/components/Expenses/Expenses";
import { PackingList } from "@/components/Packing/PackingList";
import { ScheduleItem } from "@/components/Schedule/ScheduleItem";

import { AddScheduleModal } from "@/components/Schedule/AddScheduleModal";
import { PlusCircle, XCircle } from "lucide-react";
import Header from "@/components/Header";

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
      <Header />
      <Navigation />

      <AddScheduleModal
        onShow={showAddScheduleModal}
        onClose={() => setShowAddScheduleModal(false)}
      />

      <section className="mb-24 mt-4 px-4" id="schedules">
        {/* Add Schedule */}
        <section className="sticky top-0 pt-4 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between pb-3 ">
            <h2 className="text-3xl font-medium">Schedule</h2>
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

        {/* <section>
          <div className="my-5 flex items-center justify-between rounded-lg bg-amber-100 p-5">
            <p className="text-xs leading-snug">
              * Displays all the potential events and activites that you can
              take + relative photos and dynamic links that navigate you.
            </p>
            <XCircle className="h-5 w-5 flex-shrink-0" />
          </div>
        </section> */}

        {/* Date Filters */}
        <section
          className="mt-8 flex items-center gap-3 overflow-x-auto p-0.5"
          type="button"
        >
          <button onClick={() => setIsFilterApplied(false)}>
            <div className="flex h-[75px]  items-center justify-center rounded-xl border border-gray-100 px-5 shadow">
              <p className="text-sm font-medium ">All</p>
            </div>
          </button>

          {filteredDates &&
            filteredDates.map((date, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className=""
                  onClick={() => applyFilter(date)}
                >
                  <div className="flex h-[75px] flex-col items-center justify-between rounded-xl border border-gray-100 px-5 py-3 shadow">
                    <p className="text-xs font-medium">{date.month}</p>
                    <p className="text-sm font-medium uppercase ">{date.day}</p>
                  </div>
                </button>
              );
            })}

          <button type="button">
            <div className="flex h-[75px] items-center justify-center rounded-xl border border-dashed border-gray-200 px-5">
              {/* Set Dates Input */}
              <p className="text-sm font-medium uppercase ">
                <PlusCircle className="h-4 w-4 text-gray-400" strokeWidth={2} />
              </p>
            </div>
          </button>
        </section>

        {/* List of Schedules */}
        <section>
          <div className="mb-10 mt-10 flex justify-between ">
            <h4 className="text-lg font-medium  text-gray-800">
              All activities
            </h4>
          </div>

          {isFilterApplied
            ? filteredSchedules.map((item, index) => (
                <ScheduleItem key={index} schedule={item} position={index} />
              ))
            : schedules.map((item, index) => (
                <ScheduleItem key={index} schedule={item} position={index} />
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
 *            [x] Apple Maps / Google Maps clickable link
 *        [x] Date & Time Picker
 *
 *    [x] Filter Schedules
 *    [x] Delete a Schedule
 *    [ ] Edit the Schedule
 *
 * [x] Read user input from client (title, location, dates, etc.) and store into Firebase
 * [x] Read data from Firebase and display UI
 *
 * [x] Refactor Modal to display desired design in Figma
 * [x] Move Schedule form/input into a new component (AddScheduleModal)
 * [x] Create two different Modals, one for adding and one for viewing.
 *
 * [x] Create the Packing List Feature
 * [x] Improve UI
 * [x] Input for who's bringing what.
 * [x] Colored Categories
 * [x] Reminder to Buy
 * [x] Refactor Styling to be more simple and clean.
 *
 *
 *
 * Up Next.
 *
 * [ ] Change Login / Logout UI
 * [ ] Create list of color presets
 *      [ ] Add + button that displays color input for customization
 * 
 * 
 *
 *
 * [ ] Stress test, bug hunt; refactor and fix.
 * [ ] Optimize Read and Writes for Application
 */
