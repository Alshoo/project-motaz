"use client"
import Axios from '@/lib/axiosInstance';
import Cookies from 'js-cookie';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function MainWalletPage() {
  const cookieData = Cookies.get("user");

    const [Blance, setBlance] = useState();
    useEffect(() => {
     const fetchBalance = async () =>{
        try{
            const res = await Axios.get('transactions/balance');
            setBlance(res.data.data.balance)
        }catch(e){
            console.error(e);
        }
     }
     
     fetchBalance();
    }, []);

  return cookieData ? (
    <div>
          <div className="flex gap-10 flex-col items-start my-10 p-9 rounded-lg bg-[#EBEBEB] max-w-screen-lg m-auto">

            <div className="w-full text-center lg:text-start border-[1px] border-black bg-[#EBEBEB] rounded-lg p-5">
            <h1 className="text-primary text-3xl font-bold">Payment</h1>
            <p className="mt-3 text-black text-sm opacity-50 font-bold ">You can add funds to your wallet using any of the available methods below</p>
            </div>

            <div className="flex flex-col items-center lg:items-start">
            <div
             className="bg-primary py-5 px-12 text-center rounded-lg flex flex-col items-center text-white shadow-lg hover:bg-primary-dark transition">
                <h6 className="flex items-center text-lg">
                <Link  href='/'>
                <Image width={200} height={200} src="Vector.svg" alt="Balance Icon" className="w-6 h-6 mr-2" />
                </Link>
                 Balance
                </h6>
                <h1 className="text-white text-2xl font-semibold">{Blance} YLD</h1>
            </div>
            </div>

            <div className="w-full text-center lg:text-start border-[1px] border-black bg-gray rounded-lg p-5">
            <h1 className="text-primary text-3xl font-bold">Add Funds</h1>
            <p className="mt-3 text-black text-sm opacity-50 font-bold ">Pick method to charge your wallet</p>
            <div className="mt-10 flex gap-10 flex-wrap justify-center lg:justify-start">
{/* 
                <div className='p-2 flex flex-col items-center justify-center rounded-lg hover:bg-gray-100 transition' style={{ boxShadow: "0px 2px 2px 0px #00000047" }}>
                <button className="">
                <Image width={100} height={100} src="iCash (1) 1.svg" alt="Voucher" className="" />
                </button>
                <h4 className="mt-5 text-md font-medium">Voucher</h4>
            </div> */}

            <Link href='wallet/PaymentProcess' className="py-8 px-2 flex flex-col items-center justify-center rounded-lg shadow-sm hover:bg-gray-100 transition" style={{ boxShadow: "0px 2px 2px 0px #00000047" }}>
                <button >
                <Image width={100} height={100} src="iCash (1) 1.svg" alt="Cash" className="py-5" />
                </button>
                <h2 className="text-xl font-medium">ICash</h2>
            </Link>

            </div>
            </div>

            </div >
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
