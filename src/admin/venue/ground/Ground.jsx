import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import GroundDetail from "./GroundDetail";
import AddGround from "./AddGround";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getGroundList } from "../../../redux/ground/GroundThunks";

function Ground() {
  const [addGround, setAddGround] = useState(true);
  const [groundList, setGroundList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getListOfGround();
  }, []);
  const getListOfGround = async () => {
    const response = await dispatch(getGroundList());
    if (response.meta.requestStatus === "fulfilled") {
      setGroundList(response.payload);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[40px] font-semibold">Ground</h2>
        {addGround ? (
          <button
            className="flex items-center gap-[12px] text-primary text-[16px] hover:text-secondary hover:bg-primary p-[12px] rounded-[10px] transition-all duration-400 ease-in"
            onClick={() => setAddGround(!addGround)}
          >
            Add Ground <IoAddCircle className="text-[20px]" />
          </button>
        ) : (
          <button
            className="flex items-center gap-[12px] text-primary text-[16px] hover:text-secondary hover:bg-danger p-[12px] rounded-[10px] transition-all duration-400 ease-in"
            onClick={() => setAddGround(!addGround)}
          >
            Cancel <MdCancel className="text-[20px]" />
          </button>
        )}
      </div>
      {addGround ? <GroundDetail groundList={groundList} /> : <AddGround />}
    </div>
  );
}

export default Ground;
