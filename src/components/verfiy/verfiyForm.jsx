"use client"
import Image from "next/image";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { signIn, signOut, useSession } from "next-auth/react";
 
const VerfiyForm = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const { verfiy } = useContext(AuthContext);

  const handleVerfiy = async (e) => {
    e.preventDefault();
    if (code === "" || code.length !== 5) {
      setErr("Please, enter your 5-digit code.");
      return;
    }
    setErr("");
    setIsLoading(true);
    verfiy({ code });
  };

  return (
    <div className="mx-auto mt-3 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <form method="POST" className="flex flex-col gap-4" onSubmit={handleVerfiy}>
        <div>
          <label htmlFor="otp" className="sr-only">Verification Code</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              id="otp"
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter 5-digit code"
            />
          </div>
          {err && <p className="mt-2 text-red-600 font-bold text-sm">{err}</p>}
        </div>
        <h4>
          Not received yet?{" "}
          <span className="underline text-primary">Resend verification code</span>
        </h4>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition duration-300 hover:opacity-90 disabled:opacity-50"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default VerfiyForm;
