import React, { useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function Futsal({ bookingType, data }) {
  const navigate = useNavigate();
  const [selectImage, setSelectImage] = useState(0);
  return (
    <div className=" w-full  overflow-hidden grid md:grid-cols-[2fr_3fr_1fr] items-center md:items-start rounded-[10px] bg-[#333333] pb-[20px] md:pb-[0px] md:pr-[10px]">
      <div
        className="  h-[7rem] sm:h-[8rem] md:h-[100%]  bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${data?.futsalGroundList?.[selectImage]?.image})`,
        }}
      >
        {data?.futsalGroundList?.length > 1 && (
          <div className=" absolute right-5 bottom-5 flex gap-[1rem]">
            {data?.futsalGroundList?.map((data, index) => {
              return (
                <button
                  className={`py-[8px] px-[12px] border-[2px] border-primary outline-none ${
                    index === selectImage
                      ? `bg-primary`
                      : `bg-[rgba(0,0,0,0.4)]`
                  }`}
                  key={index}
                  onClick={() => setSelectImage(index)}
                >
                  {data?.groundType}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-[#333333]  p-[15px] lg:p-[20px] lg:pl-[32px] grid lg:gap-[5px]">
        <p className="text-[20px] font-semibold text-[#27D483]">
          {data.futsalName}
        </p>
        <div className="text-[14px] pt-[10px]">
          <div>
            {data.description}. Futsal is located at
            <span className="text-[#27D483] mx-[5px]">
              {data.futsalAddress}.
            </span>
            Futsal Openning Time:
            <span className="text-[#27D483] mx-[5px]">
              {data.futsalOpeningHours} -{data.futsalClosingHours}
            </span>
            .
            <div className="p-[0]">
              <span className="text-[#27D483] ">Available Ground:</span>
              <div className="flex">
                {data.futsalGroundList.map((groundData, index) => {
                  return (
                    <div key={index} className="flex gap-[5px]">
                      <span className="text-[#27D483] ">
                        {groundData.groundType}
                      </span>
                      Per Match:
                      <span className="text-[#27D483] mx-[5px]">
                        {groundData.pricePerHour},
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[12px] mt-[10px] ">
          <div className="flex gap-[12px]">
            <FaStar className="text-[#FFC107] md:text-[16px] " />
            <FaStar className="text-[#FFC107]md:text-[16px]" />
            <FaStar className="text-[#FFC107]  md:text-[16px]" />
            <FaStar className="text-[#FFC107] md:text-[16px]" />
            <FaRegStarHalfStroke className="text-[#FFC107] md:text-[16px]" />
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
          onClick={() => navigate(`/venue/${bookingType}/slot/${data.id}`)}
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
