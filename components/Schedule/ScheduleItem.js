"use client";

import React, { useState } from "react";
import { ViewScheduleModal } from "./ViewScheduleModal";

import { MapPin, Star } from "lucide-react";

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
        schedule.activities.map((activity, index) => (
          <button
            key={index}
            onClick={() => {
              setShowScheduleModal(true);
              setSelectedActivity(activity);
            }}
            className="mb-2 w-full rounded-xl bg-gray-50 drop-shadow"
          >
            <div className="flex flex-col gap-2">
              {/* Image Wrapper */}
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activity.selectedLocation?.photoUrl}
                  alt={`${activity.selectedLocation?.name} Google Review image.`}
                  className="w-full rounded-t-xl object-cover"
                  width={200}
                  height={150}
                  style={{ height: "200px", width: "100%" }}
                  loading="lazy"
                />
              </div>

              {/* Schedule Details */}
              <div className="mb-4 flex flex-col gap-3 px-4">
                {/* Title */}
                <div className="mt-4 flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">{activity.title}</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-yellow-500">
                      {activity?.selectedLocation.rating}
                    </p>
                    {activity.selectedLocation.rating && (
                      <Star
                        className="h-4 w-4 text-yellow-500"
                        strokeWidth={3}
                      />
                    )}
                  </div>
                </div>

                {/* Location / Address */}
                <div className="flex w-full items-center justify-between ">
                  <div className="flex items-start gap-2">
                    <MapPin
                      className="stroke-3 mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600"
                      strokeWidth={3}
                    />
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
          </button>
        ))}
    </>
  );
};
