import React, { useContext, useState } from "react";
import { ScheduleContext } from "@/lib/scheduleContext";

import { Modal } from "../Modal";
import { Trash2, CalendarClock, StickyNote, Star, MapPin } from "lucide-react";
import { dateFormatter } from "@/lib/utils";

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

  console.log(activity);

  return (
    <Modal onShow={onShow} onClose={onClose}>
      <article className="mt-5">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activity?.selectedLocation.photoUrl}
            alt={`${activity?.selectedLocation?.name} Google Review image.`}
            className="w-full rounded-t-xl object-cover"
            width={200}
            height={150}
            style={{ height: "175px", width: "100%" }}
            loading="lazy"
          />
        </div>

        <div>
          <div className="mt-4 flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">{activity?.title}</h2>
            </div>
            <button
              type="button"
              onClick={() => deleteActivityHandler(activity?.id)}
            >
              <Trash2 className="h-4 w-4 " />
            </button>
          </div>
        </div>

        {/* Containers */}
        <div className="flex w-full gap-4 py-4">
          {/* Location */}

          <div className="flex w-1/2 flex-col items-start justify-start gap-4 rounded-xl border p-4 ">
            <MapPin className="h-5 w-5 flex-shrink-0 text-blue-600" />
            <p className="text-xs font-medium text-blue-600">
              {activity?.selectedLocation.address}
            </p>
          </div>

          {/* Dates */}
          <div className="flex w-1/2 flex-col items-start justify-start gap-4 rounded-xl border p-4 ">
            <CalendarClock className="h-5 w-5 flex-shrink-0 text-gray-600" />
            <div>
              <p className="text-xs font-medium text-gray-600">
                {dateFormatter(schedule?.selectedDates.from)}
              </p>
              {schedule?.selectedDates.to && (
                <p className="text-xs font-medium text-gray-600">
                  to {dateFormatter(schedule?.selectedDates.to)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        {activity?.notes && (
          <div className="flex w-full flex-col items-start justify-start gap-4 rounded-xl border p-4 ">
            <StickyNote className="h-5 w-5 flex-shrink-0" />
            <p className="text-blue-gray text-xs">
              {activity?.notes}
            </p>
          </div>
        )}
      </article>
    </Modal>
  );
};

export default ViewScheduleModal;
