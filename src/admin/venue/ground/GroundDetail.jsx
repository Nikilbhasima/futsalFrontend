import React from "react";
import GroundCard from "./GroundCard";

function GroundDetail({ groundList, setAddGround }) {
  return (
    <div className="mt-[28px] flex gap-[1rem]">
      {groundList?.map((data, index) => {
        console.log("data===;", data);
        return (
          <GroundCard key={index} data={data} setAddGround={setAddGround} />
        );
      })}
    </div>
  );
}

export default GroundDetail;
