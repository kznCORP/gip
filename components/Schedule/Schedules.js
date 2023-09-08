"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "@/lib/authContext";
import { ScheduleContext } from "@/lib/scheduleContext";

import { ScheduleItem } from "@/components/Schedule/ScheduleItem";

import { AddScheduleModal } from "@/components/Schedule/AddScheduleModal";
import { PlusCircle } from "lucide-react";

import { format } from "date-fns";

export const Schedules = () => {
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
   *
   *  [x] Add media breakpoints for transitioning to Tablet View.
   *    [x] Packing List
   *    [x] Expenses
   *    [x] Schedule
   *
   *  [ ] Add media breakpoints for transitioning to Desktop View.
   *    [ ] Packing List
   *    [ ] Expenses
   *    [ ] Schedule
   *
   *
   */

  return (
    <>
      <AddScheduleModal
        onShow={showAddScheduleModal}
        onClose={() => setShowAddScheduleModal(false)}
      />

      <article
        className={`mb-24 px-4 ${
          showAddScheduleModal ? "md:w-1/2" : "md:w-full"
        }`}
        id="schedules"
      >
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
      </article>
    </>
  );
};
