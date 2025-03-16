"use client"
import Axios from "@/lib/axiosInstance";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
 
function Popup({ closePopup, subjectName, topics, questionCount, data ,exams}) {
  const handleStartSession = async () => {
    try {
      const response = await Axios.post("exam-sessions", data);
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-center",
        style: { fontSize: "15px" },
      });
      window.location.href = `/MCQ?id=${response.data.data.id}`;
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed", {
        duration: 4000,
        position: "top-center",
        style: { fontSize: "15px"},
      });
    }
  };

  const handleCreateAnother = async () => {
    try {
      const response = await Axios.post("exam-sessions", data);
      toast.success(response.data.message, {
        duration: 4000,
        position: "top-center",
        style: { fontSize: "15px"},
      });
      closePopup();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed", {
        duration: 4000,
        position: "top-center",
        style: { fontSize: "15px"},
      });
    }
  };

  return (
    <div className="py-5 px-5 lg:w-[35%] w-80 h-[80%] shadow-2xl bg-white overflow-y-auto rounded-lg flex flex-col">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div className="flex justify-between items-center mb-4">
        <h1 className="pb-2 font-bold text-2xl">Session Summary</h1>
        <button onClick={closePopup} className="border-2 font-bold rounded-full px-2">
          X
        </button>
      </div>
      <div className="flex-grow">
        <div className="list-disc pl-5 space-y-2">
          <div>
            <strong className="text-primary font-bold">Subject: </strong>
            <span>{subjectName}</span>
          </div>
          <div>
            <strong className="text-primary font-bold">Years:</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {topics.map((t, i) => (
                <li key={i}>{t.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong className="text-primary font-bold">Topics:</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {exams.map((t, i) => (
                <li key={i}>{t.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong className="text-primary font-bold">Amount of Questions: </strong>
            <span>{questionCount}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <button onClick={handleStartSession} className="w-full border-none bg-primary text-white px-4 py-2 rounded-md">
          Confirm and Start Session
        </button>
        <button onClick={handleCreateAnother} className="w-full border-none bg-gray-300 text-black px-4 py-2 rounded-md">
          Confirm and Create Another
        </button>
      </div>
    </div>
  );
}

export default Popup;
