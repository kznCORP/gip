import React, { useContext } from "react";

import { AuthUserContext } from "@/lib/firebase/authContext";
import { FcGoogle } from "react-icons/fc";

export const SignIn = () => {
  const { googleLoginHandler } = useContext(AuthUserContext);

  return (
    <main>
      <section className="z-10 h-screen w-screen overflow-hidden bg-white">
        <div className="h-1/3 w-full bg-blue-200">
          <h2>Image + Logo</h2>
        </div>
        <div className="h-1/5 w-full bg-red-200">
          <h2>Title + Desc</h2>
        </div>
        {/* Login + SignUp */}
        <div className="flex h-1/2 flex-col items-center justify-center gap-5">
          <button className="w-1/2 rounded-3xl bg-blue-600 p-3 font-medium text-white">
            Create Account
          </button>

          <button
            className="flex w-1/2 items-center justify-center gap-4 rounded-3xl border border-black p-3 font-medium text-black"
            onClick={googleLoginHandler}
          >
            <FcGoogle className="text-xl" />
            Sign In With Google
          </button>
        </div>
      </section>
    </main>
  );
};
