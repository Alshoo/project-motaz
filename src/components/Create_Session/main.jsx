"use client"
import Axios from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Popup from "./popup";
import Image from "next/image";

export default function CreateSessionPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [amount, setAmount] = useState("");
  const [subject, setSubject] = useState(null);
  const [SelectedSubject, setSelectedSubject] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [exams, setExams] = useState([]);
  const [data, setdata] = useState({
    mood_id: 1,
    subject_id: null,
    chapters: [],
    exams: [],
    question_count: amount,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectRes = await Axios.get("subjects");
        setSubject(subjectRes.data.data.data);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (SelectedSubject) {
      const fetchData1 = async () => {
        try {
          const chapterRes = await Axios.get(`chapters/${SelectedSubject}`);
          const examRes = await Axios.get(`exams/${SelectedSubject}`);
          setChapters(chapterRes.data.data);
          setExams(examRes.data.data);
          setdata((prev) => ({
            ...prev,
            subject_id: SelectedSubject,
            exams: examRes.data.data.map((exam) => exam.id),
          }));
        } catch (err) {
          console.warn(err);
        }
      };
      fetchData1();
    }
  }, [SelectedSubject]);

  useEffect(() => {
    setdata((prev) => ({ ...prev, chapters: selectedTopics }));
  }, [selectedTopics]);

  const handleTopicSelection = (id) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((topic) => topic !== id) : [...prev, id]
    );
  };

  const handleSelectAllTopics = () => {
    if (selectedTopics.length === chapters.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(chapters.map((topic) => topic.id));
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="w-full flex justify-start lg:px-6 px-4">
          <button
            onClick={() => window.history.back()}
            className="bg-primary text-white px-3 py-2 mx-4 my-4 rounded-md"
          >
            Back
          </button>
        </div>
        <div className="flex justify-center flex-col w-full max-w-screen-lg items-center min-h-screen ">
          <div className="w-full max-w-3xl">
            <div className="bg-gray-100 shadow-md py-4 px-5 rounded-xl mb-7 w-full text-center ">
              <h2 className="text-xl font-bold text-primary text-center mb-4 ">
                Create a Learning Session
              </h2>
              <p className="text-gray-600 font-light text-sm mb-6">
                In the form below you can create a new study mode session to test yourself in any selected subject's topics and with the required amount of questions needed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full ">
              <div className="mb-4">
                <label className="block text-primary text-lg font-semibold mb-2">
                  Topics
                </label>
                <p className="text-gray-600 font-light text-sm mb-6">
                  Select one or more topics to include based on selected subject and within chosen years
                </p>
                <select
                  className="block w-full p-2 border-[1px] border-black bg-white text-black opacity-50 rounded-md mb-4"
                  onChange={(e) => {
                    setdata((prev) => ({
                      ...prev,
                      subject_id: e.target.value,
                      mood_id: 1,
                      exams: [],
                      question_count: null,
                    }));
                    setSelectedSubject(e.target.value);
                  }}
                >
                  <option>Choose a Subject</option>
                  {subject
                    ? subject.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name}
                        </option>
                      ))
                    : null}
                </select>
                <div className="max-h-[225px] overflow-y-auto shadow-sm bg-zinc-100 rounded-md p-4">
                {
                  chapters.length > 0 ? (
                    <div className="flex justify-end items-center">
                    <button
                      type="button"
                      onClick={handleSelectAllTopics}
                      className="mt-1 text-white bg-primary rounded-lg text-xs px-2 py-2 mb-3 transition duration-300 hover:bg-transparent hover:border-[1px] border-[1px] hover:border-primary hover:text-black"
                    >
                      Select All
                    </button>
                  </div>
                  ):(null)
                }
                  {chapters.length > 0 ? (
                    chapters.map((topic) => (
                      <>
                   

                  <div key={topic.id} className="flex items-center bg-white justify-between py-2 px-2 mb-2 text-black border-[.5px] border-black rounded-lg shadow-sm">
                        <label htmlFor={`topic-${topic.id}`} className="text-black opacity-70 text-xs font-bold">
                          {topic.name}
                        </label>
                        <input
                          type="checkbox"
                          id={`topic-${topic.id}`}
                          checked={selectedTopics.includes(topic.id)}
                          onChange={() => handleTopicSelection(topic.id)}
                          className="rounded-full"
                        />
                      </div>


                      </>
                    
                    ))
                  ) : (
                    <div className="flex flex-col gap-5 items-center justify-center">
                    <Image src="/sad 1.png" alt="ERR404" width={100} height={100}/>
                    <p>Couldn’t Find any Topics</p>
                    <p>Please Change Your filters and try again </p>
                    </div>
                  )}
                </div>
                {selectedTopics.length === 0 && (
                  <p className="text-red-500 text-xs font-bold my-3">
                    Selected Topics field must have at least 1 item
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-primary font-semibold mb-2">
                  Amount of Questions
                </label>
                <p className="text-black text-xs font-bold my-3">
                  Selected Topics field must have at least 1 item
                </p>
                <div className="flex w-full items-center justify-start">
                  <input
                    type="tel"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setdata((prev) => ({
                        ...prev,
                        question_count: value,
                      }));
                      setAmount(value);
                    }}
                    placeholder="Set the amount of questions to have in the session"
                    className="text-red block py-1 w-[85%] sm:w-[90%] px-2 border-[1px] me-3 rounded-full"
                  />
                  <h4 className="text-xs sm:text-xl opacity-60">/ 0</h4>
                </div>
              </div>
              <hr className="py-2 opacity-40"></hr>
              <button onClick={togglePopup} className="w-full bg-primary text-white p-3 rounded-md">
                Submit
              </button>
              {isPopupOpen && (
                <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[20px]">
                  <Popup
                    closePopup={togglePopup}
                    subjectName={subject?.find((sub) => sub.id == SelectedSubject)?.name || ""}
                    topics={chapters.filter((ch) => selectedTopics.includes(ch.id))}
                    questionCount={amount}
                    data={data}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
