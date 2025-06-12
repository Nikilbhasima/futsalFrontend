import React from "react";

function PrimaryButton({ buttonName }) {
  return (
    <button className="btn px-[32px] py-[12px] rounded-[10px] text-[black] hover:bg-[#1c945c] ease-out duration-1000 bg-[#27D483] w-fit font-semibold">
      {buttonName}
    </button>
  );
}

export default PrimaryButton;
