"use client"

import Image from "next/image";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
 
export default function RejesterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const { register } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !mobile) {
      setErr("Please, Enter All Inputs.");
      return;
    }
    setErr("");
    setIsLoading(true);
    register({ name, email, password, mobile });
  };

  return (
    <div className=" mx-auto mt-6 space-y-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <form method="POST" onSubmit={handleRegister} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <div className="relative">
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Name"
            />
          </div>
        </div>
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
        </div>
        <div>
          <label htmlFor="mobile" className="sr-only">Mobile</label>
          <div className="relative">
            <input
              type="tel"
              id="mobile"
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              value={mobile}
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Mobile"
            />
          </div>
        </div>
        {err && <p className="text-red-600 font-bold text-sm">{err}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition duration-300 hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link className="underline text-primary" href="/Login">
            Login
          </Link>
        </p>
      </form> 

     
           {/* <div className="flex items-center justify-center">
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
           
           </div> */}



    </div>
  );
}
