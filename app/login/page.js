"use client";

import React, { useState } from "react";

import Logo from "@/components/Logo";

import Link from "next/link";
import Image from "next/image";

import imageAsset from "../../assets/Dual.jpg";

export default function Login() {
  return (
    <>
      <Logo />

      <section className="flex h-screen items-center justify-center overflow-auto bg-white">
        <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-white">
          <div className="pt-48 lg:mt-40">
            <div className="text-center">
              <h1 className="text-3xl font-medium">
                Make sense out of planning.
              </h1>
              <h2 className="text-xl text-neutral-400">
                Have everyone on the same page, literally.
              </h2>
            </div>

            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={imageAsset}
                alt="Schedule Mockup Mobile"
                width={750}
                height={750}
                className="w-full object-cover md:w-3/4 lg:w-full"
              />
            </div>
          </div>

          <div className="mt-12 flex w-2/4 flex-col items-center justify-center gap-2 pb-12 lg:w-1/4">
            <Link
              href="/login/signin"
              className="w-full rounded-lg border-2 border-black p-4 text-center text-sm font-medium"
            >
              <button>I already have an account</button>
            </Link>
            <Link
              href="/login/signup"
              className="w-full rounded-lg bg-black p-4 text-center text-sm font-medium text-white"
            >
              <button>Create an account</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
