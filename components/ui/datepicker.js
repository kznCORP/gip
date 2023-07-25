"use client";

import React, { useEffect, useState } from "react";
import { addDays, format, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start gap-2 text-left font-normal",
              !date && "text-muted-foreground"
            )}
            style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  <p>{format(date.from, "LLL dd, y")} -</p>
                  <p>{format(date.to, "LLL dd, y")}</p>
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
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
