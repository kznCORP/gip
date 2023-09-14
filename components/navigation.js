"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarClock,
  CircleDollarSign,
  ClipboardList,
  Home,
} from "lucide-react";

/**
 *
 *  TO DO LIST
 *
 *  [ ] Create a left Sidebar Menu
 *    [ ] Laptop View
 *    [ ] Desktop View
 *
 *
 * */

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 -translate-x-1/2 transform p-4">
      <ul className="flex items-center justify-evenly rounded-full bg-neutral-900  opacity-90 backdrop-blur">
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
