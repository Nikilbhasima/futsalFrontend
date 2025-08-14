import React, { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa6";
import { GiSoccerKick } from "react-icons/gi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { removeSeconds } from "../../uitls/TimeSlotGenerator";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { acceptChallenge } from "../../redux/bookingSlice/BookingThunks";
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
  display: "grid",
  gap: "1rem",
  color: "#27D483",
};

function MatchDetail({ data, isUserLogin, getListOfChallengesData }) {
  const [successMessage, setSuccessMessage] = useState(false);
  const handleSuccessMessage = () => setSuccessMessage(true);
  const handleFailMessage = () => setSuccessMessage(false);

  const [successMessage2, setSuccessMessage2] = useState(false);
  const handleSuccessMessage2 = () => setSuccessMessage2(true);
  const handleFailMessage2 = () => setSuccessMessage2(false);

  const dispatch = useDispatch();

  const handleAcceptChallenge = async () => {
    console.log("futsal id:", data.id);
    try {
      const response = await dispatch(acceptChallenge(data.id));
      if (response.meta.requestStatus === "fulfilled") {
        handleFailMessage();
        handleSuccessMessage2();
        setTimeout(async () => {
          await getListOfChallengesData();
          handleFailMessage2();
        }, 1000);
      }
      console.log("print challenge response:", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" mt-[32px] bg-[#333333] p-[1rem] rounded-[10px] flex flex-col gap-4">
      {/* this is user information */}
      <div className="flex items-center ">
        {false ? (
          <IoPersonCircleOutline className="text-[5rem]" />
        ) : (
          <div className="bg-[url(/images/messi.png)] w-[4rem] md:w-[6rem] h-[4rem] md:h-[6rem] bg-cover bg-no-repeat rounded-[50%]"></div>
        )}
        <div className="ml-[12px] ">
          <p className="font-normal text-[20px]">
            {data?.challengerDto?.username}
          </p>
          <p className="flex justify-start justify-center items-center gap-2 font-light text-[13px] md:text-[16px]">
            <MdOutlineLocalPhone className="text-[20px] text-[#27D483] " />
            {data?.challengerDto?.phoneNumber}
            {data?.contactForMatch && `, ${data.contactForMatch}`}
          </p>
        </div>
        <div className="ml-auto flex flex-row gap-2">
          {isUserLogin != data?.challengerDto?.phoneNumber && (
            <button
              className="bg-[#27D483] hover:bg-[#1c945c] ease-out duration-1000  font-medium ml-[20px] text-[#212121] rounded-[10px] flex items-center gap-[5px] py-[12px] px-[12px] h-fit w-fit text-[12px] md:text-[14px] hover:-translate-y-[4px] ease-out duration-1000"
              onClick={() => setSuccessMessage(true)}
            >
              <GiSoccerKick className="font-bold text-[20px]" />
              Join Match
            </button>
          )}
        </div>
      </div>
      {/* match detail */}
      <div className="flex flex-col gap-1 px-[15px]">
        <div className="py-[1rem] flex flex-col gap-3">
          <div className="grid grid-cols-[1fr_1fr]">
            <div className="flex items-center space-x-2  font-medium ">
              <span>
                <MdOutlineDateRange className="text-[#27D483] text-[22px]" />
              </span>
              <div className="flex flex-col">
                <span className="text-[14px] md:text-[16px]">
                  {data?.playing_date}
                </span>
                <span className="font-light opacity-60 text-[12px] md:text-[14px]">
                  {removeSeconds(data?.starting_time)}-
                  {removeSeconds(data?.ending_time)}
                </span>
              </div>
            </div>
            <div class="flex items-center space-x-2 font-medium ">
              <span>
                <IoLocation className="text-[#27D483] text-[22px]" />
              </span>
              <div className="flex flex-col">
                <span className="text-[14px] md:text-[16px] text-wrap">
                  {data?.futsalGroundDTO?.futsalDto?.futsalAddress}
                </span>
                <span className="font-light opacity-60 text-[12px] md:text-[16px]">
                  Venue
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_1fr]">
            <div className="flex items-center space-x-2">
              <span>
                <FaUsers className="text-[#27D483] text-[22px]" />
              </span>
              <div className="flex flex-col">
                <span className="text-[14px] md:text-[16px]">
                  {data?.futsalGroundDTO?.groundType}
                </span>
                <span className="font-light opacity-60 text-[12px] md:text-[14px]">
                  Team Format
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span>
                <FaRupeeSign className="text-[#27D483] text-[22px]" />
              </span>
              <div className="flex flex-col">
                <span className="text-[14px] md:text-[16px]">
                  {data?.matchPaymentType}
                </span>
                <span className="font-light opacity-60 text-[12px] md:text-[14px]">
                  Payment
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-[2px] border-[#212121] rounded-[10px] p-[1rem] bg-[#212121]">
          <div>
            <p className="text-[14px] md:text-[16px]">
              Looking for a competitive match this Monday evening!
            </p>
          </div>
          <div className="text-[14px] md:text-[16px]">
            <strong className="mr-[12px]">Sent:</strong>
            {data?.booking_date}
          </div>
        </div>
      </div>
      <Modal open={successMessage} onClose={handleFailMessage}>
        <Box sx={{ ...style, color: "#27D483" }}>
          <label className="text-[#27D483]">
            Do you accept these challenge!
          </label>
          <button
            className="bg-[#27D483] text-[#333333] p-[12px] rounded-[10px] w-fit hover:-translate-y-1 hover:bg-[#1c945c] hover:text-[#FFFFFF] transition-all duration-300"
            onClick={() => handleAcceptChallenge()}
          >
            Accept Challenge
          </button>
        </Box>
      </Modal>
      <Modal open={successMessage2} onClose={handleFailMessage2}>
        <Box sx={style}>Challenge Has been successfully accepted!</Box>
      </Modal>
    </div>
  );
}

export default MatchDetail;
