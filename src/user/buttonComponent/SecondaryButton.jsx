import React from "react";
import { useNavigate } from "react-router-dom";

function SecondaryButton({ buttonName, navTo }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(navTo);
  };
  return (
    <button
      onClick={handleClick}
      className="btn px-[32px] py-[12px] rounded-[10px] text-[white] hover:bg-[#27D483] hover:border-[#27D483] hover:text-[black] ease-out duration-1000 bg-[#212121] w-fit font-semibold border-[1px] border-[#FFFFFF]"
    >
      {buttonName}
    </button>
  );
}

export default SecondaryButton;
