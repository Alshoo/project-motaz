"use client"
import Image from "next/image";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { UserLogin } from "@/Helper/Apis/Auth";
import { AuthContext } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { signIn, signOut, useSession } from "next-auth/react";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(email, password);

    if (email === "") {
      setErr("Please, Enter Your Email.");
      return;
    }
    if (password === "") {
      setErr("Please, Enter Your Password.");
      return;
    }
    setErr("");
    setIsLoading(true);
    login({ email, password });
  };

  return (
    <div className=" mx-auto mt-6 space-y-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <form method="POST" className="flex flex-col gap-4" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <div className="relative">
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Password"
            />
          </div>
          {err && <p className="mt-2 text-red-600 font-bold text-sm">{err}</p>}
          {/* <div className="mt-3">
            <Link className="underline text-primary text-sm" href="/Create">
              Forget your password?
            </Link>
          </div>  */}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition duration-300 hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        No account yet?{" "}
        <Link className="underline text-primary" href="/Create">
          Create account
        </Link>
      </p>

      <div className="flex items-center justify-center">
        <span className="border-b w-1/5 md:w-1/4"></span>
        <h6 className="mx-2 text-sm text-gray-600">or</h6>
        <span className="border-b w-1/5 md:w-1/4"></span>
      </div>

      <div className="space-y-4">



        <button 
        className="flex w-full justify-center items-center gap-3 border rounded-lg py-3 px-4 transition duration-300 hover:bg-gray-100"
        onClick={() => signIn("google")}
        >
          <Image width={25} height={25} src="/google.svg" alt="Google" />
          <span className="text-sm font-medium">Continue With Google</span>
        </button>



        <button 
        onClick={() => signOut()}
        className="flex w-full justify-center items-center gap-3 border rounded-lg py-3 px-4 transition duration-300 hover:bg-gray-100">
          <Image width={25} height={25} src="/apple.svg" alt="Apple" />
          <span className="text-sm font-medium">Continue With Apple</span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
