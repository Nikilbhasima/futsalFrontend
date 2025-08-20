import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import FutsalForm from "./FutsalForm";
import FutsalDetail from "./FutsalDetail";

function Futsal() {
  const [isEditing, setIsEditing] = useState(true);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[40px] font-semibold">Futsal Detail</h2>
        <button
          className="flex items-center gap-[12px] text-primary text-[16px] hover:text-secondary hover:bg-primary p-[12px] rounded-[10px] transition-all duration-400 ease-in"
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit Detail <TbEdit className="text-[20px]" />
        </button>
      </div>
      {isEditing ? <FutsalDetail /> : <FutsalForm />}
    </div>
  );
}

export default Futsal;
