"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import Axios from "@/lib/axiosInstance";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import striptags from "striptags";
import Link from "next/link";

function McqPageContent() {
  const searchParams = useSearchParams();
  const sessionID = searchParams.get("id");
  const [mode, setMode] = useState("question");
  const [loading, setLoading] = useState(false);
  const [questDet, setQuestDet] = useState({
    id: null,
    total: null,
    current_page: 1,
    questionText: "",
    questionDescription: "",
    img: "",
    questionSummary: "",
    answers: [],
  });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showOverallExplanation, setShowOverallExplanation] = useState(false);
  const constructUrl = useCallback(
    (page = 1) => `exam-Histories/${sessionID}?page=${page}`,
    [sessionID]
  );
  const fetchQuest = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const res = await Axios.get(constructUrl(page));
        const questions = res.data.data.data;
        if (!questions || questions.length === 0) {
          toast.success("No more questions available.");
          setQuestDet({
            id: null,
            total: 0,
            current_page: 0,
            questionText: "No questions available, right now.",
            questionDescription: "",
            img: "",
            questionSummary: "",
            answers: [],
          });
          return;
        }
        const questionData = questions[0].question;
        setQuestDet({
          id: questions[0].id,
          total: res.data.data.meta.total,
          current_page: res.data.data.meta.current_page,
          questionText: questionData.question_text,
          questionDescription: questionData.description,
          img: questionData.img,
          questionSummary: questionData.summary,
          answers: questionData.answers,
        });
        setSelectedAnswer(null);
        setShowOverallExplanation(false);
        setMode("question");
      } catch (err) {
        console.error(err);
        toast.error("Error fetching question");
      } finally {
        setLoading(false);
      }
    },
    [constructUrl]
  );
  useEffect(() => {
    if (sessionID) {
      const pageParam = searchParams.get("page") || "1";
      fetchQuest(Number(pageParam));
    }
  }, [sessionID, fetchQuest, searchParams]);
  const handleSubmition = async () => {
    try {
      const res = await Axios.put(
        `exam-Histories/examHistorie/${questDet.id}`,
        { exam_answer_id: selectedAnswer }
      );
      toast.success(res.data.message, {
        duration: 4000,
        position: "top-center",
        style: { fontSize: "15px" },
      });
    } catch (e) {
      console.error(e);
      toast.error("Error submitting answer");
    }
  };
  useEffect(() => {
    if (mode === "question" && selectedAnswer !== null) {
      (async () => {
        await handleSubmition();
        setMode("review");
      })();
    }
  }, [selectedAnswer, mode]);
  const handleNextInQuestionMode = async () => {
    if (!selectedAnswer) return;
    await handleSubmition();
    setMode("review");
  };
  const handleNextQuestion = async () => {
    if (questDet.current_page >= questDet.total) {
      setQuestDet({
        id: null,
        total: 0,
        current_page: 0,
        questionText: "Exam Finished",
        questionDescription: "",
        img: "",
        questionSummary: "",
        answers: [],
      });
      window.location.replace(`/done?sessionID=${sessionID}`);
    } else {
      await fetchQuest(questDet.current_page + 1);
    }
  };
  if (!sessionID) {
    return <div>Error: Session ID not provided.</div>;
  }
  return (
    <div className="container text- w-full m-auto px-4">
     
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : questDet.total === 0 ? (
        <div>
          <h1 className="my-10 text-primary font-bold">{questDet.questionText}</h1>
        </div>
      ) : (
        <>
         <Link
          href="/"
          className="w-[125px] bg-red-700 text-white px-4 py-2 rounded-lg mt-8 flex items-center gap-2">
            <img src="paaause 1.png" alt="ERR404" width={17} height={17}/>
          Suspend
          </Link>
          <h5 className="text-end mb-4 md:mb-14 mt-3 md:mt-5 me-2 md:me-5">
            {questDet.current_page}/{questDet.total}
          </h5>
          <h2 className="mt-2 ml-4 md:ml-14 text-lg md:text-2xl">
            {questDet.questionText} ?
          </h2>
          {mode === "question" && (
            <div className="mt-5 ml-4 md:mt-14 md:ml-14 text-sm md:text-base">
              {questDet.answers.map((ans, i) => (
                <div key={i} className="flex py-2 md:py-3 items-center">
                  <input
                    type="radio"
                    id={`answer-${i + 1}`}
                    name="answer"
                    value={ans.answer}
                    checked={selectedAnswer === ans.id}
                    onChange={() => setSelectedAnswer(ans.id)}
                    className="cursor-pointer"
                  />
                  <label htmlFor={`answer-${i + 1}`} className="cursor-pointer ml-2">
                    <strong>{ans.answer_text}</strong>
                  </label>
                </div>
              ))}
            </div>
          )}
          {mode === "review" && (
            <div className="mt-5 ml-4 md:mt-14 md:ml-14 space-y-2 md:space-y-4 text-sm md:text-base">
              {questDet.answers.map((ans, i) => {
                const answerColor = ans.is_correct ? "bg-greenOpacity" : "bg-red-200";
                const cleanText = (html) => {
                  return striptags(html)
                    .replace(/&nbsp;/g, " ")
                    .replace(/\s+/g, " ")
                    .trim();
                };
                const textOnly = cleanText(ans.description);
                return (
                  <div key={i} className={`relative p-2 md:p-4 rounded-md ${answerColor}`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`answer-${i + 1}`}
                        name="answer"
                        value={ans.answer}
                        checked={String(ans.id) === String(selectedAnswer)}
                        readOnly
                        className="cursor-not-allowed"
                      />
                      <label htmlFor={`answer-${i + 1}`} className="cursor-not-allowed ml-2">
                        <strong>{ans.answer_text}</strong>
                      </label>
                    </div>
                    <details className="mt-2">
                      <summary className="absolute right-1 top-5 cursor-pointer text-black"></summary>
                      <div className="mt-2 md:p-4 rounded-lg shadow-inner text-left p-2 text-sm md:text-base">
                        {textOnly || "No details for this answer"}
                        {ans.img ? (
                          <img src={ans.img} alt="ERR404" className="w-[15%] rounded-lg" />
                        ) : (
                          <div className="bg-slate-100 w-[10%] h-[60px] rounded-lg"></div>
                        )}
                      </div>
                    </details>
                  </div>
                );
              })}
            </div>
          )}
          <div className="my-8 flex flex-col md:flex-row justify-evenly items-center gap-2 md:gap-4">
            {mode === "question" && questDet.current_page > 1 ? (
              <button
                onClick={() => fetchQuest(questDet.current_page - 1)}
                className="h-10 md:h-[50px] bg-primary text-white px-4 md:px-7 py-2 md:py-4 rounded-2xl flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                <span>
                  <Image src="left 9.svg" alt="back" width={16} height={16} />
                </span>
                Back
              </button>
            ) : (
              <button
                disabled={questDet.current_page === 1}
                className="h-10 md:h-[50px] bg-primary text-white px-4 md:px-7 py-2 md:py-4 rounded-2xl flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                <span>
                  <Image src="left 9.svg" alt="back" width={16} height={16} />
                </span>
                Back
              </button>
            )}
            <div className="focus:ring-2 md:focus:ring-4 focus:outline-none from-neutral-950 rounded-full text-base md:text-lg px-8 md:px-28 py-1 text-center inline-flex items-center relative border shadow-md text-black">
              <button
                onClick={() => setShowOverallExplanation((prev) => !prev)}
                className="flex cursor-pointer items-center justify-between gap-2 bg-white p-2 md:p-4 text-gray-900 transition"
              >
                <p className="flex items-center text-stone-500 w-fit py-1 md:py-3 rounded-full">
                  {showOverallExplanation ? "Hide Overall Explanation" : "Show Overall Explanation"}
                  {!showOverallExplanation ? (
                    <svg className="w-2.5 h-2.5 ml-2 md:ml-3 transition-transform" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  ) : (
                    <svg className="w-2.5 h-2.5 ml-2 md:ml-3 transition-transform rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  )}
                </p>
              </button>
            </div>
            <button
              onClick={mode === "question" ? handleNextInQuestionMode : handleNextQuestion}
              disabled={mode === "question" && selectedAnswer === null}
              className="h-10 md:h-[50px] bg-primary text-white px-4 md:px-7 py-2 md:py-4 rounded-2xl flex justify-center items-center text-sm md:text-base"
            >
              {mode === "question" ? "Next" : questDet.current_page >= questDet.total ? "Finish" : "Next Question"}
              <span>
                <Image src="left 10.svg" alt="next" width={16} height={16} />
              </span>
            </button>
          </div>
        </>
      )}
      {showOverallExplanation && (
        <div className="mt-2 border border-gray-200 bg-white p-2 md:p-4 rounded-lg shadow-inner text-sm md:text-base">
          {questDet.questionDescription.replace(/<\/?[^>]+(>|$)/g, "").replace(/&nbsp;/g, " ")}
          {questDet.img ? (
            <img src={questDet.img} alt="ERR404" className="w-[20%] rounded-lg" />
          ) : (
            <div className="bg-slate-300 w-[20%] h-[100px] rounded-lg"></div>
          )}
        </div>
      )}
    </div>
  );
}

export default function McqPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <McqPageContent />
    </Suspense>
  );
}
