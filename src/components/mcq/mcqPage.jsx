"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import Axios from "@/lib/axiosInstance";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import "./mcq.css";

function McqPageContent() {
  const searchParams = useSearchParams();
  const sessionID = searchParams.get("id");
  const [mode, setMode] = useState("question");
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [questDet, setQuestDet] = useState({
    id: null,
    total: null,
    current_page: 1,
    questionText: "",
    questionDescription: "",
    img: "",
    questionSummary: "",
    answers: []
  });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showOverallExplanation, setShowOverallExplanation] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState({});
  const [popupImg, setPopupImg] = useState(null);

  const [resultDetails, setResultDetails] = useState({ total: null, answer: null });
  useEffect(() => {
    (async () => {
      try {
        const res = await Axios.get(`exam-Histories/result/${sessionID}`);
        setResultDetails({
          total: res.data.data.total,
          answer: res.data.data.answer
        });
      } catch (e) {
        console.error("Error fetching result:", e);
      }
    })();
  }, [sessionID]);

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
            answers: []
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
          answers: questionData.answers
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
        style: { fontSize: "15px" }
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
      setFinished(true);
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
  if (finished) {
    return <ResultPage sessionID={sessionID} />;
  }
  return (
    <div className="container w-full m-auto px-4 md:px-4 relative">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : questDet.total === 0 ? (
        <div>
          <h1 className="my-10 text-primary font-bold">
            {questDet.questionText}
          </h1>
        </div>
      ) : (
        <>
          <Link
            href="/sessction"
            className="w-[125px] bg-red-700 text-white px-4 py-2 rounded-lg mt-8 flex items-center gap-2"
          >
            <img src="paaause 1.png" alt="ERR404" width={17} height={17} />
            Suspend
          </Link>
          <h5 className="text-end text-md mb-4 md:mb-14 mt-3 md:mt-5 me-2 md:me-5">
            <strong className="text-gray-400 font-medium">
              {questDet.current_page}{" "}
            </strong>{" "}
            / <strong className="font-medium"> {questDet.total}</strong>
          </h5>
          <h2 className="mt-2 ml-2 md:ml-4 text-base text-md font-light">
            {questDet.questionText}
          </h2>
          {mode === "question" && (
            <div className="mt-5 md:mt-14 space-y-2 md:space-y-4 text-xs sm:text-sm md:text-base shadow-lg rounded-2xl p-2 bg-white overflow-hidden">
              {questDet.answers.map((ans, i) => {
                const letter = String.fromCharCode(65 + i);
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedAnswer(ans.id)}
                    className={`flex items-center gap-2 py-2 md:py-3 cursor-pointer p-1 md:p-2 rounded-md ${
                      selectedAnswer === ans.id
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full font-bold">
                      {letter}
                    </span>
                    <strong className="font-normal text-sm">
                      {ans.answer_text}
                    </strong>
                  </div>
                );
              })}
            </div>
          )}
          {mode === "review" && (
            <div className="mt-5 md:mt-14 text-xs sm:text-sm md:text-base shadow-lg rounded-2xl bg-white overflow-hidden">
              {questDet.answers.map((ans, i) => {
                const answerColor = ans.is_correct
                  ? "bg-greenOpacity border-green border-l-4"
                  : "bg-red-100 border-red-600 border-l-4";
                const answerColorbox = ans.is_correct
                  ? "bg-greenOpacity"
                  : "bg-red-200 ";
                const answerbgColorbox = ans.is_correct
                  ? "bg-greenWhite"
                  : "bg-red-50 ";
                const letter = String.fromCharCode(65 + i);
                return (
                  <div
                    key={i}
                    className={`relative ${
                      selectedAnswer === ans.id ? answerColor : ""
                    }`}
                  >
                    <div
                      className={`flex items-center p-2 md:p-4 ${
                        selectedAnswer === ans.id
                          ? ""
                          : " border-[#00000000] border-l-4 "
                      }`}
                    >
                      <span
                        className={`w-8 h-8 p-[15px] flex items-center justify-center rounded-full font-bold ${
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
                        <strong className="font-normal text-sm">
                          {ans.answer_text}
                        </strong>
                      </label>
                      <button
                        onClick={() => toggleDetails(ans.id)}
                        className="ml-auto focus:outline-none"
                      >
                        <svg
                          className={`w-3 h-3 transition-transform opacity-70 ${
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
                        className={`mt-2 p-4 shadow-inner text-left text-sm md:text-base prose ${
                          selectedAnswer === ans.id
                            ? answerbgColorbox
                            : "bg-gray-100"
                        }`}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              ans.description ||
                              "<ul><li>No details for this answer</li></ul>"
                          }}
                          className=""
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
                className="h-8 md:h-[50px] bg-primary text-white px-2 md:px-7 py-0 md:py-4 rounded-full flex justify-center items-center text-xs md:text-base"
              >
                Back
              </button>
            ) : (
              <button
                disabled
                className="h-8 md:h-[50px] bg-primary text-white px-2 md:px-7 py-0 md:py-4 rounded-full flex justify-center items-center disabled:opacity-50 text-xs md:text-base"
              >
                Back
              </button>
            )}


            <div className="pt-0 pb-0 rounded-full md:text-lg px-2 md:px-10 py-3 text-center relative border shadow-md overflow-hidden">
              <button
                onClick={() =>
                  setShowOverallExplanation((prev) => !prev)
                }
                disabled={mode === "question"}
                className={`flex items-center justify-between gap-2 bg-white p-1 text-gray-900 transition ${
                  mode === "question"
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
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


      {
            resultDetails.total > resultDetails.answer && questDet.current_page >= questDet.total && !resultDetails.total === resultDetails.answer ? (
              <button
              onClick={
              ()=>{
                if(questDet.current_page < questDet.total){
                  if (mode === "question") {
                    // handleNextInQuestionMode();
                    fetchQuest(questDet.current_page + 1);
                  }else if(mode = "review" ){
                    handleNextQuestion();
                  }
                }else{
                  handleNextQuestion();
              }

              }
              }
              disabled
              className="h-8 md:h-[50px] bg-primary text-white px-2 md:px-7 py-0 md:py-4 rounded-full flex justify-center items-center disabled:opacity-50 text-xs md:text-base"
            >
              {questDet.current_page >= questDet.total
                ?"Finish "
                :"Next"}
            </button>
            ) : (
              <button
              onClick={
              ()=>{
                if(questDet.current_page < questDet.total){
                  if (mode === "question") {
                    // handleNextInQuestionMode();
                    fetchQuest(questDet.current_page + 1);
                  }else if(mode = "review" ){
                    handleNextQuestion();
                  }
                }else{
                  handleNextQuestion();
              }

              }
              }
              className="h-8 md:h-[50px] bg-primary text-white px-2 md:px-7 py-0 md:py-4 rounded-full flex justify-center items-center text-xs md:text-base"
            >
              {questDet.current_page >= questDet.total
                ?"Finish"
                :"Next"}
            </button>
            )
      }
          </div>
        </>
      )}
      {showOverallExplanation && (
        <div className="mt-2 border border-gray-200 bg-white p-4 rounded-xl shadow-inner text-sm md:text-base prose">
          <div
            dangerouslySetInnerHTML={{
              __html: questDet.questionDescription
            }}
          />
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
              className="fa-solid fa-x absolute top-0 right-0 mx-3 my-2 cursor-pointer border border-gray-500 font-bold rounded-full px-[8px] py-[6px] hover:bg-gray-200"
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

function ResultPage({ sessionID }) {
  const [resultDetails, setResultDetails] = useState({ total: null, correct: null });
  useEffect(() => {
    (async () => {
      try {
        const res = await Axios.get(`exam-Histories/result/${sessionID}`);
        setResultDetails({
          total: res.data.data.total,
          correct: res.data.data.correct
        });
      } catch (e) {
        console.error("Error fetching result:", e);
      }
    })();
  }, [sessionID]);
  return (
    <div>
    <h1 className='my-10 text-stone-600 border-stone-600 border-b-2 w-[50%] m-auto flex justify-center pb-5 text-3xl'>
      Well done! You’ve finished the exam.
    </h1>
    <div className="container text-center m-auto mb-24">
      <h2 className='border shadow-md text-black py-3 know my-11 w-80 rounded-3xl m-auto'>
        <strong>Total</strong> : 
        <span className='text-slate-600'>{resultDetails.correct}/</span>
        <span className='text-blue-500'>{resultDetails.total}</span>
      </h2>
      <Link href='/sessction' className='bg-primary text-white px-5 py-1 rounded-md'>
        Done
      </Link>
    </div>
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
