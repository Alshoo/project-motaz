import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
    const la = ''
  return (
    <>

      <div className="mx-auto my-14 max-w-screen-xl px-16 py-16 sm:px-6 lg:px-8 bg-slate-300 rounded-lg ahmed">
       <Link href={'/Create'}>
       <button className="flex justify-center text-black">
        <Image src={'left 9.svg'} height={0} width={20} alt="back"/>
        back
        </button></Link>
        <div className="mx-auto max-w-lg">
         <h2 className="text-primary mt-10">Verify your email</h2>
         <p className="text-stone-600">The verification code has been sent to your email
 amma@gmail.com
</p>

          <form
            action="#"
            className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
         

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="number"
                  max={1}
                  className="w-6 rounded-lg border-gray-100 p-3 px-5 text-sm shadow-xs mx-1"
                  
                />
                 <input
                  type="number"
                  max={1}
                  className="w-6 rounded-lg border-gray-100 p-3 px-5 text-sm shadow-xs mx-1"
                  
                />
                 <input
                  type="number"
                  max={1}
                  className="w-6 rounded-lg border-gray-100 p-3 px-5 text-sm shadow-xs mx-1"
                  
                />
                 <input
                  type="number"
                  max={1}
                  className="w-6 rounded-lg border-gray-100 p-3 px-5 text-sm shadow-xs mx-1"
                  
                />
                 <input
                  type="number"
                  max={1}
                  className="w-6 rounded-lg border-gray-100 p-3 px-5 text-sm shadow-xs mx-1"
                  
                />
                 <input
                  type="number"
                  max={1}
                  className="w-6 rounded-lg border-gray-100 p-3 px-5 text-sm shadow-xs mx-1"
                  
                />
{la === ''? (
    <h4 className="text-red-700 my-5"> The verification code is invalid.</h4>
    
):''}
<h4>Not received yet? <span className="underline text-primary">Resend verification code</span></h4>
              </div>
            </div>
            <Link href={'/Create/Verfy/save'}>
            <button
              type="submit"
              className="block w-full rounded-lg bg-blue-900 px-5 py-3 mt-5 text-sm font-medium text-white"
            >
             Continue
            </button>
            </Link>
          
         
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
