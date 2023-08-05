"use client";

import React, { useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Login() {
  const [activeItem, setActiveItem] = useState(1);
  const totalItems = 3; // Total number of carousel items

  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollLeft;
    const containerWidth = e.target.clientWidth;
    const itemWidth = containerWidth / totalItems;
    const activeIndex = Math.floor(scrollPosition / itemWidth) + 1;
    setActiveItem(activeIndex);
  };

  return (
    <>
      <Logo />

      <section>
        <div className="flex h-screen flex-col items-center justify-between gap-8 px-6">
          <div className="mt-48 w-full">
            <h1 className="text-3xl font-medium">
              Make sense out of planning.
            </h1>
            <h2 className="text-xl text-neutral-400">
              Have everyone on the same page, literally.
            </h2>
          </div>

          <div
            className="no-scrollbar w-full overflow-x-auto whitespace-nowrap"
            onScroll={handleScroll}
          >
            <div className="mr-4 inline-block w-5/6">
              <div className="h-60 rounded-lg bg-red-400">
                {/* Carousel Item 1 */}
              </div>
            </div>
            <div className="mr-4 inline-block w-5/6">
              <div className="h-60 rounded-lg bg-blue-400">
                {/* Carousel Item 2 */}
              </div>
            </div>
            <div className="inline-block w-5/6">
              <div className="h-60 rounded-lg bg-purple-400">
                {/* Carousel Item 3 */}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: totalItems }, (_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  activeItem === i + 1 ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="mb-12 flex w-full flex-col items-center justify-center gap-2 ">
            <Link
              href="/login/signup"
              className="w-full rounded-lg bg-black p-4 text-center text-sm font-medium text-white"
            >
              <button>Create an account</button>
            </Link>

            <Link
              href="/login/signin"
              className="w-full rounded-lg border-2 border-black p-4 text-center text-sm font-medium"
            >
              <button>I already have an account</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
