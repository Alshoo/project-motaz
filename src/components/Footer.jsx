import React from 'react'
import Image from 'next/image'

function Footer() {
    return (
        <footer className="bg-black w-full">
            <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <div>
                        <div className="">
                            <img src="/name-logo.svg" />
                        </div>

                        <p className="mt-4 max-w-xs text-white text-sm leading-relaxed text-start">
                            The first free end-to-end analytics service for the site,
                            The first free end-to-end analytics service for the site,
                            <br />
                            <br />
                            <span className='opacity-50 text-white text-xs'>
                                &copy; 2025. Company Name. All rights reserved.
                            </span>
                        </p>

                        <ul className="mt-8 flex gap-6">
                            <li>
                                <a
                                    href="https://www.facebook.com/share/1DdEGDjJcP/"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 transition hover:opacity-75"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <Image src="/fac.svg" width={50} height={50} alt='facebook' />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://t.me/mcqsam"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 transition hover:opacity-75"
                                >
                                    <span className="sr-only">Telegram</span>
                                    <Image src="/teleg.svg" width={50} height={50} alt='Telegram' />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className='flex justify-end items-end'>
                        <ul className='flex gap-4'>
                            <li>
                                <a href="mailto:motazmcqs@gmail.com" className='text-white'>motazmcqs@gmail.com</a>
                            </li>
                            <li>
                                <a href="tel:+218915227857" className='text-white'>+218915227857</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
