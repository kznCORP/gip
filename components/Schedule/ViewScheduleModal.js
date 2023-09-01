import React, { useContext, useState } from "react";
import { ScheduleContext } from "@/lib/scheduleContext";

import { Modal } from "../Modal";
import { ArrowUpRight, Trash2 } from "lucide-react";
import { dateFormatter, timeFormatter } from "@/lib/utils";

export const ViewScheduleModal = ({ onShow, onClose, schedule, activity }) => {
  const { deleteSchedule } = useContext(ScheduleContext);

  // Delete Expense from Items Array in Firebase
  const deleteActivityHandler = async (activityId) => {
    try {
      const updatedItems = schedule.activities.filter(
        (activity) => activity.id !== activityId
      );
      const updatedActivities = { activities: updatedItems };

      await deleteSchedule(schedule.id, activityId);
      onClose(true);
    } catch (e) {
      console.log("Error in deleting Expense Item", e);
    }
  };

  return (
    <Modal onShow={onShow} onClose={onClose}>
      <article className="mb-10 mt-12 px-6">
        {/* Schedule Image */}
        <div className="flex flex-col items-center justify-center rounded-lg bg-white ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activity?.selectedLocation?.photoUrl}
            alt={`${activity?.selectedLocation?.name} Google Review image.`}
            className="w-full rounded-lg object-cover"
            width={350}
            height={150}
            style={{ height: "250px", width: "100%" }}
            loading="lazy"
          />
        </div>

        {/* Schedule Title */}
        <div className="mt-4 flex h-24 flex-col items-center justify-center rounded-lg bg-white p-6">
          <p className="uppercase text-gray-400" style={{ fontSize: "10px" }}>
            Activity Name
          </p>
          <p className="text-lg font-medium">{activity?.title}</p>
        </div>

        {/* Location */}
        <div className="mt-4 flex h-24 gap-4">
          <div className="flex w-3/4 flex-col items-center justify-center rounded-lg bg-white p-6">
            <p className="uppercase text-gray-400" style={{ fontSize: "10px" }}>
              Location
            </p>
            <p className="text-center text-sm font-medium">
              {activity?.selectedLocation?.address}
            </p>
          </div>

          {/* Button */}
          <div className="flex h-full w-1/4 flex-col items-center justify-center self-center rounded-lg bg-white ">
            <a
              href={activity?.selectedLocation?.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex flex-col items-center justify-center rounded-lg">
                <ArrowUpRight className="h-6 w-6 flex-shrink-0" />
                <p className="font-medium" style={{ fontSize: "10px" }}>
                  Open in Maps
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Reminders */}
        <div className="mt-4 flex h-24 gap-4">
          {/* Date */}
          <div className="flex h-full w-1/4 flex-col items-center justify-center self-center rounded-lg bg-white p-6">
            <p className="uppercase text-gray-400" style={{ fontSize: "10px" }}>
              Date
            </p>
            <p className="text-center text-xs font-medium ">
              {timeFormatter(schedule?.selectedDates?.from)}
            </p>
            <p className="text-center text-xs font-medium ">
              {dateFormatter(schedule.selectedDates.from)}
            </p>
          </div>

          {activity?.notes && (
            <div className="flex w-3/4 flex-col items-center justify-center rounded-lg bg-white p-6">
              <p
                className="uppercase text-gray-400"
                style={{ fontSize: "10px" }}
              >
                Reminders
              </p>
              <p className="text-xs font-medium">{activity?.notes}</p>
            </div>
          )}
        </div>

        <div className="bottom-0 mt-24 flex items-center justify-center">
          <button
            type="button"
            className="flex items-center rounded p-4 text-xs text-red-400 hover:bg-rose-500 hover:text-white"
            onClick={() => deleteActivityHandler(activity.id)}
          >
            Delete Activity
            <Trash2 className="ml-1 h-4 w-4 flex-shrink-0 text-red-400" />
          </button>
        </div>
      </article>
    </Modal>
  );
};

export default ViewScheduleModal;
