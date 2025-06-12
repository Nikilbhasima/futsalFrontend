import React from "react";
import Hero from "../heroSection/Hero";
import Service from "../serviceComponent/Service";
import Event from "../event/Event";
import Faq from "../faq/Faq";
import Contact from "../contactUs/Contact";
import Footer from "../footer/Footer";

function Home() {
  return (
    <>
      <Hero />
      <Service />
      <div className="linear max-w-[1327px] m-auto border-[0.1px] border-[#27D483]"></div>
      <Event />
      <div className="linear max-w-[1327px] m-auto border-[0.1px] border-[#27D483]"></div>
      <Faq />
      <div className="linear max-w-[1327px] m-auto border-[0.1px] border-[#27D483]"></div>
      <Contact />
      <div className="linear max-w-[1327px] m-auto border-[0.1px] border-[#27D483]"></div>
      <Footer />
    </>
  );
}

export default Home;
