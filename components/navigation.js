"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthUserContext } from "@/lib/authContext";
import { useRouter } from "next/navigation";

import Link from "next/link";

import {
  CalendarClock,
  CircleDollarSign,
  ClipboardList,
  Home,
  LogOut,
} from "lucide-react";

export const Navigation = () => {
  const router = useRouter();
  const { user, loading } = useContext(AuthUserContext);

  const [showSettings, setShowSettings] = useState(false);

  const handleProfilePictureClick = (e) => {
    setShowSettings(e);
  };

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [router, user, loading]);

  /**
   *
   *  To Do:
   *
   *  Clicking Logout will display a new Popup component that will ask if you want to Logout or No.
   *
   */

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 -translate-x-1/2 transform p-4 lg:hidden xl:hidden">
      <ul className="flex items-center justify-between rounded-full  bg-neutral-900 opacity-90 backdrop-blur">
        <li className="px-4 py-2">
          {showSettings ? (
            <button
              type="button"
              className="flex items-center justify-center"
              onClick={() => handleProfilePictureClick(false)}
            >
              <div className="h-5 w-5 overflow-hidden rounded-full">
                <LogOut
                  className="h-full w-full text-white"
                  strokeWidth={1.5}
                />
              </div>
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center justify-center"
              onClick={() => handleProfilePictureClick(true)}
            >
              <div className="h-7 w-7 overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-full w-full object-cover"
                  src={user?.photoURL}
                  alt={user?.displayName}
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>
          )}
        </li>

        <div
          className="opacity-20"
          style={{ border: "0.5px solid white", height: "56px" }}
        ></div>

        <li className="rounded-lg px-4 py-2">
          <Link href="#">
            <Home className="h-5 w-5 text-white" strokeWidth={1.5} />
          </Link>
        </li>

        <li className="rounded-lg px-4 py-2">
          <Link href="#shedules">
            <CalendarClock className="h-5 w-5 text-white" strokeWidth={1.5} />
          </Link>
        </li>

        <li className="rounded-lg  px-4 py-2">
          <Link href="#expenses">
            <CircleDollarSign
              className="h-5 w-5 text-white"
              strokeWidth={1.5}
            />
          </Link>
        </li>
        <li className="rounded-lg px-4 py-2">
          <Link href="#packing-list">
            <ClipboardList className="h-5 w-5 text-white" strokeWidth={1.5} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
