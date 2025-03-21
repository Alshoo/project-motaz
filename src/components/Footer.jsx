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
                <a href={data?.social_media?.facebook} rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">Facebook</span>
                  <i className="fa-brands fa-facebook p-3 bg-white rounded-full" ></i>
                </a>
              </li>
              <li>
                <a href={data?.social_media?.telegram} rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">Telegram</span>
                  <i className="fa-brands fa-telegram p-3 bg-white rounded-full" ></i>
                </a>
              </li>
              <li>
                <a href={data?.social_media?.instagram} rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">instagram</span>
                  <i className="fa-brands fa-square-instagram p-3 bg-white rounded-full" ></i>
                </a>
              </li>
              <li>
                <a href={data?.social_media?.twitter} rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">Twitter</span>
                  <i className="fa-brands fa-twitter p-3 bg-white rounded-full" ></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex justify-end items-end">
            <ul className="flex gap-4 text-xs sm:text-sm">
              <li>
                <a href={`mailto:${data?.contact?.email}`} className="text-white">{data?.contact?.email}</a>
              </li>
              <li>
                <a href={`tel:${data?.contact?.phone}`} className="text-white">{data?.contact?.phone}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
