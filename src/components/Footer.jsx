import React from 'react'
import Image from 'next/image'
import Axios from '@/lib/axiosInstance';

async function Footer() {
  // let Data = {};
  // try {
  //   const res = await Axios.get("settings");
  //   Data = res.data.data;
  // } catch (error) {
  //   console.error("Error fetching SEO settings:", error);
  // }

  return (
    <footer className="bg-black w-full">
      <div className="mx-auto max-w-screen-xl space-y-4 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div>
              <Image src="/name-logo.svg" alt="Logo" width={150} height={50} />
            </div>
            <p className="mt-4 max-w-xs text-white text-xs sm:text-sm leading-relaxed text-start">
            The first free end-to-end analytics service for the site, The first free end-to-end analytics service for the site,<br /><br /><span className="opacity-50 text-white text-[10px]">&copy; 2025. Company Name. All rights reserved.</span>
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
              <a href="mailto:motazmcqs@gmail.com" className="text-white">motazmcqs@gmail.com</a>
              </li>
              <li>
              <a href="tel:+218915227857" className="text-white">+218915227857</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
