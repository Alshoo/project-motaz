'use client'
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {


    const { data: session } = useSession();

    if (session) {
      return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h1> Name {session.user.name}</h1>
          <p> EMAIL : {session.user.email}</p>
          <p> TOKEN : {session?.accessToken}</p>
          <button onClick={() => signOut()}>تسجيل الخروج</button>
        </div>
      );
    }




    return (
        <>

            <Header />

            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                        <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        >
                            <div className="max-w-lg md:max-w-none">

                                <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
                                    Welcome to the Medical College Learning Platform!
                                </h2>

                                <p className="mt-4 text-gray-500">
                                    We're here to help you strengthen your knowledge with interactive quizzes and study
                                    materials from your medical courses. Select the topics you're studying, solve related
                                    questions, and track your progress anytime, anywhere. Our platform offers a wide
                                    range of topics and questions to test your understanding. With regularly updated
                                    content and an easy-to-use interface, you can focus on what matters most to your
                                    studies. Whether you want to practice specific topics or review your performance,
                                    we're here to support you every step of the way. Start exploring now and improve
                                    your academic skills!
                                </p>

                                <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.5 }}
                                transition={{ duration: 0.5 }}
                                className="mt-4 text-white bg-primary font-bold rounded-lg text-sm px-[4rem] py-3 font-5 me-2 mb-2 outline-none"
                                >Get start</motion.button>

                            </div>
                        </motion.div>

                        <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                        className="flex justify-center">
                            <img
                                src="/img-hero.svg"
                                className="rounded"
                                alt=""
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">

                <div className="w-[80%] md:w-[35%] m-auto flex items-center font-bold">
                    <div className="flex-grow border-t border-black"></div>
                    <h1 className="text-sm md:text-2xl px-4 text-center">How to get started</h1>
                    <div className="flex-grow border-t border-black"></div>
                </div>


                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">

                        <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5 }}
                        
                        className="flex justify-center">

                            <img
                                src="/logo.svg"
                                className="rounded"
                                alt=""
                            />
                            
                        </motion.div>  

                        <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        >
                            <div className="max-w-lg md:max-w-none">
                                <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
                                Watch our introduction video to learn how to get the most out of your learning experience
                                </h2>

                                <p className="mt-4 text-gray-500">
                                In this introductory video, you'll learn how to use our educational platform effectively. We’ll guide you through the steps of selecting study topics, solving questions, and tracking your academic progress. This video will be a perfect guide for new students to make the most of the website."
                                </p>
                            </div>
                        </motion.div>


                    </div>
                </div>
            </section>

            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">

                <div className="w-[80%] md:w-[35%] m-auto flex items-center font-bold ">
                    <div className="flex-grow border-t border-black"></div>
                    <h1 className="text-sm md:text-2xl px-4 text-center">Who is MOTAZ MCQS</h1>
                    <div className="flex-grow border-t border-black"></div>
                </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8 mt-10">
                        <div>
                            <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5 }}
                            className="max-w-lg md:max-w-none">

                            
                        <div className="w-[35%] flex items-center font-bold">
                            <h1 className=" px-3 text-primary text-2xl font-semibold text-gray-900 sm:text-3xl">About</h1>
                            <div className="flex-grow border-t border-black"></div>
                        </div>

                                <p className="mt-4 text-gray-500">
                                It all began in 2020 when we started as "Qbank" — a simple idea
                                 with a big vision. Year after year, we embraced growth, innovation,
                                  and relentless improvement. Today, we've evolved into MOTAZ
                                   MCQs — a powerhouse of knowledge, precision, and excellence. 
                                   <br></br><br></br>

                                Our story is one of transformation, 
                                fueled by dedication and the drive to create
                                 something truly exceptional for students and professionals alike.
                                  This is more than just a name change; 
                                  it’s the culmination of years of hard work, passion,
                                   and a commitment to empowering your success.
                                   <br></br>
                                   <br></br>

                                Welcome to MOTAZ MCQs — where mastery begins.
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.5 }}
                        
                        className="flex justify-center">
                            <img
                                src="/logo.svg"
                                className="rounded"
                                alt=""
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />

        </>

    );
}
