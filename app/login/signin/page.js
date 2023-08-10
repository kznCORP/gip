"use client";

import React, { useContext, useEffect, useState } from "react";

import { AuthUserContext } from "@/lib/authContext";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

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

  return (
    <>
      <Logo />

      <section className="flex items-center justify-center">
        <div className="flex h-screen w-full flex-col items-center justify-center gap-8 sm:w-3/4">
          <div className="mb-6 mt-12 w-2/3 text-center">
            <h2 className="text-2xl font-medium">Welcome Back</h2>
            <p className="mt-2 text-xs font-light text-gray-400">
              Enter your details or continue with our sign-in providers
            </p>
          </div>

          <form
            className="flex w-2/3 flex-col gap-4"
            onSubmit={signInWithEmail}
          >
            {/* Login */}
            <div className="flex w-full items-center gap-4 rounded-lg border p-2 text-sm ">
              <Mail className="ml-2 h-4 w-4 flex-shrink-0" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 text-xs"
                style={{
                  textDecoration: "unset",
                  border: "unset",
                  outline: "none",
                  width: "100%",
                }}
                maxLength="50"
              />
            </div>

            {/* Sign Up */}
            <div className=" flex w-full items-center gap-4 rounded-lg border p-2 text-sm ">
              <KeyRound className="ml-2 h-4 w-4 flex-shrink-0" />
              <input
                name="password"
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-2 text-xs"
                style={{
                  textDecoration: "unset",
                  border: "unset",
                  outline: "none",
                  width: "100%",
                }}
                maxLength="12"
              />
            </div>

            <button className=" w-full rounded-lg bg-blue-600 p-3 text-sm font-medium text-white">
              Login with Email
            </button>
          </form>

          <div className=" flex w-2/3 items-center justify-between gap-6">
            <div className="h-[1px] w-full bg-gray-200"></div>
            <p className="flex-shrink-0 whitespace-nowrap text-xs font-light text-gray-400">
              OR
            </p>
            <div className="h-[1px] w-full bg-gray-200"></div>
          </div>

          <button
            className="flex w-2/3 items-center justify-center gap-4 rounded-full border border-gray-500 p-3 text-sm font-medium"
            onClick={googleLoginHandler}
          >
            <FcGoogle className="h-4 w-4 flex-shrink-0" />
            Continue With Google
          </button>

          <div className=" w-1/2 text-center text-xs font-light">
            <p>By clicking continue, you agree to our</p>
            <div>
              <Link href="#" className="border-b border-gray-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="border-b border-gray-500">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
