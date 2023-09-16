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
    <nav className="hidden lg:block lg:fixed lg:top-0 lg:h-screen lg:w-20 lg:bg-neutral-800">
      <ul className="flex flex-col items-center justify-evenly mt-6">
        <li className="mx-2 rounded-lg p-4">
          <Link href="#">
            <Home className="h-6 w-6 text-white" strokeWidth={1.5} />
          </Link>
        </li>
        <div
          className="opacity-20"
          style={{ border: "0.5px solid white", height: "56px" }}
        ></div>
        <li className="mx-2  rounded-lg p-4">
          <Link href="#shedules">
            <CalendarClock className="h-6 w-6 text-white" strokeWidth={1.5} />
          </Link>
        </li>
        <li className="rounded-lg  p-4">
          <Link href="#expenses">
            <CircleDollarSign
              className="h-6 w-6 text-white"
              strokeWidth={1.5}
            />
          </Link>
        </li>
        <li className="mx-2  rounded-lg p-4">
          <Link href="#packing-list">
            <ClipboardList className="h-6 w-6 text-white" strokeWidth={1.5} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
