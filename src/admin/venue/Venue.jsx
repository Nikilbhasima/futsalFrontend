import React from "react";
import Futsal from "./futsal/Futsal";
import Ground from "./ground/Ground";

function Venue() {
  return (
    <div className="grid gap-[2rem]">
      <Futsal />
      <Ground />
    </div>
  );
}

export default Venue;
