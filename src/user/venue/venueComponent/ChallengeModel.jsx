import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "#333333",
  border: "2px solid #000",
  p: "24px",
  borderRadius: "10px",
};

function ChallengeModel({ open2, handleClose2 }) {
  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState({
    phoneNumber: "",
    paymentType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setChallengeData((pre) => {
      return { ...pre, [name]: value };
    });
  };
  return (
    <Modal open={open2} onClose={handleClose2}>
      <Box sx={style}>
        <div className="grid gap-[32px]">
          <h1 className="text-[#27D483] text-center text-[25px] font-semibold">
            Inviter Detail
          </h1>
          <div className="grid gap-[20px]">
            <div className="flex justify-between">
              <span className="text-[16px] font-medium">Inviter Name:</span>
              <span className="font-thin">Nikil Bhasima</span>
            </div>
            <div className="h-[2px] w-full bg-[#27D483] "></div>
            <div className="flex justify-between">
              <span className="text-[16px] font-medium">Team Format:</span>
              <span className="font-thin">5A</span>
            </div>
            <div className="h-[2px] w-full bg-[#27D483] "></div>
            <div className="grid grid-cols-[1fr_1fr]  items-center">
              <span className="text-[16px] font-medium ">Add Phone:</span>
              <input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                value={challengeData.phoneNumber}
                onChange={handleChange}
                className="w-full py-[10px] px-[24px] bg-[white] text-[#333333] rounded-[5px] border-none outline-none "
              />
            </div>
            <div className="h-[2px] w-full bg-[#27D483] "></div>
            <div className="grid grid-cols-[1fr_1fr]  items-center">
              <p className="">Payment Type:</p>
              <select
                name="paymentType"
                className="py-[10px] px-[24px] bg-[white] text-[#333333] rounded-[5px] border-none outline-none "
                value={challengeData.paymentType}
                onChange={handleChange}
              >
                <option value="50-50">50-50</option>
                <option value="60-40">60-40</option>
                <option value="70-30">70-30</option>
              </select>
            </div>
          </div>
          <button
            className=" px-[32px] py-[12px] bg-[#27D483] text-[#212121] rounded-[10px] w-fit m-auto"
            onClick={() => navigate("/bookings")}
          >
            Challenge
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default ChallengeModel;
