import React from "react";
import { useNavigate } from "react-router-dom";

function PrimaryButton({ buttonName, navTo }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(navTo);
  };
  return (
    <button
      onClick={handleClick}
      className="btn px-[32px] py-[12px] rounded-[10px] text-[black] hover:bg-[#1c945c] ease-out duration-1000 bg-[#27D483] w-fit font-semibold"
    >
      {buttonName}
    </button>
  );
}

export default PrimaryButton;
