"use client";

import React, { useContext, useEffect, useState } from "react";

import { ScheduleContext } from "@/lib/scheduleContext";

import { dateFormatter } from "@/lib/utils";

import { Trash2, Map, CalendarClock, StickyNote, Star } from "lucide-react";

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
      <div className="mt-5 flex flex-col gap-3 rounded-xl border border-gray-300 ">
        {/* Image Wrapper */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={schedule.selectedLocation?.photoUrl}
            blurDataURL={schedule.selectedLocation?.photoUrl}
            alt={`${schedule.selectedLocation?.name} Google Review image.`}
            className="w-full rounded-t-xl object-cover"
            width={200}
            height={150}
            style={{ height: "175px", width: "100%" }}
            loading="lazy"
          />
        </div>

        {/* Schedule Details */}
        <div className="flex flex-col gap-4 px-5 pb-4">
          {/* Title */}
          <div className="mb-2 mt-4 flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">{schedule?.title}</h2>
              {/* Rating */}
              {schedule.selectedLocation?.rating && (
                <div className="flex items-center gap-2 ">
                  <Star className="h-3 w-3 text-gray-500" />
                  <p className="text-xs font-light text-gray-500 ">
                    {schedule.selectedLocation.rating}
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => deleteScheduleHandler(schedule?.id)}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Location / Address */}
          <div className="flex w-full items-start gap-4">
            <Map className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500 " />
            <p className="w-3/4 text-sm font-light text-blue-500 underline underline-offset-4 ">
              {schedule.selectedLocation?.address}
            </p>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-4">
            <CalendarClock className="h-4 w-4  flex-shrink-0" />
            <p className="text-sm font-light">
              {dateFormatter(schedule?.selectedDates.from)}
            </p>
            {schedule.selectedDates.to && (
              <p className="text-sm font-light"> - </p>
            )}
            <p className="text-sm font-light">
              {dateFormatter(schedule.selectedDates?.to)}
            </p>
          </div>

          {/* Additional Notes */}
          {schedule.notes && (
            <div className="flex items-start gap-4">
              <StickyNote className="mt-0.5 h-4 w-4 flex-shrink-0  " />
              <p className=" text-sm  font-light text-gray-500">
                {schedule?.notes}
              </p>
            </div>
          )}

          {/* View Map Button */}
          <div></div>
        </div>
      </div>
    </>
  );
};
