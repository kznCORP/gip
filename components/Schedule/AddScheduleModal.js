"use client";

import React, { useState, useContext } from "react";
import { Modal } from "../Modal";
import { ScheduleContext } from "@/lib/scheduleContext";
import { AuthUserContext } from "@/lib/authContext";
import { v4 as uuidv4 } from "uuid";

import { Location } from "./Location";

import { DatePickerWithRange } from "../ui/datepicker";

import { StickyNote, Sunrise } from "lucide-react";

export const AddScheduleModal = ({ onShow, onClose }) => {
  const { user } = useContext(AuthUserContext);
  const { addSchedule } = useContext(ScheduleContext);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);

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
      <section className="mb-10 mt-12 overflow-auto px-6">
        <form
          onSubmit={addScheduleHandler}
          className="flex flex-col justify-center gap-12"
        >
          {/* Title */}
          <div className="flex flex-col gap-4">
            <label htmlFor="title" className="font-medium">
              What are you doing? <span className="text-red-500">*</span>
            </label>

            <div className="flex rounded-lg bg-white p-4">
              <div className="flex items-center justify-center rounded-lg p-1">
                <div className="h-[25px] w-[25px]">
                  <Sunrise />
                </div>
              </div>

              <input
                type="text"
                placeholder="eg. Gym, Tan, Laundry at..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="ml-4 w-full text-sm font-medium"
                required
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
          <div className="flex flex-col gap-4">
            <label className="font-medium">
              Where? <span className="text-red-500">*</span>
            </label>
            <Location
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>

          {/* Search Results */}
          <div className="flex flex-col gap-4">
            <label className="font-medium">
              When? <span className="text-red-500">*</span>
            </label>
            <DatePickerWithRange setSelectedDates={setSelectedDates} />
          </div>

          {/* Text Area */}
          <div className="flex flex-col gap-4">
            <label className="font-medium">Notes</label>

            <div className="flex rounded-lg bg-white p-4">
              <div className="flex items-center justify-center rounded-lg p-1">
                <div className="h-[25px] w-[25px]">
                  <StickyNote />
                </div>
              </div>

              <textarea
                placeholder="eg. Don't forget to bring sunscreen..."
                maxLength="250"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="ml-4 w-full text-sm font-medium"
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
          <div className="flex items-center justify-center gap-4">
            <button
              className="w-1/4 rounded-md border bg-white p-3 text-gray-500"
              type="button"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
            <button
              className="w-3/4 rounded-md bg-black p-3 font-medium text-white"
              type="submit"
            >
              Submit Schedule
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default AddScheduleModal;
