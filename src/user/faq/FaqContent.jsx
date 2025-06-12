import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";

function FaqContent({ question, answer }) {
  const [dropDown, setDropDown] = useState(true);

  return (
    <div className="bg-[#333333] rounded-[10px] lg:px-[32px] lg:py-[28px] md:px-[28px] md:py-[23px] py-[16px] px-[20px]">
      <div className="flex justify-between">
        <p className="lg:text-[20px] md:text-[16px] font-medium text-[white]">
          {question}
        </p>
        {dropDown ? (
          <MdAdd
            className="lg:text-[2rem] md:text-[1.5rem] text-[1.5rem] font-semibold text-[white]"
            onClick={() => setDropDown(false)}
          />
        ) : (
          <FaMinus
            className=" lg:text-[2rem] md:text-[1.5rem] text-[1.5rem] font-semibold text-[white]"
            onClick={() => setDropDown(true)}
          />
        )}
      </div>
      <div
        className={
          dropDown
            ? "overflow-hidden lg:text-[1rem] md:text-[1rem] h-[0] text-[#27D483]"
            : " text-[1rem] h-fit lg:p-[0.5rem] pt-[10px] lg:text-[#27D483] md:text-[1rem] text-[12px] text-[#27D483]"
        }
      >
        {answer}
      </div>
    </div>
  );
}

export default FaqContent;
