"use client";
import React, { useEffect, useState } from 'react';
import Package from './Package';
import Axios from '@/lib/axiosInstance';

function CardStore({ title, pricing_plans, subject_ID, questions_count, chapters, Subject_Image }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCardDisabled, setIsCardDisabled] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectRes = await Axios.get("subscriptions");
        const subscription = subjectRes.data.data.find(sub => sub.subject_id.id === subject_ID);
        if (subscription) {
          setIsCardDisabled(subscription.pricing_plan_id.free_trial === "1");
        }
      } catch (err) {
        console.warn(err);
      }
    };
    fetchData();
  }, [subject_ID]);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 bg-white rounded shadow-lg border border-gray-300 p-4 ${isCardDisabled ? "opacity-50" : ""}`}>
      <div className="flex justify-center items-center">
        <img
          className="object-cover rounded-lg w-40 md:w-48 h-28 md:h-32"
          src={Subject_Image ? Subject_Image : "https://storage.googleapis.com/t16t_assets/gyn_prod_logo.jpg"}
          alt={title}
          width={50} height={50} layout="intrinsic" />
      </div>
      <div className="flex flex-col justify-center items-start">
        <div className="mb-4 gap-2 grid text-xs md:text-sm font-bold text-gray-900 justify-center items-center">
          <h2 className="text-primary font-bold text-xl md:text-2xl m-0">{title}</h2>
          <h3 className="text-black font-bold text-sm md:text-md m-0">Contains {questions_count} Questions</h3>
          <p className="text-blackOpacity text-sm md:text-base m-0">Choose to buy one of the items and enjoy high-quality content.</p>
          <button onClick={togglePopup} disabled={isCardDisabled} className={`mt-4 w-full lg:w-[75%] font-light px-3 py-2 border border-transparent bg-primary text-white rounded-lg shadow-md transition duration-300 ${isCardDisabled ? "" : "hover:border-primary hover:text-primary hover:bg-transparent"}`}>
            {isCardDisabled ? "Subscribed" : "Explore Packages"}
          </button>
        </div>
      </div>
      <div className="flex flex-col md:items-end items-center justify-center relative mb-5 md:mb-0">
        <p className="text-black opacity-40 text-sm md:text-base font-semibold absolute top-0">
          Start at {pricing_plans[0]?.total_price} LYD
        </p>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-lg">
          <Package
            closePopup={togglePopup}
            pricing_plans={pricing_plans}
            title={title}
            subject_ID={subject_ID}
            questions_count={questions_count}
            chapters={chapters}
            Subject_Image={Subject_Image}
          />
        </div>
      )}
    </div>
  );
}

export default CardStore;
