"use client";

import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { AuthUserContext } from "@/lib/authContext";

export const Navigation = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const { user, loading, logout } = useContext(AuthUserContext);

  return (
    <>
      <header className="px-4 py-4">
        <div className="flex items-center justify-between">
          <nav>
            <button onClick={() => setShowSideBar(true)}>
              <RxHamburgerMenu className="text-xl" />
            </button>

            {showSideBar && (
              <div className="z-99 fixed inset-0 flex h-full w-1/3 flex-col items-center justify-between bg-slate-500 text-center text-white">
                <button
                  className="fixed left-5 top-5"
                  onClick={() => setShowSideBar(false)}
                >
                  Close
                </button>
                <div className="flex flex-col items-center ">
                  <p className="mb-20 mt-20">GIP</p>
                  <ul>
                    <li>Overview</li>
                    <li>Schedule</li>
                    <li>Expenses</li>
                    <li>Packing List</li>
                  </ul>
                </div>
                <div className="mb-10 ">
                  <button
                    className="rounded-3xl bg-red-600 px-4 py-2 text-sm"
                    onClick={logout}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </nav>

          {user && !loading && (
            <div className="flex items-center gap-2">
              <p>Hi, {user.displayName}</p>

              {/* Profile picture */}
              <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-full w-full object-cover"
                  src={user.photoURL}
                  alt={user.displayName}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
