"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
function CardSessions({ statusText, buttonText, mode, question_count, created_at, updated_at, chapters, subject, Session_id, examsItems }) {
  const dateOnly1 = created_at.split("T")[0];
  const dateOnly2 = updated_at.split("T")[0];
  const statusColor = statusText === "completed" ? "bg-primary" : statusText === "ongoing" ? "bg-green" : "bg-blackOpacity";
  
  
  return (
    <div className="w-[100%] grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 bg-white rounded shadow-lg border border-gray-300 p-4">
      <div className="flex justify-center items-center">
        <Image className="object-cover rounded-lg w-32 h-24 md:w-48 md:h-40" src="/sessction.svg" alt="Technology Acquisitions 2021" width={200} height={200} layout="intrinsic" />
      </div>
      <div className="flex flex-col justify-center items-start">
        <div className="mb-2 flex flex-wrap gap-2 text-xs md:text-sm font-bold text-gray-900 justify-center items-center">
          <h3 className={`${statusColor} py-1 px-2 rounded text-white text-xs md:text-sm`}>{statusText}</h3>
          <h3 className="text-black font-bold text-xs md:text-sm">{mode == 1 ? 'study' : 'Exam'} Mode with {question_count} questions</h3>
        </div>
        <ul className="text-gray-700 grid gap-1 text-xs md:text-sm">
          <li><span className="text-primary font-bold">Subject </span>: {subject?.name || "Loading..."}</li>
          <li className="truncate"><span className="text-primary font-bold">Topics </span>: {chapters.length > 0 ? chapters.map(item => `(${item.name}) `) : "Loading..."}</li>
          <li><span className="text-primary font-bold">Last access </span>: {dateOnly2}</li>
        </ul>
      </div>
      <div className="flex flex-col md:items-end items-center justify-between">
        <p className="text-black opacity-40 text-xs md:text-sm font-semibold">Created at: {dateOnly1}</p>
        <Link href={`/MCQ?id=${Session_id}`} className="mt-2 w-auto px-2 py-1 border border-black text-black bg-transparent hover:bg-black hover:text-white rounded flex flex-wrap justify-center items-center transition duration-300 text-xs md:text-sm">
          <i className="mr-1 fa-regular fa-rectangle-list"></i>{buttonText}
        </Link>
      </div>
    </div>
  );
}
export default CardSessions;
