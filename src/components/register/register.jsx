

import React from 'react'
import Image from "next/image";
import RejesterForm from './rejesterForm';


export default function Register() {
  return (
    <div>
      
      <div className="mx-auto max-w-screen-xl px-1 py-16 sm:px-6 lg:px-8">
       
        <div className="mx-auto max-w md:max-w-lg shadow-md rounded-xl">
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
