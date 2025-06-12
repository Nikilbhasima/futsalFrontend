import React from "react";
import "./hero.css";
import PrimaryButton from "../buttonComponent/PrimaryButton";
function Hero() {
  return (
    <div className="hero flex h-[640px]  max-h-[640px] bg-[#dee3e1]  justify-center ">
      <div className="hero-contianer flex  justify-between max-w-[1320px] w-[1320px] ">
        <div className="basis-1/2 hero-container grow flex flex-col items-center justify-center">
          <div className="hero-content   flex flex-col gap-[2rem] px-[5rem]">
            <h1 className="text-[black] text-[32px] font-[900]">
              DISCOVER VENUES
            </h1>
            <h4 className="text-[black] text-[30px] font-semibold">
              Explore different venues at different areas with
            </h4>
            <h4 className="text-[black] text-[30px] font-semibold">
              a seamless experience
            </h4>
            <PrimaryButton buttonName="GET STARTED" />
          </div>
        </div>

        <div className=" basis-1/2 hero-img  grow bg-center bg-no-repeat bg-contain bg-[url(/images/heroimg.png)]"></div>
      </div>
    </div>
  );
}

export default Hero;
