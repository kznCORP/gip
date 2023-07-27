"use client";

import React from "react";
import { CalendarClock, CircleDollarSign, ClipboardList } from "lucide-react";

export const Navigation = () => {
  /**
   *
   *  Fixed bottom Menu with 3 different logos for each section
   *  - Schedule
   *  - Expenses
   *  - PackingList
   *
   *  Name clicked for Profile Settings & Sign Out
   *
   */

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-1/2 -translate-x-1/2 transform py-4">
      <ul className="flex items-center justify-between rounded-full bg-neutral-800 p-2 opacity-80 backdrop-blur">
        <li className="rounded-lg  bg-neutral-900 p-2 mx-4">
          <CalendarClock className="h-6 w-6 text-white" strokeWidth={2} />
        </li>
        <li className="rounded-lg  bg-neutral-900 p-2">
          <CircleDollarSign className="h-6 w-6 text-white" strokeWidth={2} />
        </li>
        <li className="rounded-lg  bg-neutral-900 p-2 mx-4">
          <ClipboardList className="h-6 w-6 text-white" strokeWidth={2} />
        </li>
      </ul>
    </nav>
  );
};
