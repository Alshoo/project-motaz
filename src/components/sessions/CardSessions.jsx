"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Axios from '@/lib/axiosInstance';

function CardSessions({ statusText, buttonText, mode, question_count, created_at, updated_at, chapters, subject,Session_id }) {
    const dateOnly1 = created_at.split("T")[0];
    const dateOnly2 = updated_at.split("T")[0];


    const statusColor = statusText === "completed"
        ? "bg-primary"
        : statusText === "ongoing"
            ? "bg-green"
            : "bg-blackOpacity";

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 bg-white rounded shadow-lg border-[.5px] border-gray p-6">
            <div className="flex justify-center items-center">
                <Image
                    className="object-cover rounded-lg w-full md:w-48 h-40"
                    src="/sessction.svg"
                    alt="Technology Acquisitions 2021"
                    width={200}
                    height={200}
                    layout="intrinsic"
                />
            </div>

            <div className="flex flex-col justify-center items-start">
                <div className="mb-4 flex flex-wrap gap-3 text-sm font-bold text-gray-900 justify-center items-center">
                    <h3 className={`text-md font-bold me-1 py-1 px-2 rounded text-white ${statusColor}`}>{statusText}</h3>
                    <h3 className='text-black text-md font-bold'>{`${mode == 1 ? 'study' : 'Exam'} Mode with ${question_count} questions`}</h3>
                </div>
                <ul className="text-gray-700 grid gap-2">
                    <li>
                        <span>Subject </span>: {subject?.name || "Loading..."}
                    </li>
                    <li>
                        <span>Topics </span>: {chapters.length > 0 ? chapters.map((item) => ` ( ${item.name} ) `) : "Loading..."}
                    </li>
                    <li>
                        <span>Last access </span>: {dateOnly2}
                    </li>
                </ul>
            </div>

            <div className="flex flex-col md:items-end items-center justify-between">
                <p className="text-black opacity-40 text-sm font-semibold">
                    Created at: {dateOnly1}
                </p>
                {
                    statusText === 'ongoing' ? (
                        <Link
                href={`MCQ?id=${Session_id}`}
                 className="mt-4 w-25 px-4 py-2 border-[1px] border-black text-black bg-transparent hover:bg-black hover:text-white rounded flex flex-wrap justify-center items-center outline-none transition duration-300"
                 
                 >
                    <Image className="me-2" src="/documents 1.svg" width={30} height={30} alt='ERR404' />
                    {buttonText}
                </Link>
                    ):(
                        <Link
                href={`done?sessionID=${Session_id}`}
                 className="mt-4 w-25 px-4 py-2 border-[1px] border-black text-black bg-transparent hover:bg-black hover:text-white rounded flex flex-wrap justify-center items-center outline-none transition duration-300"
                 
                 >
                    <Image className="me-2" src="/documents 1.svg" width={30} height={30} alt='ERR404' />
                    {buttonText}
                </Link>
                    )
                }
            </div>
        </div>
    )
}

export default CardSessions;
