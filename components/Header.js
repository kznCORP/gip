"use client";

import React, { useContext, useState } from "react";
import { AuthUserContext } from "@/lib/authContext";

export const Header = () => {
  const { user, loading, logout } = useContext(AuthUserContext);

  return (
    <header>
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

      <button
        className="rounded-3xl bg-red-600 px-4 py-2 text-sm"
        onClick={logout}
      >
        Log Out
      </button>
    </header>
  );
};

export default Header;
