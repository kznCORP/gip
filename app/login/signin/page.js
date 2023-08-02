"use client";

import React, { useContext, useEffect, useState } from "react";

import { AuthUserContext } from "@/lib/authContext";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, emailLoginHandler, googleLoginHandler } =
    useContext(AuthUserContext);

  const signInWithEmail = async (e) => {
    e.preventDefault();

    try {
      await emailLoginHandler(email, password);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);



  

  /**
   *
   *  To-Do:
   *
   *  [x] Create New Pull Request
   *  [ ] Change Login / Logout UI
   *  [ ] Create list of color presets
   *      [ ] Add + button that displays color input for customization
   */





  return (
    <main>
      <section className="z-10 h-screen w-screen overflow-hidden bg-white">
        <div className="flex h-1/3 w-full items-center justify-center bg-blue-200">
          <h2>Image + Logo</h2>
        </div>

        {/* Login + SignUp */}
        <div className="flex h-1/2 flex-col items-center justify-center gap-5">
          <form className="w-1/2" onSubmit={signInWithEmail}>
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-black"
              />
            </div>

            <button className="mt-3 w-full rounded-3xl bg-blue-600 p-3 font-medium text-white">
              Sign In
            </button>
          </form>

          <button
            className="flex w-1/2 items-center justify-center gap-4 rounded-3xl border border-black p-3 font-medium text-black"
            onClick={googleLoginHandler}
          >
            <FcGoogle className="text-xl" />
            Continue With Google
          </button>
        </div>
      </section>
    </main>
  );
}
