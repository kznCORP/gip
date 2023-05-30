"use client";

import React, { useState } from "react";

import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export const AuthGateway = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (showSignIn) {
    return <SignIn />;
  }

  if (showRegister) {
    return <SignUp />;
  }

  return (
    <>
      <main>
        <section className="z-10 h-screen w-screen overflow-hidden bg-white">
          <div className="flex h-1/2 w-full items-center justify-center bg-blue-200">
            <h2>Image + Logo</h2>
          </div>

          {/* Login + SignUp */}
          <div className="flex h-1/2 flex-col items-center justify-center gap-5">
            <button
              className="mt-3 w-1/2 rounded-3xl bg-blue-600 p-3 font-medium text-white"
              onClick={() => setShowSignIn(true)}
            >
              Log in
            </button>

            <button
              className="flex w-1/2 items-center justify-center gap-4 rounded-3xl border border-blue-600 p-3 font-medium text-blue-600"
              onClick={() => setShowRegister(true)}
            >
              Create Account
            </button>
          </div>
        </section>
      </main>
    </>
  );
};
