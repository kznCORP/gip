"use client";

import React, { useEffect, useState } from "react";
import { addDays, format, startOfDay } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarClock } from "lucide-react";

export function DatePickerWithRange({ setSelectedDates }) {
  const today = startOfDay(new Date());
  const [date, setDate] = useState({
    from: today,
    to: addDays(today, 1),
  });

  const handleSelect = async (selectedDate) => {
    try {
      const fromDate = selectedDate?.from || "";
      const toDate = selectedDate?.to || "";
      setDate({ from: fromDate, to: toDate });
      setSelectedDates({ from: fromDate, to: toDate });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleTimeChange = (event) => {
    const time = event.target.value;
    const [hours, minutes] = time.split(":").map(Number);

    const fromDateTime = new Date(date.from);
    fromDateTime.setHours(hours);
    fromDateTime.setMinutes(minutes);

    setDate({ ...date, from: fromDateTime });
    setSelectedDates({ ...date, from: fromDateTime });
  };

  useEffect(() => {
    setSelectedDates(date);
  }, [date, setSelectedDates]);

  return (
    <div className={cn("grid gap-2")}>
      <Popover className={cn("flex items-center justify-center")}>
        <PopoverTrigger asChild>
          <div className="flex rounded-lg bg-white p-4">
            <div className="flex items-center justify-center rounded-lg p-1">
              <div className="h-[25px] w-[25px]">
                <CalendarClock />
              </div>
            </div>

            {date?.from ? (
              date.to ? (
                <div className="ml-4 flex flex-wrap items-center text-start text-sm font-medium text-gray-400">
                  <p>{format(date.from, "LLL dd, y")} -&nbsp;</p>
                  <p>{format(date.to, "LLL dd, y")}</p>
                </div>
              ) : (
                <p className="ml-4 flex flex-wrap items-center text-start text-sm font-medium text-gray-400">
                  {format(date.from, "LLL dd, y")}
                </p>
              )
            ) : (
              <span className="ml-4 flex flex-wrap items-center text-start text-sm font-medium text-gray-400">
                Pick a date
              </span>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-auto flex-col items-center p-0"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => handleSelect(date)}
            numberOfMonths={1}
          />
          <input
            type="time"
            value={date.from ? format(date.from, "HH:mm") : ""}
            className="mb-4 mt-2 rounded-xl border border-gray-500 p-2 text-sm font-medium"
            onChange={handleTimeChange}
            required
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
