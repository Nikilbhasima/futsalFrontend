import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { GiSoccerKick } from "react-icons/gi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocation } from "react-icons/io5";

function Match() {
  const [filter, setFilter] = useState(true);
  const handleFilter = () => {
    setFilter(!filter);
  };
  return (
    <div>
      <h2 className="pt-[20px] text-[40px] text-[#27D483] font-semibold">
        Search Venue For Match
      </h2>
      <p className="font-light ">
        Search venue by its name or location to book futsal fro match
      </p>
      <div className="flex mt-[12px] gap-[12px]">
        <div className="flex ">
          <input
            type="text"
            placeholder="Search"
            className="text-[#39908F] border-none  outline-none placeholder:text-[#39908F] bg-white text-[16px] py-[12px] px-[32px] rounded-l-[10px]  "
          />
          <button className="group bg-white py-[12px] px-[32px] rounded-r-[10px] hover:bg-[#27D483] ease-in transition-all duration-300">
            <IoSearchOutline className="text-[#39908F] text-[25px] group-hover:text-[#212121] " />
          </button>
        </div>
        {/* this part is for sorting and filtering futsal ground */}
        <div className="relative">
          <button
            onClick={handleFilter}
            className="group flex gap-[10px] text-[#39908F] bg-white p-[12px] rounded-[10px] hover:bg-[#27D483] hover:text-[#212121] ease-in transition-all duration-300"
          >
            {/* <GiSettingsKnobs className="text-[#39908F] text-[25px] group-hover:text-[#212121] text-[16px] " /> */}
            Sort & Filter
            <RiArrowDropDownLine
              className={
                filter
                  ? "text-[#39908F] text-[25px] group-hover:text-[#212121] text-[25px] "
                  : "text-[#39908F] text-[25px] group-hover:text-[#212121] text-[25px] rotate-180"
              }
            />
          </button>
          <ul
            role="menu"
            className={`bg-white absolute left-0 w-[200%] rounded-[10px] py-[10px] shadow-lg overflow-hidden transition-all duration-300 ease-in-out origin-top z-10 ${
              filter
                ? "opacity-0 scale-y-0 h-0 -translate-y-2 pointer-events-none"
                : "opacity-100 scale-y-100 h-auto translate-y-1 pointer-events-auto"
            }`}
          >
            <span className="text-[black] px-[12px] text-[16px] font-bold">
              Payment Type
            </span>
            <li className="py-[12px] px-[12px] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light">
              50-50
            </li>
            <li className="py-[12px] px-[12px] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light">
              60-40
            </li>
            <li className="py-[12px] px-[12px] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light">
              70-30
            </li>
            <span className="text-[black] py-[12px] px-[12px] text-[16px] font-bold">
              Filter By Ground
            </span>
            <li className="py-[12px] px-[12px] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light">
              5A Ground
            </li>
            <li className="py-[12px] px-[12px] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light">
              7A Ground
            </li>
          </ul>
        </div>
        {/* end of sorting and filtering */}
      </div>
      {/* <div className="mt-[60px] w-full  overflow-hidden grid md:grid-cols-[2fr_3fr_1fr] items-center md:items-start rounded-[10px] bg-[#333333] pb-[20px] md:pb-[0px] md:pr-[10px]">
        <div className="  h-[7rem] sm:h-[8rem] md:h-[14rem] bg-[url(/images/futsalGround.png)] bg-cover bg-center"></div>
        <div className="bg-[#333333]  p-[15px] lg:p-[20px] lg:pl-[32px] grid grid-cols-2 md:grid-cols-1 gap-[20px] md:gap-[12px]">
          <p className="text-[20px] text-[#27D483] font-semibold mb-[12px]">
            Inviter Detail
          </p>
          <p className="text-[16px] font-semibold leading-4">
            Inviter:
            <span className="ml-[10px] font-light">Sapun mayor Shrestha</span>
          </p>
          <p className="text-[16px] font-semibold leading-4">
            Phone no.:
            <span className="ml-[10px] font-light">9869699669</span>
          </p>
          <p className="text-[16px] font-semibold leading-4">
            Team Format:
            <span className="ml-[10px] font-light">5A</span>
          </p>
          <p className="text-[16px] font-semibold leading-4">
            Payment Type:
            <span className="ml-[10px] font-light">50-50</span>
          </p>
          <a
            href="#"
            className="flex items-center gap-[6px] text-[#005FFF] font-regular"
          >
            View Venue Details
            <IoIosInformationCircleOutline className="font-bold text-[20px]" />
          </a>
        </div>
        <div className=" h-full  md:flex md:justify-center md:items-center">
          <button className="bg-[#27D483] hover:bg-[#1c945c] ease-out duration-1000  font-medium ml-[20px] text-[#212121] rounded-[10px] flex items-center gap-[5px] py-[12px] px-[12px] h-fit w-fit text-[14px]">
            <GiSoccerKick className="font-bold text-[20px]" />
            Join Match
          </button>
        </div>
      </div> */}
      <div className=" mt-[60px] bg-[#333333] p-[1rem] rounded-[10px] flex flex-col gap-4">
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
          <button className="ml-auto bg-[#27D483] hover:bg-[#1c945c] ease-out duration-1000  font-medium ml-[20px] text-[#212121] rounded-[10px] flex items-center gap-[5px] py-[12px] px-[12px] h-fit w-fit text-[14px]">
            <GiSoccerKick className="font-bold text-[20px]" />
            Join Match
          </button>
        </div>
        {/* match detail */}
        <div className="flex flex-col gap-4 px-[1rem]">
          <div>
            <div class="flex items-center space-x-3  font-medium">
              <span>
                <MdOutlineDateRange className="text-[#27D483]" />
              </span>
              <span>2025-07-15 at 6:00 PM</span>
            </div>
            <div class="flex items-center space-x-3 font-medium ">
              <span>
                <IoLocation className="text-[#27D483]" />
              </span>
              <span>Kathmandu Futsal Arena</span>
            </div>
          </div>
          <div>
            <div>
              <strong>Team Format:</strong> 5A
            </div>
            <div>
              <strong>Payment:</strong> 50-50
            </div>
          </div>
          <div className="border-[2px] border-[#27D483] rounded-[10px] p-[1rem] bg-[#5FE1A5]">
            <div>
              <strong className="mr-[12px]">Sent:</strong>
              2025-07-14 10:30 AM
            </div>
            <div>
              <strong className="mr-[12px]">Opponent:</strong>
              Waiting for opponent's response...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Match;
