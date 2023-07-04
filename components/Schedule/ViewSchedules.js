"use client";

import React, { useContext, useEffect, useState } from "react";
import { ScheduleContext } from "@/lib/scheduleContext";
import {
  Trash2,
  Navigation,
  CalendarClock,
  StickyNote,
  Star,
} from "lucide-react";

export const ViewSchedules = ({ schedule }) => {
  const { deleteSchedule } = useContext(ScheduleContext);

  // Delete Expense from Items Array in Firebase
  const deleteActivityHandler = async (activityId) => {
    try {
      const updatedItems = schedule.activities.filter(
        (activity) => activity.id !== activityId
      );
      const updatedActivities = { activities: updatedItems };

      await deleteSchedule(schedule.id, activityId);
    } catch (e) {
      console.log("Error in deleting Expense Item", e);
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
                    onClick={() => deleteActivityHandler(activity.id)}
                  >
                    <Trash2 className="h-4 w-4 " />
                  </button>
                </div>

                {/* Location / Address */}
                <div className="flex w-full items-center justify-between ">
                  <div className="flex items-start gap-2">
                    <Navigation className="stroke-3 mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 " />
                    <p className="text-sm font-medium text-blue-600">
                      {activity.selectedLocation?.name}
                    </p>
                  </div>

                  <p className="text-xs font-light text-gray-400">
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
