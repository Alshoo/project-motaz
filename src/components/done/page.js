'use client'
import React, { useEffect, useState, Suspense } from 'react';
import Axios from '@/lib/axiosInstance';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function DonePageContent() {
  const searchParams = useSearchParams();
  const [resultDetails, setResultDetails] = useState({
    total: null,
    correct: null
  });

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await Axios.get(`exam-Histories/result/${searchParams.get('sessionID')}`);
        setResultDetails({
          total: res.data.data.total,
          correct: res.data.data.correct
        });
      } catch (e) {
        console.error('Error fetching result:', e);
      }
    }
    fetchResult();
  }, [searchParams]);

  return (
    <div>
      <h1 className='my-10 text-stone-600 border-stone-600 border-b-2 w-[50%] m-auto flex justify-center pb-5 text-3xl'>
        Well done! You’ve finished the exam.
      </h1>
      <div className="container text-center m-auto mb-24">
        <h2 className='text-black py-3 know my-11 bg-slate-200 w-80 rounded-3xl m-auto ahmed'>
          <strong>Total</strong> : 
          <span className='text-slate-600'>{resultDetails.correct}/</span>
          <span className='text-blue-500'>{resultDetails.total}</span>
        </h2>
        <Link href='/sessction' className='bg-primary text-white px-5 py-1 rounded-md'>
          Done
        </Link>
      </div>
    </div>
  );
}

export default function DonePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DonePageContent />
    </Suspense>
  );
}
