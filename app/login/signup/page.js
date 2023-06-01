"use client";

import React, { useContext, useEffect, useState } from "react";

import { AuthUserContext } from "@/lib/authContext";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { user, registerEmailHandler, googleLoginHandler } =
    useContext(AuthUserContext);

  const registerAccount = async (e) => {
    e.preventDefault();

    try {
      await registerEmailHandler(email, password, name);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <main>
      <section className="z-10 h-screen w-screen overflow-hidden bg-white">
        {/* Login + SignUp */}
        <div className="flex h-full flex-col items-center justify-center gap-5">
          <form className="w-1/2" onSubmit={registerAccount}>
            <div className="flex flex-col gap-1">
              <label>Name</label>
              <input
                name="Name"
                type="Name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-black"
              />
            </div>

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
              Register
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
