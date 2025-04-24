"use client";
import React, { useEffect, useState, useCallback, Suspense } from "react";
import Axios from "@/lib/axiosInstance";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import "./mcq.css";

function McqPageContent() {
  const searchParams = useSearchParams();
  const sessionID = searchParams.get("id");
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
  const [detailsVisible, setDetailsVisible] = useState({});
  const [popupImg, setPopupImg] = useState(null);

  const constructUrl = useCallback(
    (page = 1) => `exam-Histories/${sessionID}?page=${page}`,
    [sessionID]
  );

  const fetchQuest = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const res = await Axios.get(constructUrl(page));
        const questions = res.data.data.data;
        if (!questions || questions.length === 0) {
          toast.success("No more questions available.");
          setQuestDet({
            id: null,
            total: 0,
            current_page: 0,
            questionText: "No questions available right now.",
            questionDescription: "",
            img: "",
            questionSummary: "",
            answers: []
          });
          return;
        }
        const q = questions[0].question;
        setQuestDet({
          id: questions[0].id,
          total: res.data.data.meta.total,
          current_page: res.data.data.meta.current_page,
          questionText: q.question_text,
          questionDescription: q.description,
          img: q.img,
          questionSummary: q.summary,
          answers: q.answers
        });
        setSelectedAnswer(questions[0].answer?.id || null);
        setDetailsVisible({});
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
      const page = Number(searchParams.get("page") || "1");
      fetchQuest(page);
    }
  }, [sessionID, fetchQuest, searchParams]);

  const handleSubmit = async () => {
    if (selectedAnswer == null) return;
    try {
      const res = await Axios.put(
        `exam-Histories/examHistorie/${questDet.id}`,
        { exam_answer_id: selectedAnswer }
      );
      toast.success(res.data.message, { duration: 3000, position: "top-center", style: { fontSize: "15px" } });
    } catch {
      toast.error("Error submitting answer");
    }
  };

  const handleNext = async () => {
    await handleSubmit();
    if (questDet.current_page >= questDet.total) {
      setFinished(true);
    } else {
      fetchQuest(questDet.current_page + 1);
    }
  };

  const handleBack = () => {
    if (questDet.current_page > 1) {
      fetchQuest(questDet.current_page - 1);
    }
  };

  const toggleDetails = (id) => setDetailsVisible(prev => ({ ...prev, [id]: !prev[id] }));

  if (!sessionID) return <div>Error: Session ID not provided.</div>;
  if (finished) return <ResultPage sessionID={sessionID} />;

  return (
    <div className="container w-full m-auto px-4 md:px-4 relative">
      {loading ? (
        <div className="spinner-container"><div className="spinner"></div></div>
      ) : questDet.total === 0 ? (
        <div><h1 className="my-10 text-primary font-bold">{questDet.questionText}</h1></div>
      ) : (
        <>
          <Link href="/sessction" className="w-[125px] bg-red-700 text-white px-4 py-2 rounded-lg mt-8 flex items-center gap-2">
            <img src="paaause 1.png" alt="pause" width={17} height={17} /> Suspend
          </Link>
          <h5 className="text-end text-md mb-4 md:mb-14 mt-3 md:mt-5 me-2">
            <strong className="text-gray-400">{questDet.current_page}</strong> / <strong>{questDet.total}</strong>
          </h5>
          <h2 className="mt-2 ml-2 md:ml-4 text-base font-light">{questDet.questionText}</h2>
          <div className="mt-5 md:mt-14 space-y-2 md:space-y-4 text-base shadow-lg rounded-2xl p-2 bg-white overflow-hidden">
            {questDet.answers.map((ans, i) => {
              const letter = String.fromCharCode(65 + i);
              return (
                <div key={i} onClick={() => setSelectedAnswer(ans.id)} className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${selectedAnswer === ans.id ? "bg-blue-100" : "hover:bg-gray-100"}`}>
                  <span className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full font-bold">{letter}</span>
                  <strong>{ans.answer_text}</strong>
                  <button onClick={e => { e.stopPropagation(); toggleDetails(ans.id); }} className="ml-auto focus:outline-none">
                    <svg className={`w-3 h-3 transition-transform ${detailsVisible[ans.id] ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mt-5 md:mt-14 prose">
            {questDet.answers.map(ans =>
              selectedAnswer === ans.id && detailsVisible[ans.id] && (
                <div key={ans.id} className="mt-2 p-4 shadow-inner bg-gray-100 rounded">
                  <div dangerouslySetInnerHTML={{ __html: ans.description || "<ul><li>No details</li></ul>" }}/>
                  {ans.img && <img src={ans.img} alt="" className="w-[15%] rounded mt-2 cursor-pointer" onClick={() => setPopupImg(ans.img)}/>}
                </div>
              )
            )}
          </div>
          <div className="my-8 flex justify-between items-center gap-4">
            <button onClick={handleBack} disabled={questDet.current_page <= 1} className="h-10 bg-primary text-white px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
              Back
            </button>
            <button onClick={handleNext} className="h-10 bg-primary text-white px-6 rounded-full">
              {questDet.current_page >= questDet.total ? "Finish" : "Next"}
            </button>
          </div>
        </>
      )}
      {popupImg && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative bg-white p-2 rounded shadow-2xl">
            <i onClick={() => setPopupImg(null)} className="fa-solid fa-x absolute top-0 right-0 m-2 cursor-pointer"></i>
            <img src={popupImg} alt="" className="w-[60vw] max-h-[80vh] object-contain"/>
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
        setResultDetails({ total: res.data.data.total, correct: res.data.data.correct });
      } catch {}
    })();
  }, [sessionID]);
  return (
    <div>
      <h1 className="my-10 text-stone-600 border-b-2 w-1/2 m-auto text-3xl flex justify-center pb-5">Well done! You’ve finished the exam.</h1>
      <div className="container text-center m-auto mb-24">
        <h2 className="border shadow-md py-3 my-11 w-80 rounded-3xl m-auto">
          <strong>Total</strong> : <span className="text-slate-600">{resultDetails.correct}/</span><span className="text-blue-500">{resultDetails.total}</span>
        </h2>
        <Link href="/sessction" className="bg-primary text-white px-5 py-1 rounded-md">Done</Link>
      </div>
    </div>
  );
}

export default function McqPage() {
  return <Suspense fallback={<div>Loading...</div>}><McqPageContent/></Suspense>;
}
