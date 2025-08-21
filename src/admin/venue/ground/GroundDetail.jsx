import React from "react";
import GroundCard from "./GroundCard";

function GroundDetail({ groundList }) {
  return (
    <div className="mt-[28px] flex gap-[1rem]">
      {groundList?.map((data, index) => {
        return <GroundCard key={index} data={data} />;
      })}
    </div>
  );
}

export default GroundDetail;
