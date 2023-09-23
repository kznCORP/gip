"use client";

import React, { useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Logo />

      <section>
        <div className="flex h-screen flex-col items-center justify-between gap-8 bg-white px-6">
          <div className="mt-48 w-full">
            <h1 className="text-center text-3xl font-medium">
              Make sense out of planning.
            </h1>
            <h2 className="text-center text-xl text-neutral-400">
              Have everyone on the same page, literally.
            </h2>
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
