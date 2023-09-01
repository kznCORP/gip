"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";
import { ScheduleContext } from "@/lib/scheduleContext";

import Header from "@/components/Header";
import { Navigation } from "@/components/navigation.js";
import { Expenses } from "@/components/Expenses/Expenses";
import { PackingList } from "@/components/Packing/PackingList";
import { ScheduleItem } from "@/components/Schedule/ScheduleItem";

import { AddScheduleModal } from "@/components/Schedule/AddScheduleModal";
import { PlusCircle, XCircle } from "lucide-react";

import { format } from "date-fns";

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
    selectedDate,
  } = useContext(ScheduleContext);

  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState("All");

  const [today, setToday] = useState(new Date());
  const formattedToday = format(today, "MMMM dd");

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  /**
   *
   *  To-Do:
   
   *
   *  [ ] Add media breakpoints for transitioning to Tablet View.
   *    [ ] Packing List
   *    [ ] Expenses
   *    [ ] Schedule
   *
   *
   */

  return (
    <>
      <Header />
      <Navigation />

      <AddScheduleModal
        onShow={showAddScheduleModal}
        onClose={() => setShowAddScheduleModal(false)}
      />

      <section className="mb-24 mt-4 px-4 " id="schedules">
        {/* Add Schedule */}
        <section className="sticky top-0 pt-4 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between pb-3 ">
            <h2 className="text-2xl font-medium">Schedule</h2>
            <div className="flex gap-4">
              {/* Modal Toggle */}
              <button
                data-modal-target="authentication-modal"
                className="flex  items-center   gap-2   rounded-full bg-blue-600  text-sm font-medium text-white"
                onClick={() => setShowAddScheduleModal(true)}
              >
                <PlusCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Date Filters */}
        <section
          className="mt-8 flex items-center gap-3 overflow-x-auto p-0.5"
          type="button"
        >
          <button
            onClick={() => {
              setIsFilterApplied(false);
              setSelectedDateFilter("All");
            }}
          >
            <div
              className={`flex h-[75px] w-[75px] items-center justify-center rounded-xl ${
                selectedDateFilter == "All"
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              <p className="font-medium ">All</p>
            </div>
          </button>

          {filteredDates &&
            filteredDates.map((date, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedDateFilter(date.day);
                    applyFilter(date);
                  }}
                >
                  <div
                    className={`flex h-[75px] w-[75px] flex-col items-center justify-center rounded-xl ${
                      selectedDateFilter == date.day
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    <p className="text-sm font-medium ">
                      {date.month.substring(0, 3)}
                    </p>
                    <p className="text-sm font-semibold uppercase ">
                      {date.day}
                    </p>
                  </div>
                </button>
              );
            })}

          <button type="button" onClick={() => setShowAddScheduleModal(true)}>
            <div className="flex h-[75px] w-[75px] items-center justify-center rounded-xl bg-white">
              <p className="text-sm font-medium uppercase ">
                <PlusCircle className="h-4 w-4" strokeWidth={2.5} />
              </p>
            </div>
          </button>
        </section>

        {/* Calendar */}
        <section>
          <div className="mt-16">
            {isFilterApplied ? (
              <div>
                <h2 className="text-4xl font-semibold text-stone-700">
                  {selectedDate.dateName},
                </h2>
                <h2 className="text-4xl font-semibold text-blue-600">
                  {selectedDate.month} {selectedDate.day}
                </h2>
              </div>
            ) : (
              <div>
                <h2 className="text-4xl font-semibold text-stone-700">
                  Today,
                </h2>
                <h2 className="text-4xl font-semibold text-blue-600">
                  {formattedToday}
                </h2>
              </div>
            )}
          </div>
        </section>

        {/* List of Schedules */}
        <section>
          <div className="mb-8 mt-16">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase text-gray-400">
                Activities
              </h4>
              <h4 className="text-xs font-medium uppercase text-gray-300">
                Schedule
              </h4>
            </div>
          </div>

          {schedules.length == 0 && filteredSchedules.length == 0 && (
            <button
              type="button"
              onClick={() => setShowAddScheduleModal(true)}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-white py-8"
            >
              <PlusCircle className="h-5 w-5" strokeWidth={2} />
              <p className="text-sm font-medium">Add Item</p>
            </button>
          )}

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
 * [x] Change Login / Logout UI
 * [x] Create list of color presets
 *      [x] Add + button that displays color input for customization
 *
 *
 *
 * Up Next.
 *
 *  [ ] Add media breakpoints for transitioning to Tablet View.
 *    [ ] Packing List
 *    [ ] Expenses
 *    [ ] Schedule
 *
 *
 * [.] Stress test, bug hunt; refactor and fix.
 * [.] Optimize Read and Writes for Application
 */
