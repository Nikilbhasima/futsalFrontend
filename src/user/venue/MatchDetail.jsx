import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa6";
import { GiSoccerKick } from "react-icons/gi";
import { IoIosInformationCircleOutline } from "react-icons/io";
function MatchDetail() {
  return (
    <div className=" mt-[32px] bg-[#333333] p-[1rem] rounded-[10px] flex flex-col gap-4">
      {/* this is user information */}
      <div className="flex items-center ">
        {false ? (
          <IoPersonCircleOutline className="text-[5rem]" />
        ) : (
          <div className="bg-[url(/images/messi.png)] w-[6rem] h-[6rem] bg-cover bg-no-repeat rounded-[50%]"></div>
        )}
        <div className="ml-[12px] ">
          <p className="font-normal text-[20px]">Nikil Bhasima</p>
          <p className="flex justify-start justify-center items-center gap-2 font-light">
            <MdOutlineLocalPhone className="text-[20px] text-[#27D483] " />
            9808029931
          </p>
        </div>
        <div className="ml-auto flex flex-row gap-2">
          <button className="bg-[#27D483] hover:bg-[#1c945c] ease-out duration-1000  font-medium ml-[20px] text-[#212121] rounded-[10px] flex items-center gap-[5px] py-[12px] px-[12px] h-fit w-fit text-[14px] hover:-translate-y-[4px] ease-out duration-1000">
            <GiSoccerKick className="font-bold text-[20px]" />
            Join Match
          </button>
        </div>
      </div>
      {/* match detail */}
      <div className="flex flex-col gap-1 px-[15px]">
        <div className="py-[1rem] flex flex-col gap-3">
          <div className="grid grid-cols-[1fr_1fr]">
            <div class="flex items-center space-x-2  font-medium ">
              <span>
                <MdOutlineDateRange className="text-[#27D483] text-[22px]" />
              </span>
              <div className="flex flex-col">
                <span>2025-07-15 </span>
                <span className="font-light opacity-60 text-[14px]">
                  6:00 PM
                </span>
              </div>
            </div>
            <div class="flex items-center space-x-2 font-medium ">
              <span>
                <IoLocation className="text-[#27D483] text-[22px]" />
              </span>
              <div className="flex flex-col">
                <span>Kathmandu Futsal </span>
                <span className="font-light opacity-60 text-[14px]">Venue</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_1fr]">
            <div className="flex items-center space-x-2">
              <span>
                <FaUsers className="text-[#27D483] text-[22px]" />
              </span>
              <div className="flex flex-col">
                <span>5A</span>
                <span className="font-light opacity-60 text-[14px]">
                  Team Format
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span>
                <FaRupeeSign className="text-[#27D483] text-[22px]" />
              </span>
              <div className="flex flex-col">
                <span> 50-50</span>
                <span className="font-light opacity-60 text-[14px]">
                  Payment
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-[2px] border-[#212121] rounded-[10px] p-[1rem] bg-[#212121]">
          <div>
            <p> Looking for a competitive match this Monday evening!</p>
          </div>
          <div>
            <strong className="mr-[12px]">Sent:</strong>
            2025-07-14 10:30 AM
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchDetail;
