import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import DonePage from "@/components/done/page";

const page = () => {
  return (
    <>
      <Header />

      <div className="flex flex-col gap-[42vh]">
        <DonePage />
        <Footer />
      </div>
    </>
  );
};

export default page;
