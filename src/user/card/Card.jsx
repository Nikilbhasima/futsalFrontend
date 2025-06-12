import React from "react";
import "./card.css";
import TerteryButton from "../buttonComponent/TerteryButton";
function Card({ img, header, detail, button, nav }) {
  return (
    <div className="card bg-[#333333] max-w-[300px] rounded-[10px]  overflow-hidden hover:-translate-y-2 duration-1000 ease-in-out">
      <div className="car-img h-[200px] overflow-hidden">
        <img
          className="hover:scale-[1.1] h-[200px] transition duration-1000 ease-in-out object-cover"
          src={img}
          alt=""
        />
      </div>
      <div className="card-detail p-[20px] flex flex-col gap-[14px] ">
        <p className="card-detail-header font-[600] text-[24px] text-[#27D483]">
          {header}
        </p>
        <p className="card-detail-description text-[#27D483] text-[14px]">
          {detail}
        </p>
        <TerteryButton buttonName={button} />
      </div>
    </div>
  );
}

export default Card;
