"use client";

import React, { useState } from "react";
import { ViewScheduleModal } from "./ViewScheduleModal";
import { timeFormatter } from "@/lib/utils";

export const ScheduleItem = ({ schedule, position }) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const firstItem = position === 0;
  const secondItem = position === 1;
  const otherItems = position > 1;

  return (
    <>
      <ViewScheduleModal
        onShow={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        schedule={schedule}
        activity={selectedActivity}
      />

      {schedule.activities &&
        schedule.activities.map((activity) => (
          <section key={activity.id} className="flex gap-5">
            {/* Connector */}
            <div
              className={`flex flex-col ${
                firstItem
                  ? "justify-end"
                  : secondItem
                  ? "justify-start"
                  : "justify-center"
              }`}
            >
              {/* Other Items - Top Border Gray */}
              {otherItems && (
                <div className="h-1/2 w-1/2 border-r border-dashed border-gray-400"></div>
              )}
              {/* Second Item - Bottom Border Blue */}
              {secondItem && !otherItems && (
                <div className="h-1/2 w-1/2 border-r border-dashed border-blue-400"></div>
              )}
              {/* Dot */}
              <div
                className={`my-4 h-2 w-2 flex-shrink-0 rounded-xl ${
                  firstItem ? "bg-blue-600" : "bg-gray-400"
                }`}
              />
              {/* First Item - Bottom Border Blue */}
              {firstItem && !otherItems && (
                <div className="h-1/2 w-1/2 border-r border-dashed border-blue-400"></div>
              )}
              {/* Second Item - Top Border Blue */}
              {secondItem && !otherItems && (
                <div className="h-1/2 w-1/2 border-r border-dashed border-gray-400"></div>
              )}
              {/* Other Items Item - Bottom Border Gray */}
              {otherItems && (
                <div className="h-1/2 w-1/2 border-r border-dashed border-gray-400"></div>
              )}
            </div>

            <button
              onClick={() => {
                setShowScheduleModal(true);
                setSelectedActivity(activity);
              }}
              className="mb-10 w-full rounded-xl"
            >
              <div className="flex flex-col gap-2">
                {/* Image Wrapper */}
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activity.selectedLocation?.photoUrl}
                    alt={`${activity.selectedLocation?.name} Google Review image.`}
                    className="w-full rounded-lg object-cover shadow-md"
                    width={200}
                    height={150}
                    style={{ height: "200px", width: "100%" }}
                    loading="lazy"
                  />
                </div>

                {/* Schedule Details */}
                <div>
                  <div className="flex flex-col items-start gap-1">
                    <h2 className="text-lg font-semibold">{activity.title}</h2>

                    <p className="text-xs font-medium text-blue-600">
                      {`${activity.selectedLocation?.address.substring(
                        0,
                        50
                      )} ...`}
                    </p>

                    <p className="text-xs font-medium text-black">
                      {timeFormatter(schedule.selectedDates.from)}
                    </p>

                    <p className="text-xs text-gray-400">More</p>
                  </div>
                </div>
              </div>
            </button>
          </section>
        ))}
    </>
  );
};
