"use client";

import React, { useState, useContext } from "react";

import { ScheduleContext } from "@/lib/scheduleContext";
import { AuthUserContext } from "@/lib/authContext";

import { Modal } from "../Modal";
import { Location } from "./Location";

import { DatePickerWithRange } from "../ui/datepicker";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

import { StickyNote, Sunrise } from "lucide-react";

// Bucket URL from Storage in Firebase Console
const BUCKET_URL = "gs://whatarewedoing-7e3f5.appspot.com";

export const AddScheduleModal = ({ onShow, onClose }) => {
  const { user } = useContext(AuthUserContext);
  const { addDate, addSchedule } = useContext(ScheduleContext);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);

  // const addDateHandler = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await addDate({ selectedDates });
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  const addScheduleHandler = async (e) => {
    e.preventDefault();

    if (!selectedDates) {
      console.log("No selected dates");
      return;
    }

    const newActivity = {
      id: uuidv4(),
      title: title,
      selectedLocation: selectedLocation,
      notes: notes,
    };

    try {
      // Write to Firebase
      await addSchedule(selectedDates, newActivity, user.uid);

      // Reset the form fields
      setTitle("");
      setNotes("");
      setSelectedLocation(null);
      onClose(true);
    } catch (e) {
      console.log("Error in Adding Activity: ", e);
    }
  };

  return (
    <Modal onShow={onShow} onClose={onClose}>
      {/* Modal Toggle */}
      <section className="mt-24 max-h-[calc(100vh-12rem)] px-6">
        <form
          onSubmit={addScheduleHandler}
          className="flex flex-col justify-center gap-10 overflow-y-auto"
        >
          {/* Title */}
          <div className="flex flex-col items-start justify-start">
            <label className="text-sm font-medium ">
              What are you doing?...
            </label>

            <div className="flex w-full items-center gap-4 rounded-lg border p-4 text-sm ">
              <Sunrise className="h-4 w-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="eg. Gym, Tan, Laundry at..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full "
                style={{
                  textDecoration: "unset",
                  border: "unset",
                  outline: "none",
                  width: "100%",
                }}
                maxLength="50"
              />
            </div>
          </div>

          {/* Maps & Places API */}
          <div>
            <label className="text-sm font-medium">Where to?...</label>
            <Location
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>

          {/* Search Results */}
          <div>
            <label className="text-sm font-medium">When?...</label>
            <DatePickerWithRange setSelectedDates={setSelectedDates} />
          </div>

          {/* Text Area */}
          <div>
            <label className="text-sm font-medium">
              Any last things to note?...
            </label>

            <div className="flex w-full items-start gap-4 rounded-lg border p-4 text-sm ">
              <StickyNote className="h-4 w-4 flex-shrink-0" />
              <textarea
                placeholder="eg. Don't forget to bring sunscreen..."
                maxLength="250"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full "
                style={{
                  textDecoration: "unset",
                  border: "unset",
                  outline: "none",
                  width: "100%",
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mb-10 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              className={cn("w-1/4 font-normal text-gray-500")}
              type="button"
              onClick={() => onClose(false)}
            >
              Cancel
            </Button>
            <Button className={cn(" w-3/4")} type="submit">
              Add to Schedule
            </Button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default AddScheduleModal;
