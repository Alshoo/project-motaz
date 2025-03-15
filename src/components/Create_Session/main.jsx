"use client"
import Axios from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import Popup from "./popup";
import Image from "next/image";

export default function CreateSessionPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
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

  // Fetch subjects on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectRes = await Axios.get("subscriptions");
        setSubject(subjectRes.data.data);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchSubjects();
  }, []);

  // When a subject is selected, fetch its chapters (years)
  useEffect(() => {
    if (SelectedSubject) {
      const fetchChapters = async () => {
        try {
          const chapterRes = await Axios.get(`chapters/${SelectedSubject}`);
          setChapters(chapterRes.data.data);
          setdata((prev) => ({ ...prev, subject_id: SelectedSubject }));
        } catch (err) {
          console.warn(err);
        }
      };
      fetchChapters();
    } else {
      setChapters([]);
    }
  }, [SelectedSubject]);

  // When selectedTopics changes (multiple years), fetch exams for all topics
  useEffect(() => {
    if (SelectedSubject && selectedTopics.length > 0) {
      const fetchExams = async () => {
        try {
          const examResponses = await Promise.all(
            selectedTopics.map((topicId) => Axios.get(`exams/${topicId}`))
          );
          const combinedExams = examResponses.flatMap((res) => res.data.data);
          setExams(combinedExams);
        } catch (err) {
          console.warn(err);
        }
      };
      fetchExams();
    } else {
      setExams([]);
    }
  }, [SelectedSubject, selectedTopics]);

  useEffect(() => {
    setdata((prev) => ({ ...prev, chapters: selectedTopics }));
  }, [selectedTopics]);

  useEffect(() => {
    setdata((prev) => ({ ...prev, exams: selectedExams }));
  }, [selectedExams]);

  // Handle year checkbox changes
  const handleTopicCheckboxChange = (e) => {
    const value = Number(e.target.value);
    if (e.target.checked) {
      setSelectedTopics((prev) => [...prev, value]);
    } else {
      setSelectedTopics((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleExamSelection = (id) => {
    if (selectedExams.includes(id)) {
      setSelectedExams(selectedExams.filter((examId) => examId !== id));
    } else {
      setSelectedExams([...selectedExams, id]);
    }
  };

  const handleSelectAllExams = () => {
    const availableExams = exams.filter((exam) => exam.questions_count > 0);
    if (selectedExams.length === availableExams.length) {
      setSelectedExams([]);
    } else {
      setSelectedExams(availableExams.map((exam) => exam.id));
    }
  };

  const maxAllowed = selectedExams.length > 0
    ? selectedExams.reduce((sum, examId) => {
        const examObj = exams.find((exam) => exam.id === examId);
        return sum + (examObj ? examObj.questions_count : 0);
      }, 0)
    : 0;

  return (
    <div>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="flex justify-center flex-col w-full max-w-screen-lg items-center min-h-screen">
          <div className="w-full max-w-3xl">
            <div className="w-full flex justify-start">
              <button
                onClick={() => window.history.back()}
                className="bg-primary text-white px-3 py-2 my-4 mx-2 rounded-md w-[110px]"
              >
                Back
              </button>
            </div>
            <div className="bg-gray-100 shadow-md py-4 px-5 rounded-xl mb-7 w-[90%] m-auto text-center">
              <h2 className="text-lg font-bold text-primary text-center mb-4">
                Create a Learning Session
              </h2>
              <p className="text-gray-600 font-light text-[12px] mb-6">
                In the form below you can create a new study mode session to test yourself in any selected subject's topics and with the required amount of questions needed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
              <div className="mb-4">
                <label className="block text-primary text-lg font-semibold mb-2">
                  Topics
                </label>
                <p className="text-gray-600 font-light text-sm mb-6">
                  Select one or more topics (years) to include based on the selected subject.
                </p>
                <select
                  className="block w-full p-2 border border-black bg-white text-black opacity-50 rounded-md mb-4"
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    setSelectedTopics([]);
                    setSelectedExams([]);
                    setAmount("");
                    setdata((prev) => ({
                      ...prev,
                      subject_id: e.target.value,
                      exams: [],
                      question_count: null,
                    }));
                  }}
                >
                  <option value="">Choose a Subject</option>
                  {subject &&
                    subject.map((sub) => (
                      <option key={sub.id} value={sub.subject_id.id}>
                        {sub.subject_id.name}
                      </option>
                    ))}
                </select>
                <div className="mb-4 border border-black p-2 rounded-md">
                  <p className="mb-2 text-black opacity-50">Choose a Year or years</p>
                  {chapters && chapters.length > 0 ? (
                    chapters.map((topic) => (
                      <div key={topic.id} className="flex items-center mb-1">
                        <input
                          type="checkbox"
                          id={`topic-${topic.id}`}
                          value={topic.id}
                          checked={selectedTopics.includes(topic.id)}
                          onChange={handleTopicCheckboxChange}
                          className="mr-2"
                        />
                        <label htmlFor={`topic-${topic.id}`} className="text-black opacity-50">
                          {topic.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-600">No topics available.</p>
                  )}
                </div>
                <div className="max-h-[225px] overflow-y-auto shadow-sm bg-zinc-100 rounded-md p-4">
                  {exams.length > 0 && (
                    <div className="flex justify-end items-center">
                      <button
                        type="button"
                        onClick={handleSelectAllExams}
                        className="mt-1 text-white bg-primary rounded-lg text-xs px-2 py-2 mb-3 transition duration-300 hover:bg-transparent hover:border border hover:border-primary hover:text-black"
                      >
                        Select All
                      </button>
                    </div>
                  )}
                  {exams.length > 0 ? (
                    exams.map((exam) => (
                      <div 
                        key={exam.id}
                        className={`flex items-center bg-white justify-between py-2 px-2 mb-2 text-black border border-black rounded-lg shadow-sm ${exam.questions_count < 1 ? "opacity-30" : "opacity-100"}`}
                      >
                        <label htmlFor={`exam-${exam.id}`} className="text-black opacity-70 text-xs font-bold">
                          {exam.name} ( {exam.questions_count} Out Of {exam.questions_count} )
                        </label>
                        <input
                          type="checkbox"
                          id={`exam-${exam.id}`}
                          checked={selectedExams.includes(exam.id)}
                          onChange={() => handleExamSelection(exam.id)}
                          className="rounded-full"
                          disabled={exam.questions_count < 1}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col gap-2 sm:gap-5 items-center justify-center">
                      <Image src="/sad 1.png" alt="ERR404" width={100} height={100} />
                      <p className="text-[12px] sm:text-[16px]">Couldn’t Find any Topics</p>
                      <p className="text-[12px] sm:text-[16px]">Please Change Your filters and try again</p>
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
                    max={maxAllowed}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      const numericValue = Number(value);
                      if (numericValue > maxAllowed) {
                        value = maxAllowed.toString();
                      }
                      setdata((prev) => ({
                        ...prev,
                        question_count: value,
                      }));
                      setAmount(value);
                    }}
                    placeholder="Set the amount of questions to have in the session"
                    className="placeholder-gray-400 placeholder-opacity-75 text-red block py-1 w-[85%] sm:w-[30%] px-2 border-gray-400 border rounded-full"
                  />
                  <h4 className="text-xs sm:text-xl opacity-60"> / {maxAllowed}</h4>
                </div>
              </div>
              <hr className="py-2 opacity-40" />
              <button
                onClick={togglePopup}
                className="w-full bg-primary text-white p-3 rounded-md"
                disabled={selectedExams.length === 0 || amount === ""}
              >
                Submit
              </button>
              {isPopupOpen && (
                <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[20px]">
                  <Popup
                    closePopup={togglePopup}
                    subjectName={
                      subject?.find((sub) => sub.subject_id.id == SelectedSubject)
                        ?.subject_id.name || ""
                    }
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
