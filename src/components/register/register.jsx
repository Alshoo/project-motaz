

import React from 'react'
import Image from "next/image";
import RejesterForm from './rejesterForm'; 

 
export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      
      <div className="mx-auto my-1 px-1 py-16 sm:px-6 lg:px-8 w-[95%] lg:w-[35%] md:w-[55%]">
       
        <div className="mx-auto shadow-md rounded-xl">
           <span className="flex justify-center">
        <Image src={"logo.svg"} width={100} height={100} alt="logo" />
        </span>
          <h1 className="text-center text-lg font-bold text-blue">
          Create Your Account 
          </h1>

    
            <RejesterForm/>




       
        </div>
      </div>
    </div>
  )
}
