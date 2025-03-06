"use client";
import React, { useEffect, useState } from 'react'
import CardStore from './card-store';
import Axios from '@/lib/axiosInstance';
import Cookies from 'js-cookie';
import Link from 'next/link';


export default function Store() {

  const cookieData = Cookies.get("user");

    const [loading, setLoading] = useState(true);
    const [Subject, setSubject] = useState([]);

    useEffect(() => {
      const FetchSubject = async () => {
        try {
            const response = await Axios.get('subjects');
          setSubject(response.data.data.data || []);
          setLoading(false);
        } catch (error) {
          console.error( error);
          setLoading(false);
        }
      }
      FetchSubject();
    }, []);


  return cookieData ? (
    <div> 
              <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">

                    <div className="max-w-lg md:max-w-none py-8">
                        <h2 className="text-2xl font-bold pb-9 text-gray-900 sm:text-3xl text-center">
                            Choose a Subject from this and start solving interactive questions
                        </h2>
                        <hr />
                    </div>
                </div>

                <div className='m-auto max-w-screen-lg py-5 px-5 gap-4 grid place-items-center'>
                {
                        loading?(
                            <div className="spinner-container">
                            <div className="spinner"></div>
                          </div>
                        ):(
                            Subject.length > 0 ? (
                                Subject.map((subject) => (
                                
                                <CardStore 
                                key={subject.id}
                                title ={subject.name}
                                questions_count ={subject.questions_count}
                                chapters ={subject.chapters}
                                pricing_plans={subject.pricing_plans}
                                subject_id={subject.id}
                                />
                                ))
                            ) : (
                                <p>No Subject available.</p>
                            )
                        )
                    }
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
