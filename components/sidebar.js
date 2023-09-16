"use client";

import React from "react";
import Link from "next/link";

import {
  CalendarClock,
  CircleDollarSign,
  ClipboardList,
  Home,
} from "lucide-react";

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <nav className="hidden h-screen lg:fixed lg:top-0 lg:block lg:w-52 lg:bg-white">
      <ul className="mt-6 flex flex-col items-start justify-evenly gap-4">
        <li className="mx-2 rounded-lg  p-4">
          <Link href="#" className="flex items-center justify-center">
            <Home className="h-6 w-6 text-black" strokeWidth={2} />
            <p className="ml-6 text-sm font-medium">Home</p>
          </Link>
        </li>

        <li className="mx-2 rounded-lg  p-4">
          <Link href="#shedules" className="flex items-center justify-center">
            <CalendarClock className="h-6 w-6 text-black" strokeWidth={2} />
            <p className="ml-6 text-sm font-medium">Schedules</p>
          </Link>
        </li>
        <li className="mx-2 rounded-lg  p-4">
          <Link href="#expenses" className="flex items-center justify-center">
            <CircleDollarSign className="h-6 w-6 text-black" strokeWidth={2} />
            <p className="ml-6 text-sm font-medium">Expenses</p>
          </Link>
        </li>
        <li className="mx-2  rounded-lg  p-4">
          <Link
            href="#packing-list"
            className="flex items-center justify-center"
          >
            <ClipboardList className="h-6 w-6 text-black" strokeWidth={2} />
            <p className="ml-6 text-sm font-medium">Packing List</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
