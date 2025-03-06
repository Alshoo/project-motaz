"use client";

import Header from "@/components/Header";

import Link from "next/link";
import { useState } from "react";
import "./Lesson.css";
import CreateSession from "../Create-Session/page";
import Image from "next/image";
const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(false);
  

  return (
    <>
      {CreateSession === "" ? (
        <>
          <Header />
          <div className="container mt-5 ">
            <div className="flex items-center justify-between mb-6 text-nowrap">
              <button className="flex items-center text-white font-medium bg-primary px-2 py-2 rounded-lg">
                <Image src="left 9.svg" alt="back" width={20} height={0} />
                Back
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 ahmed rounded-3xl">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-primary">
                  Create a Learning Session
                </h2>
                <p className="text-gray-500 text-sm">
                  In the form below you can create a new Study mode session.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-primary font-medium">Topics</h3>
                <p className="text-gray-500 text-sm mb-2">
                  Select topics based on subject and year.
                </p>
                <select className="w-full border p-2 rounded-lg mb-2">
                  <option>Choose a Subject</option>
                </select>
                <select className="w-full border p-2 rounded-lg mb-4">
                  <option>Choose a Year or Years</option>
                </select>
                <div className="flex flex-col items-center justify-center bg-stone-400 p-4 rounded-lg">
                  <span className="text-4xl mt-10 mb-3">
                    <Image width={100} height={20} src="sad 1.svg" alt="sad" />
                  </span>
                  <p className="text-gray-500 text-sm mb-3">
                    Couldn't Find any Topics
                  </p>
                  <p className="text-gray-400 text-xs">
                    Please Change Your filters and try again
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-primary font-medium">
                  Amount of Questions
                  <span>
                    Set the amount of questions to have in the session
                  </span>
                </label>
                <input
                  type="number"
                  className="w-20 border-none p-2 rounded-lg mt-2"
                />
                / <strong>0</strong>
              </div>

              <button className="w-full bg-primary text-white p-2 rounded-lg font-medium">
                Submit
              </button>
            </div>
          </div>
        </>
      ) : (
        <CreateSession />
      )}
    </>
  );
};

export default page;
