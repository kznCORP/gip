"use client";

import React, { useState } from "react";
import { ViewScheduleModal } from "./ViewScheduleModal";

export const ScheduleItem = ({ schedule }) => {
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
          <section key={activity.id} className="flex items-center gap-5 border">
            {/*
             *
             * This is for connecting each ScheduleItem together by dates..
             *
             */}

            <div>
              <div className="mb-2 h-3 w-3 rounded-xl bg-blue-500"></div>
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

                    <p className="text-xs text-gray-400">More information</p>
                  </div>
                </div>
              </div>
            </button>
          </section>
        ))}
    </>
  );
};
