"use client";

import React, { useContext, useEffect, useState } from "react";

import { AuthUserContext } from "@/lib/authContext";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { KeyRound, Mail, User } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

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
    <>
      <Logo />

      <section className="flex h-screen items-center justify-center bg-white">
        <div className="flex h-3/4 w-full max-w-lg flex-col items-center justify-center gap-8 rounded-xl md:border">
          <div className="mb-6 mt-12 w-2/3 text-center">
            <h2 className="text-2xl font-medium">Create an Account</h2>
            <p className="mt-2 text-xs font-light text-gray-400">
              Enter your details or continue with our sign-up providers
            </p>
          </div>

          <form
            className="flex w-2/3 flex-col gap-4"
            onSubmit={registerAccount}
          >
            <div className="flex w-full items-center gap-4 rounded-lg border p-2 text-sm ">
              <User className="ml-2 h-4 w-4 flex-shrink-0" />
              <input
                name="Name"
                type="Name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                maxLength="50"
              />
            </div>

            <button className=" w-full rounded-lg bg-blue-600 p-3 text-sm font-medium text-white">
              Sign up with Email
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
            Sign up with Google
          </button>

          <div className="mb-12 w-1/2 text-center text-xs font-light">
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
