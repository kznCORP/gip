"use client";

import React, { useContext, useEffect, useState } from "react";

import { ScheduleContext } from "@/lib/scheduleContext";

import { dateFormatter } from "@/lib/utils";
import { cn } from "@/lib/utils";

import { Trash2 } from "lucide-react";

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
      <div className="mt-5 flex flex-col bg-slate-300 p-3">
        {/* Title */}
        <div className="my-3 flex w-full items-center justify-between">
          <h2 className="font-bold">{schedule.title}</h2>
          <button
            type="button"
            onClick={() => deleteScheduleHandler(schedule.id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <p>{schedule.selectedLocation.address}</p>

        {/* Dates */}
        <div className="flex gap-2">
          <p>{dateFormatter(schedule.selectedDates.from)}</p>
          <p> - </p>
          <p>{dateFormatter(schedule.selectedDates.to)}</p>
        </div>

        {/* Text Area */}
        <p>{schedule.notes}</p>
      </div>
    </>
  );
};
