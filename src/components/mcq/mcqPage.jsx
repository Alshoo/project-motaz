"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import Axios from "@/lib/axiosInstance";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import './mcq.css'


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
  const [detailsVisible, setDetailsVisible] = useState({});
  const [popupImg, setPopupImg] = useState(null);
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
        const existingAnswer = questions[0].answer;
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
        setDetailsVisible({});
        setShowOverallExplanation(false);
        if (existingAnswer) {
          setSelectedAnswer(existingAnswer.id);
          setMode("review");
        } else {
          setSelectedAnswer(null);
          setMode("question");
        }
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
  const toggleDetails = (id) => {
    setDetailsVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  if (!sessionID) {
    return <div>Error: Session ID not provided.</div>;
  }
  return (
    <div className="container w-full m-auto px-4 md:px-4 relative">
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
          {mode === "question" && (
            <Link
              href="/"
              className="w-[125px] bg-red-700 text-white px-4 py-2 rounded-lg mt-8 flex items-center gap-2"
            >
              <img src="paaause 1.png" alt="ERR404" width={17} height={17} />
              Suspend
            </Link>
          )}
          <h5 className="text-end text-xl mb-4 md:mb-14 mt-3 md:mt-5 me-2 md:me-5">
           <strong className="text-gray-400 font-medium">{questDet.current_page}</strong>/<strong className="font-medium">{questDet.total}</strong>
          </h5>
          <h2 className="mt-2 ml-4 md:ml-4 text-lg md:text-2xl font-light">
            {questDet.questionText} ?
          </h2>
          {mode === "question" && (
            <div className="mt-5 ml-4 md:mt-14 md:ml-4 text-sm md:text-base shadow-lg rounded-xl p-4 bg-white">
              {questDet.answers.map((ans, i) => {
                const letter = String.fromCharCode(65 + i);
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedAnswer(ans.id)}
                    className={`flex items-center gap-2 py-2 md:py-3 cursor-pointer p-3 rounded-md ${
                      selectedAnswer === ans.id ? "bg-blue-100" : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full font-bold">
                      {letter}
                    </span>
                    <strong className="font-medium">{ans.answer_text}</strong>
                  </div>
                );
              })}
            </div>
          )}
          {mode === "review" && (
            <div className="mt-5 md:mt-14 space-y-2 md:space-y-4 text-sm md:text-base shadow-lg rounded-2xl bg-white">
              {questDet.answers.map((ans, i) => {
                const answerColor = ans.is_correct ? "bg-greenOpacity border-green border-l-4" : "bg-red-300 border-red-600 border-l-4";
                const answerColorbox = ans.is_correct ? "bg-greenOpacity" : "bg-red-200 ";
                const answerbgColorbox = ans.is_correct ? "bg-greenWhite" : "bg-red-50 ";
                const letter = String.fromCharCode(65 + i);
                return (
                  <div
                    key={i}
                    className={`relative  ${
                      selectedAnswer === ans.id ? answerColor : ""
                    }`}
                  >
                    <div className="flex items-center p-2 md:p-4">
                      <span
                        className={`w-9 h-9 flex items-center justify-center rounded-full font-bold ${
                          selectedAnswer === ans.id
                            ? ans.is_correct
                              ? "bg-green text-black"
                              : "bg-red-200 text-black"
                            : answerColorbox
                        }`}
                      >
                        {letter}
                      </span>
                      <label className="cursor-not-allowed ml-2">
                        <strong>{ans.answer_text}</strong>
                      </label>
                      <button
                        onClick={() => toggleDetails(ans.id)}
                        className="ml-auto focus:outline-none"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            detailsVisible[ans.id] ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                    </div>
                    {detailsVisible[ans.id] && (
                      <div 
                      className={`mt-2 p-4  shadow-inner text-left text-sm md:text-base prose 
                       ${
                        selectedAnswer === ans.id ? answerbgColorbox : "bg-gray-100"
                      }   
                       `} >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: ans.description || "<ul><li>No details for this answer</li></ul>",
                          }}
                          className={`text-`}
                        />
                        {ans.img && (
                          <img
                            src={ans.img}
                            alt="ERR404"
                            className="w-[15%] rounded-lg mt-2 cursor-pointer"
                            onClick={() => setPopupImg(ans.img)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <div className="my-8 flex md:flex-row justify-evenly items-center gap-2 md:gap-4">
            {questDet.current_page > 1 ? (
              <button
                onClick={() => fetchQuest(questDet.current_page - 1)}
                className="h-8 md:h-[50px] bg-primary text-white px-2 md:px-7 py-0 md:py-4 rounded-xl flex justify-center items-center text-xs md:text-base"
              >
                {/* <span>
                  <Image src="left 9.svg" alt="back" width={13} height={13} />
                </span> */}
                Back
              </button>
            ) : (
              <button
                disabled
                className="h-8 md:h-[50px] bg-primary text-white px-2 md:px-7 py-0 md:py-4 rounded-xl flex justify-center items-center disabled:opacity-50 text-xs md:text-base"
              >
                {/* <span>
                  <Image src="left 9.svg" alt="back" width={13} height={13} />
                </span> */}
                Back
              </button>
            )}
          
            <div 
            className=" rounded-full md:text-lg px-2 md:px-10 py-3 text-center relative border shadow-md">
              <button
                onClick={() => setShowOverallExplanation((prev) => !prev)}
                className="flex cursor-pointer items-center justify-between gap-2 bg-white p-1 text-gray-900 transition"
              >
                <p className="flex items-center text-xs md:text-lg text-stone-500 w-fit py-1 md:py-3 rounded-full">
                  {showOverallExplanation
                    ? "Hide Overall Explanation"
                    : "Show Overall Explanation"}
                  <svg
                    className={`w-2.5 h-2.5 ml-1 md:ml-3 transition-transform ${
                      showOverallExplanation ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </p>
              </button>
            </div>
            <button
              onClick={
                mode === "question" ? handleNextInQuestionMode : handleNextQuestion
              }
              disabled={mode === "question" && selectedAnswer === null}
              className="h-8 md:h-[50px] bg-primary text-white px-2 md:px-7 py-0 md:py-4 rounded-xl flex justify-center items-center text-xs md:text-base"
            >
              {mode === "question"
                ? "Next"
                : questDet.current_page >= questDet.total
                ? "Finish"
                : "Next"}
              {/* <span>
                <Image src="left 10.svg" alt="next" width={13} height={13} />
              </span> */}
            </button>
          </div>
        </>
      )}
      {showOverallExplanation && (
        <div className="mt-2 border border-gray-200 bg-white p-4 rounded-lg shadow-inner text-sm md:text-base prose">
          <div dangerouslySetInnerHTML={{ __html: questDet.questionDescription }} />
          {questDet.img && (
            <img
              src={questDet.img}
              alt="ERR404"
              className="w-[20%] rounded-lg mt-2 cursor-pointer"
              onClick={() => setPopupImg(questDet.img)}
            />
          )}
        </div>
      )}
      {popupImg && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative bg-white p-2 rounded shadow-2xl">
            <i 
            onClick={() => setPopupImg(null)}
          className="   fa-solid fa-x     absolute top-0 right-0 mx-3 my-2 cursor-pointer border border-gray-500 font-bold rounded-full px-[8px] py-[6px] hover:bg-gray-200"
          ></i>
            <img
              src={popupImg}
              alt="Popup"
              className="w-[60vw] max-h-[80vh] object-contain"
            />
          </div>
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
