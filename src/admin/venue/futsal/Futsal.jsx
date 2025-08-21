import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import FutsalForm from "./FutsalForm";
import FutsalDetail from "./FutsalDetail";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { ownerFutsal } from "../../../redux/createFutsal/CreateFutsalThunks";

function Futsal() {
  const [isEditing, setIsEditing] = useState(true);
  const [futsalDetail, setFutsalDetail] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    getFutsalDetail();
  }, []);
  const getFutsalDetail = async () => {
    const response = await dispatch(ownerFutsal());
    if (response.meta.requestStatus === "fulfilled") {
      console.log("why not got futsal data:", response);
      setFutsalDetail(response.payload);
    }

    console.log("futsal data:", response);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[40px] font-semibold">Venue Detail</h2>
        {isEditing ? (
          <button
            className="flex items-center gap-[12px] text-primary text-[16px] hover:text-secondary hover:bg-primary p-[12px] rounded-[10px] transition-all duration-400 ease-in"
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit Detail <TbEdit className="text-[20px]" />
          </button>
        ) : (
          <button
            className="flex items-center gap-[12px] text-primary text-[16px] hover:text-secondary hover:bg-danger p-[12px] rounded-[10px] transition-all duration-400 ease-in"
            onClick={() => setIsEditing(!isEditing)}
          >
            Cancel
            <MdCancel className="text-[20px]" />
          </button>
        )}
      </div>

      {isEditing ? (
        <FutsalDetail futsalData={futsalDetail} />
      ) : (
        <FutsalForm
          setFutsalDetail={setFutsalDetail}
          futsalData={futsalDetail}
        />
      )}
    </div>
  );
}

export default Futsal;
