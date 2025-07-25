import React from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function Futsal({ bookingType }) {
  const navigate = useNavigate();
  return (
    <div className=" w-full  overflow-hidden grid md:grid-cols-[2fr_3fr_1fr] items-center md:items-start rounded-[10px] bg-[#333333] pb-[20px] md:pb-[0px] md:pr-[10px]">
      <div className="  h-[7rem] sm:h-[8rem] md:h-[14rem] bg-[url(/images/futsalGround.png)] bg-cover bg-center"></div>
      <div className="bg-[#333333]  p-[15px] lg:p-[20px] lg:pl-[32px] grid gap-[12px]">
        <p className="text-[20px] font-semibold mb-[12px]">Description</p>
        <p className="text-[14px] p-[10px]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, nesciunt
          pariatur? Dicta sequi vitae exercitationem ut officiis expedita. Et,
          facere?
        </p>
        <div className="flex items-center gap-[12px] mt-[10px] ">
          <div className="flex gap-[12px]">
            <FaStar className="text-[#FFC107] text-[20px]" />
            <FaStar className="text-[#FFC107] text-[20px]" />
            <FaStar className="text-[#FFC107]  text-[20px]" />
            <FaStar className="text-[#FFC107] text-[20px]" />
            <FaRegStarHalfStroke className="text-[#FFC107] text-[20px]" />
          </div>
          <p className="text-[20px]   ">
            4.5
            <span className="text-[16px] py-[10px] ml-[8px] ">
              (128 reviews)
            </span>
          </p>
        </div>
      </div>
      <div className=" h-full  md:flex md:justify-center md:items-center">
        <button
          onClick={() => navigate(`/venue/${bookingType}/slot`)}
          className="bg-[#27D483] hover:bg-[#1c945c] ease-out duration-1000  font-medium ml-[20px] text-[#212121] rounded-[10px] flex items-center gap-[5px] py-[12px] px-[12px] h-fit w-fit text-[14px]"
        >
          <SlCalender />
          View Slot
        </button>
      </div>
    </div>
  );
}

export default Futsal;
