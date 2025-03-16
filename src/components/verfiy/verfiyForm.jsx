"use client";
import Image from "next/image";
import React, { useContext, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const VerfiyForm = () => {
  const [digits, setDigits] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const { verfiy, resendCode } = useContext(AuthContext);
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
      if (value && index < digits.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && digits[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length !== 5) {
      setErr("Please, enter your 5-digit code.");
      return;
    }
    setErr("");
    setIsLoading(true);
    verfiy({ code });
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    if (typeof resendCode === "function") {
      await resendCode();
    } else {
      toast.success("Verification code resent.");
    }
    setResendTimer(60);
  };

  useEffect(() => {
    if (resendTimer === 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <div className="mx-auto mt-3 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <form method="POST" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 text-center text-xl rounded-lg border-gray-200 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>
        {err && <p className="mt-2 text-red-600 font-bold text-sm">{err}</p>}
        <h4>
          {resendTimer > 0 ? (
            <span className="text-gray-500">Resend in {resendTimer} seconds</span>
          ) : (
            <h4>
            Not received yet?{" "}
            <span className="underline text-primary cursor-pointer" onClick={handleResend}>
              Resend verification code
            </span>
          </h4>
          )}
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
