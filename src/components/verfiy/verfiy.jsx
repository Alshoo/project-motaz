"use client"
import React from 'react'
import Image from "next/image";
import VerfiyForm from './verfiyForm';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Verify() {  
      const EmailVerified = Cookies.get("EmailVerified");
      
    return (
        <div  className="flex items-center justify-center min-h-screen ">
            <div className="mx-auto my-1 px-1 py-16 sm:px-6 lg:px-8 w-[95%] lg:w-[35%] md:w-[55%]">
                <div className="mx-auto shadow-md rounded-xl">
                    <span className="flex justify-center">
                        <Image src={"logo.svg"} width={100} height={100} alt="logo" />
                    </span>
                   <div className='sm:px-6 lg:px-8'>

                   <Link href={'/Create'} className='my-10 pb-10'>
                    <button className="flex justify-center text-black">
                        <Image src={'left 9.svg'} height={0} width={20} alt="back"/>
                        back
                    </button>
                    </Link> 

                   <h1 className="text text-lg font-bold text-blue mt-6">
                    Verify your email
                    </h1>
                    <p className="text-stone-600">The verification code has been sent to your email { }
                       {EmailVerified}
                    </p>
                   </div>
                    <VerfiyForm /> 
                </div>
            </div>
        </div>
    )
}
