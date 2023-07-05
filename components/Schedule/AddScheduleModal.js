import React, { useState, useContext } from "react";

import { ScheduleContext } from "@/lib/scheduleContext";
import { AuthUserContext } from "@/lib/authContext";

import { Modal } from "../Modal";
import { Location } from "./Location";

import { Input } from "../ui/input";
import { DatePickerWithRange } from "../ui/datepicker";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

export const AddScheduleModal = ({ onShow, onClose }) => {
  const { user } = useContext(AuthUserContext);
  const { addDate, addSchedule } = useContext(ScheduleContext);

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);

  const addDateHandler = async (e) => {
    e.preventDefault();

    try {
      await addDate({ selectedDates });
    } catch (e) {
      console.log(e.message);
    }
  };

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
      {/* Modal Toggle */}
      <section className="mt-4">
        <form onSubmit={addScheduleHandler}>
          <label className="leading-2 text-xs">Title</label>
          <div className="my-2 flex items-center gap-4">
            <Input
              type="text"
              placeholder="What are you thinking of doing?..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Maps & Places API */}
          <div className="h-full w-full">
            <label className="leading-2 text-xs">Location</label>
            <Location
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>

          {/* Search Results */}
          <div className="mt-4">
            <p className="leading-2 mb-2 text-xs">Dates</p>
            <DatePickerWithRange setSelectedDates={setSelectedDates} />
          </div>

          {/* Text Area */}
          <div className="mt-4">
            <p className="leading-2 mb-2 text-xs">Notes</p>
            <Textarea
              placeholder="Additional notes..."
              maxLength="250"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button className={cn("mt-4 w-full")} type="submit">
            Submit
          </Button>
        </form>
      </section>
    </Modal>
  );
};

export default AddScheduleModal;
