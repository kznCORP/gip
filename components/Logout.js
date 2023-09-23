"use client";

import React, { useContext } from "react";
import { AuthUserContext } from "@/lib/authContext";
import { AlertOctagon } from "lucide-react";

export const Logout = ({ onClose }) => {
  const { logout } = useContext(AuthUserContext);

  return (
    <div className="fixed left-1/2 top-1/2 z-50 h-full w-full -translate-x-1/2 -translate-y-1/2 transform bg-gray-900/50 p-8 backdrop-blur-sm">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-8">
          <AlertOctagon className="h-7 w-7 text-red-500" strokeWidth={2} />
          <div>
            <p className="text-center text-sm font-medium">
              Are you sure you want to log out?
            </p>
            <p className="text-center text-xs text-gray-400">
              All of your content has been saved :-&#41;
            </p>
          </div>
          <div>
            <button className="rounded-lg border p-2 text-xs" onClick={onClose}>
              Cancel
            </button>
            <button
              className="ml-2 rounded-lg border border-red-500 p-2 text-xs font-medium text-red-500"
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
