"use client";
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import CardSessions from '@/components/sessions/CardSessions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Axios from '@/lib/axiosInstance';
import Cookies from 'js-cookie';

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
      const { current_page, last_page } = response.data.data.meta;
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
          className="px-2 py-1 border rounded-lg bg-white border-primary text-primary hover:bg-gray-50 text-xs"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className="text-xs">...</span>);
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => fetchSessions(constructUrl(i, filter))}
          className={`px-2 py-1 border rounded-lg text-xs ${
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
        pages.push(<span key="end-ellipsis" className="text-xs">...</span>);
      }
      pages.push(
        <button
          key={last_page}
          onClick={() => fetchSessions(constructUrl(last_page, filter))}
          className="px-2 py-1 border rounded-lg bg-white border-primary text-primary hover:bg-gray-50 text-xs"
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

  return cookieData ? (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-2 py-4 sm:px-4 lg:px-8">
          <div>
            <div className="max-w-lg md:max-w-none py-4">
              <h2 className="text-xl font-bold py-4 text-gray-900 sm:text-2xl">
                Learning Sessions History _______
              </h2>
              <p className="mt-2 text-gray-700 font-bold text-base">
                Below is a list of learning sessions you have created with their status, type, and other details.
                You may start, resume, or review your sessions at any time.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-between items-center">
              <Link href="/Create-Session">
                <button
                  type="button"
                  className="mt-4 text-white bg-primary font-bold rounded-lg text-base px-6 py-2 mb-2 transition-all duration-300 ease-in-out hover:bg-primary hover:scale-105 hover:shadow-lg"
                >
                  Create Session
                </button>
              </Link>
              <nav className="mt-4">
                <ul className="bg-perpel py-2 px-3 sm:px-4 rounded gap-2 text-black inline-flex items-center space-x-1 flex-wrap">
                  {["All", "completed", "ongoing", "Not Started"].map((filterOption) => (
                    <li key={filterOption}>
                      <button
                        onClick={() => handleFilterChange(filterOption)}
                        className={`text-sm font-medium hover:text-primary ${filter === filterOption ? "text-primary" : "text-gray-700"}`}
                      >
                        {filterOption === "All" ? "All" : 
                         filterOption === "completed" ? "Finished" : 
                         filterOption === "ongoing" ? "ONGOING" : "Not Started"}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="m-auto max-w-screen-lg py-4 px-4 gap-4 grid place-items-center">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
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
                  buttonText={
                    session.status === "completed"
                      ? "Review"
                      : session.status === "ongoing"
                      ? "Continue"
                      : "Start"
                  }
                  imgSize="w-20 h-20"
                />
              ))
            ) : (
              <div className='flex flex-col  min-h-[30vh]'>
                  <p className="text-sm text-gray-600 translate-y-[15vh]">No sessions available.</p>
              </div>
            )
          )}
          <div className="inline-flex justify-center gap-2 flex-wrap mt-4 items-center">
            <button
              onClick={() => handlePageChange(pagination.prev)}
              disabled={!pagination.prev}
              className="p-1 inline-flex items-center justify-center rounded-l-lg border border-primary bg-white text-gray-900 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed text-xs"
            >
              <span className="text-primary hover:text-white">Prev Page</span>
            </button>
            {generatePageNumbers()}
            <button
              onClick={() => handlePageChange(pagination.next)}
              disabled={!pagination.next}
              className="p-1 inline-flex items-center justify-center rounded-r-lg border border-primary bg-white text-gray-900 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed text-xs"
            >
              <span className="text-primary hover:text-white">Next Page</span>
            </button>
          </div>
        </div>
      </section>
    </div> 
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <p className="text-gray-700 text-base mb-4">
          You are not logged in. Please login to access this page.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/Login">
            <button className="rounded-lg border bg-primary px-4 py-2 text-white text-xs font-medium transition duration-300 hover:opacity-90">
              Login
            </button>
          </Link>
          <Link href="/Create">
            <button className="rounded-lg border border-primary px-4 py-2 text-primary text-xs font-medium transition duration-300 hover:bg-primary hover:text-white">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Session() {
  return (
    <Suspense fallback={<div className="text-center py-4 text-xs">Loading...</div>}>
      <SessionContent />
    </Suspense>
  );
}
