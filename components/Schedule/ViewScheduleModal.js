import React, { useContext, useState } from "react";
import { ScheduleContext } from "@/lib/scheduleContext";

import { Modal } from "../Modal";
import {
  Trash2,
  CalendarClock,
  StickyNote,
  Star,
  MapPin,
  StarIcon,
} from "lucide-react";
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
            className="w-full rounded-t-3xl object-cover"
            width={250}
            height={250}
            style={{ height: "225px", width: "100%" }}
            loading="lazy"
          />
        </div>

        <section className="px-6">
          <div className="mb-4 mt-8 flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-medium">{activity?.title}</h2>
            </div>
            <button
              type="button"
              onClick={() => deleteActivityHandler(activity?.id)}
            >
              <Trash2 className="h-4 w-4 " />
            </button>
          </div>

          <div>
            {activity?.selectedLocation.rating && (
              <div className="mt-6 mb-4 flex items-center gap-1">
                <p className="text-sm font-medium text-yellow-500">
                  {activity?.selectedLocation.rating}
                </p>
                <StarIcon className="h-4 w-4 flex-shrink-0 text-yellow-500" />
              </div>
            )}
          </div>

          <div className="flex w-full gap-4 py-4">
            <div className="w-1/2">
              <p className="mb-2 text-sm font-medium">Location</p>
              <div className="flex w-full flex-col items-start justify-start gap-4 rounded-xl border p-4 ">
                <MapPin className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <p className="text-xs font-medium text-blue-600">
                  {activity?.selectedLocation.address}
                </p>
              </div>
            </div>

            <div className="w-1/2">
              <p className="mb-2 text-sm font-medium">Date(s)</p>
              <div className="flex w-full flex-col items-start justify-start gap-4 rounded-xl border p-4 ">
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
          </div>

          {/* Notes */}
          {activity?.notes && (
            <div className="w-full">
              <p className="mb-2 mt-6 text-sm font-medium">Reminders</p>
              <div className="flex w-full flex-col items-start justify-start gap-4 rounded-xl border p-4 ">
                <StickyNote className="h-5 w-5 flex-shrink-0" />
                <p className="text-blue-gray text-xs">{activity?.notes}</p>
              </div>
            </div>
          )}
        </section>
      </article>
    </Modal>
  );
};

export default ViewScheduleModal;
