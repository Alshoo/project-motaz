"use client";
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import CardSessions from '@/components/sessions/CardSessions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Axios from '@/lib/axiosInstance';
import Cookies from 'js-cookie';
import { signIn, useSession } from "next-auth/react";


 function SessionContent() {
    const cookieData = Cookies.get("user");

    const searchParams = useSearchParams();
    const [filter, setFilter] = useState(searchParams.get("action") || "All");
    const [sessionData, setSessionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        prev: null,
        next: null,
    });

    const constructUrl = useCallback((page = 1, filterStatus = "All") => {
        let url = `exam-sessions?page=${page}`;
        if (filterStatus !== "All") {
            url += `&status=${filterStatus.toLowerCase()}`;
        }
        return url;
    }, []);

    const fetchSessions = useCallback(async (url) => {
        try {
            setLoading(true);
            const response = await Axios.get(url);
            const { data } = response.data.data;
            const { prev, next } = response.data.data.links;
            const { current_page ,last_page} = response.data.data.meta;
            
            setSessionData(data || []);
            setPagination({
                current_page,
                last_page,
                prev,
                next,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleFilterChange = useCallback((newFilter) => {
        setFilter(newFilter);
        const newUrl = constructUrl(1, newFilter);
        fetchSessions(newUrl);
    }, [constructUrl, fetchSessions]);

    const handlePageChange = useCallback((url) => {
        if (!url) return;
        const apiUrl = url.replace(/^.*\/api\//, '');
        fetchSessions(apiUrl);
    }, [fetchSessions]);

    const generatePageNumbers = useCallback(() => {
        const pages = [];
        const { current_page, last_page } = pagination;
        const maxVisiblePages = 5;
        let startPage = Math.max(1, current_page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(last_page, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            pages.push(
                <button
                    key="1"
                    onClick={() => fetchSessions(constructUrl(1, filter))}
                    className="px-3 py-1 border rounded-lg bg-white border-primary text-primary hover:bg-gray-50"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(<span key="start-ellipsis">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => fetchSessions(constructUrl(i, filter))}
                    className={`px-3 py-1 border rounded-lg ${
                        current_page === i 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white border-primary text-primary hover:bg-gray-50'
                    }`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < last_page) {
            if (endPage < last_page - 1) {
                pages.push(<span key="end-ellipsis">...</span>);
            }
            pages.push(
                <button
                    key={last_page}
                    onClick={() => fetchSessions(constructUrl(last_page, filter))}
                    className="px-3 py-1 border rounded-lg bg-white border-primary text-primary hover:bg-gray-50"
                >
                    {last_page}
                </button>
            );
        }

        return pages;
    }, [pagination, filter, constructUrl, fetchSessions]);

    useEffect(() => {
        const initialUrl = constructUrl(1, filter);
        fetchSessions(initialUrl);
    }, [constructUrl, fetchSessions, filter]);

    const filteredSessions = filter === "All" 
    ? sessionData 
    : sessionData.filter(session => session.status === filter);




    const { data: session } = useSession();

    if (session) {
      return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h1> Name {session.user.name || ''}</h1>
          <p> EMAIL : {session.user.email || ''}</p>
          <p> TOKEN : {session.accessToken || ''}</p>
          <button onClick={() => signOut()}>تسجيل الخروج</button>
        </div>
      );
    }





    
    return cookieData ?(
        <div>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div>
                        <div className="max-w-lg md:max-w-none py-5">
                            <h2 className="text-2xl font-bold py-6 text-gray-900 sm:text-3xl">
                                Learning Sessions History _______
                            </h2>
                            <p className="mt-4 text-gray-700 font-bold text-xl">
                                Below is a list of learning sessions you have created with their status, type,
                                and other details. You may do a number of actions such as start,
                                resume, or review your sessions at any time.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-between items-center">
                            <Link href="/Create-Session">
                                <button
                                    type="button"
                                    className="mt-4 text-white bg-primary font-bold rounded-lg text-lg px-[2rem] py-1 me-2 mb-2 
                                    outline-none transition duration-300 
                                    hover:bg-transparent hover:border-[1px] hover:border-primary hover:text-black"
                                >
                                    Create Session
                                </button>
                            </Link>

                            <nav
                                className="flex px-5 py-3 rounded-lg "
                                aria-label="Breadcrumb"
                            >
                                        <ul className="bg-perpel py-2 px-3 md:px-6 rounded gap-4 text-black inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {["All", "completed", "ongoing", "Not Started"].map((filterOption) => (
                    <li key={filterOption}>
                        <div className="flex items-center">
                            <button
                                onClick={() => handleFilterChange(filterOption)}
                                className={`ms-1 text-bold font-medium text-gray-700 hover:text-primary md:ms-2 ${
                                    filter === filterOption ? "text-primary" : ""
                                }`}
                            >
                                {filterOption === "All" ? "All" : 
                                 filterOption === "completed" ? "Finished" : 
                                 filterOption === "ongoing" ? "ONGOING" : "Not Started"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className='m-auto max-w-screen-lg py-5 px-5 gap-4 grid place-items-center'>
                    {
                        loading?(
                            <div className="spinner-container">
                            <div className="spinner"></div>
                          </div>
                        ):(
                            sessionData.length > 0 ? (
                                filteredSessions.map((session) => (
                                    <CardSessions
                                        key={session.id}
                                        Session_id={session.id}
                                        statusText={session.status}
                                        subject={session.subject_id}
                                        chapters={session.chapters}
                                        mode={session.mood_id}
                                        created_at={session.created_at}
                                        updated_at={session.updated_at}
                                        question_count={session.question_count}
                                        buttonText={session.status === "completed" ? "Review" : session.status === "ongoing" ? "Continue" : "Start"}
                                    />
                                ))
                            ) : (
                                <p>No sessions available.</p>
                            )
                        )
                    }
                


                <div className="inline-flex justify-center gap-2 flex-wrap">
                    <button
                        onClick={() => handlePageChange(pagination.prev)}
                        disabled={!pagination.prev}
                        className="p-1 inline-flex items-center justify-center rounded-s-full border border-primary bg-white text-gray-900 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="text-primary hover:text-white">Prev Page</span>
                    </button>

                    {generatePageNumbers()}

                    <button
                        onClick={() => handlePageChange(pagination.next)}
                        disabled={!pagination.next}
                        className="p-1 inline-flex items-center justify-center rounded-e-full border border-primary bg-white text-gray-900 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="text-primary hover:text-white">Next Page</span>
                    </button>
                </div>
                  
                </div>
            </section>
        </div>
    ):(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <p className="text-gray-700 text-lg mb-6">
            You are not logged in. Please login to access this page.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/Login">
              <button className="rounded-lg border bg-primary px-6 py-3 text-white text-sm font-medium transition duration-300 hover:opacity-90">
                Login
              </button>
            </Link>
            <Link href="/Create">
              <button className="rounded-lg border border-primary px-6 py-3 text-primary text-sm font-medium transition duration-300 hover:bg-primary hover:text-white">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
      )
}



export default function Session() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SessionContent/>
      </Suspense>
    );
  }