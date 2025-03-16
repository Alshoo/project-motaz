import React from 'react'
import Image from "next/image";
import VerfiyForm from './verfiyForm';
import Link from 'next/link';

export default function Verify() {  
    return (
        <div>
            <div className="mx-auto my-1 max-w-screen-xl px-1 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w md:max-w-lg shadow-md rounded-xl ">
                    <span className="flex justify-center">
                        <Image src={"logo.svg"} width={100} height={100} alt="logo" />
                    </span>
                   <div className='sm:px-6 lg:px-8'>

                   <Link href={'/Create'} className='my-6'>
                    <button className="flex justify-center text-black">
                        <Image src={'left 9.svg'} height={0} width={20} alt="back"/>
                        back
                    </button>
                    </Link>

                   <h1 className="text text-lg font-bold text-blue">
                    Verify your email
                    </h1>
                    <p className="text-stone-600">The verification code has been sent to your email
                    amma@gmail.com
                    </p>
                   </div>
                    <VerfiyForm /> 
                </div>
            </div>
        </div>
    )
}
