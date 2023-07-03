"use client";

import React, { useContext, useEffect, useState } from "react";
import { ScheduleContext } from "@/lib/scheduleContext";
import { Trash2, Map, CalendarClock, StickyNote, Star } from "lucide-react";

export const ViewSchedules = ({ schedule }) => {
  const { deleteDate } = useContext(ScheduleContext);
  const { title, selectedLocation, notes } = schedule;

  const deleteScheduleHandler = async (scheduleId) => {
    try {
      await deleteDate(scheduleId);
    } catch (e) {
      console.log("Error in deleting Schedule Modal", e);
    }
  };

  return (
    <>
      {schedule.activities &&
        schedule.activities.map((activity, index) => (
          <article key={index}>
            <div className="my-10 flex flex-col border-b">
              {/* Image Wrapper */}
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activity.selectedLocation?.photoUrl}
                  alt={`${activity.selectedLocation?.name} Google Review image.`}
                  className="w-full rounded-md object-cover"
                  width={200}
                  height={150}
                  style={{ height: "175px", width: "100%" }}
                  loading="lazy"
                />
              </div>

              {/* Schedule Details */}
              <div className="flex flex-col gap-4 px-2">
                {/* Title */}
                <div className="mt-4 flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">{activity.title}</h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteScheduleHandler(schedule?.id)}
                  >
                    <Trash2 className="h-4 w-4 " />
                  </button>
                </div>

                {/* Location / Address */}
                <div className="flex w-full items-start justify-between ">
                  <div className="flex items-start gap-2">
                    <Map className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 " />
                    <p className="text-sm font-medium text-blue-600">
                      {activity.selectedLocation?.name}
                    </p>
                  </div>

                  <p className="text-sm font-light text-gray-400">
                    More information
                  </p>
                </div>

                {/* View Map  Button */}
                <div></div>
              </div>
            </div>
          </article>
        ))}
    </>
  );
};
