"use client";

import React from "react";
import Link from "next/link";
import { CalendarClock, CircleDollarSign, ClipboardList } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-1/2 -translate-x-1/2 transform py-4">
      <ul className="flex items-center justify-between rounded-full bg-neutral-800 p-2 opacity-80 backdrop-blur">
        <li className="mx-4  rounded-lg bg-neutral-900 p-2">
          <Link href="#shedules">
            <CalendarClock className="h-6 w-6 text-white" strokeWidth={2} />
          </Link>
        </li>
        <li className="rounded-lg  bg-neutral-900 p-2">
          <Link href="#expenses">
            <CircleDollarSign className="h-6 w-6 text-white" strokeWidth={2} />
          </Link>
        </li>
        <li className="mx-4  rounded-lg bg-neutral-900 p-2">
          <Link href="#packing-list">
            <ClipboardList className="h-6 w-6 text-white" strokeWidth={2} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
