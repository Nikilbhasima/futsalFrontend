import React from "react";
import { useNavigate } from "react-router-dom";

function TerteryButton({ buttonName, goTo }) {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(`venue/${goTo}/browse`)}
        className="btn cursor-pointer  px-[32px] py-[12px] rounded-[5px]  text-[#27D483] hover:bg-[#27D483] hover:border-[#27D483] hover:text-[black] ease-out duration-1000 bg-[#333333] w-full font-semibold border-[1px] border-[#27D483]"
      >
        {buttonName}
      </button>
    </div>
  );
}

export default TerteryButton;
