"use client";

import Link from "next/link";

const Login = () => {
  return (
    <>
      <main>
        <section className="z-10 h-screen w-screen overflow-hidden bg-white">
          <div className="flex h-1/2 w-full items-center justify-center bg-blue-200">
            <h2>Image + Logo</h2>
          </div>

          {/* Login + SignUp */}
          <div className="flex h-1/2 flex-col items-center justify-center gap-5">
            <Link
              href="/login/signin"
              className="mt-3 w-1/2 rounded-3xl bg-blue-600 p-3 text-center font-medium text-white"
            >
              <button>Log In</button>
            </Link>

            <Link
              href="/login/signup"
              className="flex w-1/2 items-center justify-center gap-4 rounded-3xl border border-blue-600 p-3 font-medium text-blue-600"
            >
              <button>Create Account</button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
