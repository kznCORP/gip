"use client";

import React, { useState } from "react";
import { ViewScheduleModal } from "./ViewScheduleModal";
import { timeFormatter } from "@/lib/utils";
import { Clock, MoveRight } from "lucide-react";

export const ScheduleItem = ({ schedule, position }) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

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
          <section key={activity.id} className="flex gap-4">
            <button
              onClick={() => {
                setShowScheduleModal(true);
                setSelectedActivity(activity);
              }}
              className="mb-4 w-full rounded-xl"
            >
              <div className="flex rounded-lg bg-white p-5">
                {/* Image Wrapper */}
                <div className="h-[125px] w-[125px] flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activity.selectedLocation?.photoUrl}
                    alt={`${activity.selectedLocation?.name} Google Review image.`}
                    className="h-full w-full rounded-xl object-cover"
                    width={100}
                    height={100}
                    loading="lazy"
                  />
                </div>

                {/* Schedule Details */}
                <div className="my-2 ml-8 inline-flex w-full flex-col items-start justify-between">
                  <div className="flex items-center gap-1">
                    <Clock
                      className="h-3 w-3 flex-shrink-0 text-blue-600"
                      strokeWidth={2.75}
                    />
                    <p className="h-4 text-xs font-semibold tracking-tighter text-blue-600">
                      {timeFormatter(schedule.selectedDates.from)}
                    </p>
                  </div>

                  <div className="flex flex-col items-start justify-center">
                    <h2 className="text-lg font-semibold">{activity.title}</h2>
                    <p className="text-start text-xs text-gray-400">
                      {`${activity.selectedLocation?.address.substring(
                        0,
                        40
                      )}...`}
                    </p>
                  </div>

                  <MoveRight
                    className="h-5 w-5 text-gray-400"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </button>
          </section>
        ))}
    </>
  );
};
