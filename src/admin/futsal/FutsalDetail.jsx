import React from "react";

function FutsalDetail() {
  return (
    <div className="grid grid-cols-[8fr_4fr] gap-[32px] mt-[28px]">
      {/* this is detail part */}
      <div className="bg-tertary rounded-[10px] p-[24px] flex flex-col gap-[10px]">
        {/* futsal name */}
        <div className="flex justify-between">
          <label className="font-semibold">Futsal Name:</label>
          <span className="font-light">Bode Futsal</span>
        </div>
        <div className=" bg-primary h-[2px] my-[12px]"></div>
        {/* futsal Phone Number */}
        <div className="flex justify-between">
          <label className="font-semibold">Phone Number:</label>
          <span className="font-light">9813225782</span>
        </div>
        <div className=" bg-primary h-[2px] my-[12px]"></div>

        {/* Futsal Mail */}
        <div className="flex justify-between">
          <label className="font-semibold">Gmail:</label>
          <span className="font-light">nikil@gmail.com</span>
        </div>
        <div className=" bg-primary h-[2px] my-[12px]"></div>
        {/* futsal location */}
        <div className="flex justify-between">
          <label className="font-semibold">Futsal Location:</label>
          <span className="font-light"> Madhyapur, Thimi, Bode</span>
        </div>
        <div className=" bg-primary h-[2px] my-[12px]"></div>
      </div>
      {/* image part */}
      <div className="flex justify-center items-center bg-tertary rounded-[10px]">
        <img
          src="./images/messi.png"
          alt="futsal Logo"
          className="rounded-[10px] h-[250px] w-[300px] object-cover"
        />
      </div>
    </div>
  );
}

export default FutsalDetail;
