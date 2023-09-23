"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthUserContext } from "@/lib/authContext";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { Logout } from "./Logout";

import {
  CalendarClock,
  CircleDollarSign,
  ClipboardList,
  Home,
  Plane,
  Luggage,
  List,
} from "lucide-react";

export const Sidebar = () => {
  const router = useRouter();
  const { user, loading, logout } = useContext(AuthUserContext);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  return (
    <>
      {showLogoutModal && <Logout onClose={() => setShowLogoutModal(false)} />}

      <nav className="relative hidden h-screen lg:fixed lg:top-0 lg:block lg:w-52 lg:bg-white">
        {/* Logo */}
        <div className="flex w-full justify-center gap-1 p-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
            <Plane
              className="h-5 w-5 flex-shrink-0 text-white"
              strokeWidth={2}
            />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
            <Luggage
              className="h-5 w-5 flex-shrink-0 text-white"
              strokeWidth={2}
            />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
            <List
              className="h-5 w-5 flex-shrink-0 text-white"
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="b mt-12 flex flex-col items-start">
          <li>
            <p
              className="mb-2 ml-4 uppercase text-gray-400"
              style={{ fontSize: "10px" }}
            >
              Main
            </p>

            <div className="mx-2 rounded-lg p-4">
              <Link href="#" className="flex items-center justify-center">
                <Home className="h-5 w-5 text-black" strokeWidth={2} />
                <p className="ml-4 text-sm font-medium">Home</p>
              </Link>
            </div>
          </li>

          <div className="mt-16 flex flex-col items-start">
            <p
              className="mb-2 ml-4 uppercase text-gray-400"
              style={{ fontSize: "10px" }}
            >
              Planning
            </p>

            <li className="mx-2 rounded-lg p-4">
              <Link
                href="#shedules"
                className="flex items-center justify-center"
              >
                <CalendarClock className="h-5 w-5 text-black" strokeWidth={2} />
                <p className="ml-4 text-sm font-medium">Schedules</p>
              </Link>
            </li>
            <li className="mx-2 rounded-lg p-4">
              <Link
                href="#expenses"
                className="flex items-center justify-center"
              >
                <CircleDollarSign
                  className="h-5 w-5 text-black"
                  strokeWidth={2}
                />
                <p className="ml-4 text-sm font-medium">Expenses</p>
              </Link>
            </li>
            <li className="mx-2 rounded-lg p-4">
              <Link
                href="#packing-list"
                className="flex items-center justify-center"
              >
                <ClipboardList className="h-5 w-5 text-black" strokeWidth={2} />
                <p className="ml-4 text-sm font-medium">Packing List</p>
              </Link>
            </li>
          </div>
        </ul>

        {/* Profile  */}
        <div className="absolute bottom-0 left-0 mb-12 ml-4 flex flex-col items-start">
          <p
            className="mb-4 uppercase text-gray-400"
            style={{ fontSize: "10px" }}
          >
            Profile
          </p>

          <div className="flex items-center gap-4">
            {/* Picture */}
            <div className="h-[40px] w-[40px] overflow-hidden rounded-full border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-full w-full object-cover"
                src={user?.photoURL}
                alt={user?.displayName}
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Name */}
            <div>
              <p className="text-sm font-medium">{user?.displayName}</p>
              <button
                className="rounded-full border border-red-600 px-4 text-xs
              text-red-500"
                onClick={() => setShowLogoutModal(true)}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
