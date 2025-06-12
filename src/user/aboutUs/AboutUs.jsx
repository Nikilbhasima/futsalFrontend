import React from "react";
import { FaRegSmileBeam } from "react-icons/fa";
import { LuUserRoundCheck } from "react-icons/lu";
import Contact from "../contactUs/Contact";
import Footer from "../footer/Footer";
function AboutUs() {
  return (
    <div className="lg:max-w-[1327px] mx-auto sm:px-[10px]">
      <div className="grid sm:grid md:grid-cols-2 lg:px-[1rem] my-[80px] sm:px-[10px] lg:gap-[32px] sm:gap-[24px] gap-[12px]">
        <div
          style={{ backgroundImage: `url("./images/about_ground.png")` }}
          className="min-h-[15rem] bg-center bg-no-repeat bg-cover sm:rounded-[10px] min-h-[200px] lg:h-[400px]"
        ></div>
        <div className="flex flex-col justify-center px-[16px]">
          <h1 className="text-[20px] sm:text-[25px] md:text-[30px] text-[#27D483] font-semibold">
            Welcome To Lets Play
          </h1>
          <div className="flex flex-col gap-[20px]">
            <p className="text-[12px] sm:text-[16px] md-[16px] font-light lg:leading-[2rem] md:leading-[1.5rem] ">
              Lets Play Futsal was initially created to proivde all futsal's
              information like name, location, phone number along with exact
              location of map. We not only provide information of futsal but
              also real time slot of availability or booked of all futsal
              ground.
            </p>
            <p className="text-[12px] sm:text-[16px] md-[16px] font-light lg:leading-[2rem] md:leading-[1.5rem]">
              We are intended to reduce time consuming process while one is
              willing to get information about timing of futsal. We have planned
              to provide exact timing with status of all futsal ground in a
              single click on merofutsal.corn
            </p>
          </div>
        </div>
      </div>
      <div className="my-[80px]">
        <h1 className="text-center text-[40px] font-semibold text-[#27D483]">
          What we Provide?
        </h1>

        <div className="flex flex-col gap-[20px] px-[10px] md:grid grid-cols-2 gap-[40px] mt-[40px]">
          <div className=" rounded-[10px] p-[32px] bg-[#333333] flex flex-col items-center gap-[32px]">
            <LuUserRoundCheck className="text-[50px] text-[#27D483]" />
            <p className="text-[20px] ">All Fustal Information</p>
            <p className="text-[16px]  text-center">
              We provide information of all futsal ground with their details
              along with real time slots.
            </p>
          </div>
          <div className=" rounded-[10px] p-[32px] bg-[#333333] flex flex-col items-center gap-[32px]">
            <FaRegSmileBeam className="text-[50px] text-[#27D483]" />
            <p className="text-[20px] ">100% Satisfaction</p>
            <p className="text-[16px] text-center">
              Your satisfaction is out priority! Experience 100% satisfaction
              with our real time slot with available timing information because
              time waits no one.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[80px] grid gap-[32px] place-items-center">
        <h1 className="text-[40px] font-semibold text-[#27D483]">
          Our Performance
        </h1>
        <p className="text-[20px] ">Booking Solution and Time Efficient</p>
        <p className="text-[16px] font-light text-center leading-[2rem] ">
          Lets Play futsal streamlines processes, transforming intricate
          scheduling into a seamless experience. This innovative tool optimizes
          allocation, reducing wait times and enhancing customer satisfaction.
          By automating tasks and synchronizing calendars, it liberates valuable
          hours for individual. The result? Increase productivity, reduced
          stress, and an elevated customer experience. Booking solution are the
          key to unlocking its true potential, creating future where every
          moment counts.
        </p>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default AboutUs;
