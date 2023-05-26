import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export const Navigation = () => {
  return (
    <header className="px-4 py-4">
      <div className="flex items-center justify-between">
        <nav>
          <RxHamburgerMenu className="text-xl" />
        </nav>

        {/* User Information */}
        <div className="flex items-center gap-2">
          {/* Name */}
          <p>Hi, John Doe</p>

          {/* Profile picture */}
          <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover"
              src="https://qph.cf2.quoracdn.net/main-qimg-134e3bf89fff27bf56bdbd04e7dbaedf.webp"
              alt="AI generated Profile Image"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
