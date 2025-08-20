import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import GroundDetail from "./GroundDetail";
import AddGround from "./AddGround";

function Ground() {
  const [addGround, setAddGround] = useState(true);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[40px] font-semibold">Ground</h2>
        <button
          className="flex items-center gap-[12px] text-primary text-[16px] hover:text-secondary hover:bg-primary p-[12px] rounded-[10px] transition-all duration-400 ease-in"
          onClick={() => setAddGround(!addGround)}
        >
          Add Ground <IoAddCircle className="text-[20px]" />
        </button>
      </div>
      {addGround ? <GroundDetail /> : <AddGround />}
    </div>
  );
}

export default Ground;
