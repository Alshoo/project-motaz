"use client"
import Axios from '@/lib/axiosInstance';
import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";

export default function PaymentProcessPage() {

  const [code, setcode] = useState();
  const [Price, setPrice] = useState();
 
  const data = {
    voucher:code,
    voucher_value:Price,
  }
  const handleTransaction = async () => {
    try {
      const response = await Axios.post("transactions", data);
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-center",
        style: { fontSize: "20px", width: "50%" },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed", {
        duration: 4000,
        position: "top-center",
        style: { fontSize: "20px", width: "50%" },
      });
    }
  };






  return (
    <div className='flex justify-center'>
            <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div className='my-10 p-9 rounded-lg bg-[#EBEBEB] max-w-screen-lg m-auto'>

      <div className="w-full text-center lg:text-start border-[1px] border-black bg-gray rounded-lg p-5">
            <h1 className="text-primary text-3xl font-bold">Payment</h1>
            <p className="mt-3 text-black text-sm opacity-50 font-bold ">
            Add funds by entering your account number and the amount to be paid.
              </p>
           </div>


          <div className='flex flex-col mt-5'>
            <input type='text'
            placeholder='Add your code'
              className=' border-none rounded-lg p-3 w-[90%] sm:w-[60%] m-auto mb-5'
              value={code}
                              onChange={(e) => {
                                setcode(e.target.value)
                              }}
              />
            
            
            
            <input type='text'
            placeholder='Add Price'
              className=' border-none rounded-lg p-3 w-[90%] sm:w-[60%] m-auto mb-5'
              value={Price}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPrice(value)
              }}
              />
            <button onClick={handleTransaction} className='bg-primary text-white rounded-lg p-3 w-full'>Submit</button>
          </div>
      </div>
    </div>
  )
}
