import React from "react";
import FaqContent from "./FaqContent";

function Faq() {
  return (
    <div className="my-[80px]">
      <h1 className="text-center text-[40px] text-[#27D483] font-semibold">
        FAQ
      </h1>
      <div className="grid mt-[40px] max-w-[1320px] m-auto lg:grid-cols-2  sm:grid-cols-1  lg:gap-[60px] md:gap-[40px] px-[1rem]">
        <div className="bg-[pink] bg-[url(/images/futsalPlayer.png)] md:h-[400px] lg:h-[500px] bg-cover bg-top rounded-[10px] lg:grid md:hidden sm:hidden"></div>
        <div className="relative flex flex-col gap-[12px] sm:w-full">
          <FaqContent
            answer="Click on browse venues in the services section, where you can find it in the card. Once you have clicked on the button, you can start browsing the various different venues available."
            question="How to Browse for different venue?"
          />
          <FaqContent
            answer="Once you have selected the venue that you want to play in, then you can click the venue to go into their page and see all the available timings."
            question="How to create a booking?"
          />
          <FaqContent
            answer="All different venues have their own cancellation policies, but to cancel your booking, you have to at least pay a penalty."
            question="What is the cancellation policy?"
          />
          <FaqContent
            answer="Go to mybookings section and then you can cancel the booking."
            question="What to cancel a booking?"
          />
          <FaqContent
            answer="Go to mybookings section and then you can cancel the booking."
            question="What to cancel a booking?"
          />
        </div>
      </div>
    </div>
  );
}

export default Faq;
