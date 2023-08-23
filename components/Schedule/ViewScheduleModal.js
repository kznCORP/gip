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
  Compass,
} from "lucide-react";
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
      <article className="mt-8 border-2 border-red-500">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activity?.selectedLocation?.photoUrl}
            alt={`${activity?.selectedLocation?.name} Google Review image.`}
            className="w-full rounded-t-3xl object-cover"
            width={350}
            height={350}
            style={{ height: "350px", width: "100%" }}
            loading="lazy"
          />
        </div>

        <section className="relative z-20 -mt-6 rounded-t-3xl border-t bg-white px-6 pb-10 shadow-inner">
          <div className="mb-1 mt-3 flex items-center justify-center">
            <div className="h-[3px] w-1/5 items-center rounded-full bg-black"></div>
          </div>

          <div className="mb-6 flex w-full items-center justify-between pt-8">
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
            <div className="inline-flex items-center gap-4 rounded-xl bg-slate-50 p-4">
              <div className="rounded-full bg-white">
                <MapPin className="h-5 w-5 text-blue-600" strokeWidth={2.5} />
              </div>
              <p className="text-xs font-medium">
                {activity?.selectedLocation?.address}
              </p>
            </div>
            <div className="mt-2 inline-flex  items-center gap-4 rounded-xl bg-slate-50 p-4">
              <div className="rounded-full bg-white">
                <CalendarClock
                  className="h-5 w-5 flex-shrink-0 text-orange-600 "
                  strokeWidth={2.5}
                />
              </div>

              <p className="text-xs font-medium ">
                {timeFormatter(schedule?.selectedDates?.from)} — {"  "}
                {dateFormatter(schedule.selectedDates.from)}
              </p>
            </div>
          </div>

          {activity?.notes && (
            <div className="w-full">
              <p className="mb-2 mt-10 text-sm font-medium">Reminders</p>
              <div className="flex w-full flex-col items-start justify-start gap-4 rounded-xl border p-4 ">
                <p className="text-blue-gray text-xs">{activity?.notes}</p>
              </div>
            </div>
          )}

          <div className="w-full">
            <a
              href={activity?.selectedLocation?.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="mt-10 flex items-center justify-center gap-2 rounded-xl border border-gray-800 p-4">
                <Compass className="h-5 w-5 flex-shrink-0" />
                <p className="text-blue-gray text-sm font-medium">
                  Open in Maps
                </p>
              </div>
            </a>
          </div>
        </section>
      </article>
    </Modal>
  );
};

export default ViewScheduleModal;
