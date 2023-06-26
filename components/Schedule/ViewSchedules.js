"use client";

import React, { useContext, useEffect, useState } from "react";

import { ScheduleContext } from "@/lib/scheduleContext";

import { dateFormatter } from "@/lib/utils";
import { cn } from "@/lib/utils";

import { Trash2, Map, CalendarClock, StickyNote } from "lucide-react";

export const ViewSchedules = ({ schedule }) => {
  const { deleteSchedule } = useContext(ScheduleContext);

  const deleteScheduleHandler = async (scheduleId) => {
    try {
      await deleteSchedule(scheduleId);
    } catch (e) {
      console.log("Error in deleting Schedule Modal", e);
    }
  };

  return (
    <>
      <div className="mt-5 flex flex-col gap-3 rounded-xl border border-gray-300 px-4 py-2">
        {/* Title */}
        <div className="mt-4 flex w-full items-center justify-between">
          <h2 className="font-semibold">{schedule?.title}</h2>
          <button
            type="button"
            onClick={() => deleteScheduleHandler(schedule?.id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Location / Address */}
        <div className="flex items-center gap-2">
          <Map className="h-4 w-4 text-blue-500" />
          <p className="text-sm font-light text-blue-500 underline underline-offset-4 ">
            {schedule?.selectedLocation.address}
          </p>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-gray-500" />
          <p className="text-sm font-light text-gray-500">
            {dateFormatter(schedule?.selectedDates.from)}
          </p>
          <p className="text-sm font-light text-gray-500"> - </p>
          <p className="text-sm font-light text-gray-500">
            {dateFormatter(schedule?.selectedDates.to)}
          </p>
        </div>

        {/* Additional Notes */}
        {schedule.notes && (
          <div className="flex items-center gap-2 ">
            <StickyNote className="h-4 w-4 text-gray-500" />
            <p className="text-sm font-light text-gray-500">
              {schedule?.notes}
            </p>
          </div>
        )}

        {/* View Map Button */}
        <div></div>
      </div>
    </>
  );
};
