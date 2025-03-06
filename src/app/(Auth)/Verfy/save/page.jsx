import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  const la = "";
  return (
    <>
      <div className="mx-auto my-14 max-w-screen-xl px-16 py-16 sm:px-6 lg:px-8 bg-slate-300 rounded-lg ahmed">
        <Link href={"/Create/Verfy"}>
          <button className="flex justify-center text-black">
            <Image src={"left 9.svg"} height={0} width={20} alt="back" />
            back
          </button>
        </Link>
        <div className="mx-auto max-w-lg">
          <h2 className="text-primary mt-10">Set Password</h2>
          <p className="text-stone-600">
            Password Requires a minimum of 8 characters.
          </p>

          <form
            action="#"
            className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <div>
              <label htmlFor="Password" className="sr-only">
                Password
              </label>
            </div>
            <Link href={"/Login"}>
              <button
                type="submit"
                className="block w-full rounded-lg bg-blue-900 px-5 py-3 mt-5 text-sm font-medium text-white"
              >
                Save Password
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
