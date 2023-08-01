"use client";

import React, { useContext, useState } from "react";
import { AuthUserContext } from "@/lib/authContext";

export const Header = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { user, loading, logout } = useContext(AuthUserContext);

  const handleProfilePictureClick = () => {
    setShowSettings((prevShowSettings) => !prevShowSettings);
  };

  return (
    <header className="flex justify-between p-4">
      {user && !loading && (
        <button onClick={handleProfilePictureClick}>
          <div className="flex items-center gap-2">
            {/* Profile picture */}
            <div className="h-[40px] w-[40px] overflow-hidden rounded-full border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-full w-full object-cover"
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-sm">Hi, {user.displayName}</p>
          </div>
        </button>
      )}

      {showSettings && (
        <button
          className="rounded-full border border-red-600 px-4 text-sm text-red-500"
          onClick={logout}
        >
          Log Out
        </button>
      )}
    </header>
  );
};

export default Header;
