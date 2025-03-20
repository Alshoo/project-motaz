"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Axios from '@/lib/axiosInstance';

function Footer() {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await Axios.get("settings");
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching SEO settings:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <footer className="bg-black w-full">
      <div className="mx-auto max-w-screen-xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div>
              <Image src="/name-logo.svg" alt="Logo" width={150} height={50} />
            </div>
            <p className="mt-4 max-w-xs text-white text-xs sm:text-sm leading-relaxed text-start">
              {data?.seo?.description}<br /><br />
              <span className="opacity-50 text-white text-[10px]">&copy; 2025. Company Name. All rights reserved.</span>
              <br />
              <span className="opacity-50 text-white text-[10px]">{data?.contact?.address}</span>
            </p>
            <ul className="mt-4 flex gap-4">
              <li>
                <a href="https://www.facebook.com/share/1DdEGDjJcP/" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">Facebook</span>
                  <Image src="/fac.svg" width={40} height={40} alt="facebook" />
                </a>
              </li>
              <li>
                <a href="https://t.me/mcqsam" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">Telegram</span>
                  <Image src="/teleg.svg" width={40} height={40} alt="Telegram" />
                </a>
              </li>
            </ul>
          </div>
          <div className="flex justify-end items-end">
            <ul className="flex gap-4 text-xs sm:text-sm">
              <li>
                <a href="mailto:motazmcqs@gmail.com" className="text-white">{data?.contact?.email}</a>
              </li>
              <li>
                <a href="tel:+218915227857" className="text-white">{data?.contact?.phone}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
