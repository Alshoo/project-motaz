"use client";
import Axios from '@/lib/axiosInstance';
import useProfile from '@/hooks/profile';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

function Package({ closePopup, pricing_plans, title, subject_ID, questions_count, chapters }) {
  const [coupon, setCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const subject_id = subject_ID;
  const { walletBalance, loading: profileLoading, error: profileError } = useProfile();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await Axios.get("subscriptions");
        const subscription = res.data.data.find(sub => sub.subject_id.id === subject_id);
        if(subscription){
          setCurrentPlanId(subscription.pricing_plan_id.id);
        }
      } catch (e) {
        console.warn(e);
      }
    };
    fetchSubscriptions();
  }, [subject_id]);

  const handleCouponCheck = async () => {
    try {
      const res = await Axios.get(`subscriptions/expired-coupon/${couponCode}`);
      if (res.data.success) {
        setCoupon(res.data.data);
        setCouponError('');
      }
    } catch (e) {
      setCouponError('Invalid coupon code.');
    }
  };

  const calculateTotalPrice = (plan) => {
    if (!plan) return 0;
    let totalPrice = Number(plan.total_price);
    if (plan.discount) {
      totalPrice = Number(plan.price) * (1 - plan.discount / 100);
    }
    if (coupon) {
      totalPrice = totalPrice * (1 - coupon.percent / 100);
    }
    return totalPrice.toFixed(2);
  };

  if (profileLoading) {
    return <div>Loading...</div>;
  }
  if (profileError) {
    return <div className="text-red-500 text-center mt-4">{profileError}</div>;
  }

  const pricing_plan_id = selectedPlan?.id || "";
  const code = couponCode;
  const totalPrice = selectedPlan ? Number(calculateTotalPrice(selectedPlan)) : 0;
  const insufficientBalance = selectedPlan && walletBalance < totalPrice;

  const handlePayment = async () => {
    try {
      const res = await Axios.post('subscriptions/store', { pricing_plan_id, code, subject_id });
      toast.success(res.data.message, {
        duration: 3000,
        position: "top-center",
        style: { fontSize: "15px" },
      });
      closePopup();
    } catch (e) {
      toast.error("Error with pay");
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div className='py-5 px-5 lg:w-[35%] w-80 h-[80%] shadow-2xl bg-white overflow-y-auto rounded-lg'>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-primary pb-2 font-bold text-2xl'>{title}</p>
            <p className='text-black'><span className='font-bold text-black'>{chapters.length} </span>Topics</p>
            <p className='text-black'><span className='font-bold text-black'>{questions_count} </span>Questions</p>
          </div>
          <div>
          <i onClick={closePopup} 
          className="   fa-solid fa-x      cursor-pointer border border-gray-500 font-bold rounded-full px-[7px] py-[5px] hover:bg-gray-200"
          ></i>
          </div>
        </div>
        <div className='flex justify-center items-center p-6'>
          <img className="w-[400px] h-[150px] rounded-lg" src="https://storage.googleapis.com/t16t_assets/gyn_prod_logo.jpg" alt="Gynaecology" />
        </div>
        <div className='gap-5 grid'>
          <h2 className='text-primary font text-2xl'>Please Choose The Package</h2>
          <div className='gap-2 grid'>
            {pricing_plans.length > 0 &&
              pricing_plans.map((item, index) => {
                const isCurrentPlan = item.id === currentPlanId;
                return (
                  <div key={index} className={`flex items-center px-4 py-2 rounded-lg  ${isCurrentPlan ? "opacity-20 border border-gray-400" : "bg-gray bg-opacity-55 border border-gray-400"}`}>
                    <label htmlFor={`bordered-radio-${index}`} className="w-full py-4 ms-2 text-sm font-medium text-black">
                      {item.name} [{item.discount}% Limited Offer Discount]
                    </label>
                    <input
                      id={`bordered-radio-${index}`}
                      type="radio"
                      name="bordered-radio"
                      className="w-4 h-4 bg-white border-black focus:ring-1"
                      onChange={() => setSelectedPlan(item)}
                      disabled={isCurrentPlan}
                      checked={selectedPlan?.id === item.id}
                    />
                  </div>
                );
              })}
          </div>
          <div className="w-full text-center lg:text-start bg-gray rounded-lg my-4 p-5">
            <p className="flex justify-center text-primary text-lg font-bold">Coupon</p>
            <div className='mt-4'>
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="w-full p-3 rounded-lg bg-gray border-gray-200 focus:border-primary placeholder:opacity-55"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="mt-2 text-white bg-primary font-bold rounded-lg text-lg px-[6rem] py-1 m-auto flex justify-center " onClick={handleCouponCheck}>
                Check
              </button>
            </div>
            {couponError && <p className="text-red-500 mt-2">{couponError}</p>}
            {coupon && (
              <div className="mt-4">
                <p className="text-green-500">Coupon Applied: {coupon.code} ({coupon.percent}% off)</p>
              </div>
            )}
          </div>
          {selectedPlan && (
            <div className="w-full text-center lg:text-start border-[1px] border-gray-300 bg-transparent rounded-lg my-4 p-5">
              <h1 className="text-primary text-xl font-bold">Order Summary</h1>
              <hr />
              <div className='flex justify-between items-center pt-3'>
                <p className="text-black text-lg">Selected Plan</p>
                <p className="text-black text-lg">{selectedPlan.name}</p>
              </div>
              <div className='flex justify-between items-center pt-3'>
                <p className="text-black text-lg">Plan Discount</p>
                <p className="text-black text-lg">{selectedPlan.discount}%</p>
              </div>
              <div className='flex justify-between items-center pt-3'>
                <p className="text-black text-lg">Coupon Discount</p>
                <p className="text-black text-lg">{coupon ? `${coupon.percent}%` : '0%'}</p>
              </div>
              <div className='flex justify-between items-center pt-3'>
                <p className="text-black text-lg">Total Price</p>
                <p className="text-black text-lg">{`${calculateTotalPrice(selectedPlan)} YLD`}</p>
              </div>
            </div>
          )}
        </div>
        {selectedPlan && (
          <div>
            <div className='flex justify-between items-center pt-3 pb-2'>
              <p className="text-black text-lg">Balance After Payment</p>
              <p className="text-black text-lg">
                {(walletBalance - totalPrice).toFixed(2)} YLD
              </p>
            </div>
            {insufficientBalance && (
              <p className="text-red-500 text-center mb-2">Your balance is not enough</p>
            )}
            <hr />
          </div>
        )}
        <div className='flex justify-center items-center'>
          <button onClick={handlePayment} type="button" disabled={insufficientBalance} 
          className="mt-4 text-white bg-primary font-bold rounded-lg text-lg px-[4rem] py-1 mb-2 transition duration-300 hover:bg-transparent border hover:border-[1px] hover:border-primary hover:text-black disabled:opacity-50">
            Pay
          </button>
        </div>
      </div>
    </>
  );
}

export default Package;
