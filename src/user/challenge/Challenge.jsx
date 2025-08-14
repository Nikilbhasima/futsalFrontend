import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelFutsalChallenge,
  getListOfChallenges,
  getMyChallenge,
} from "../../redux/bookingSlice/BookingThunks";
import { removeSeconds } from "../../uitls/TimeSlotGenerator";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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

function Challenge() {
  const [filterMatch, setFilterMatch] = useState("");
  const [navbarStatus, setNavbarStatus] = useState(1);
  const [challengesData, setChallengesData] = useState([]);
  const [cancelId, setCancelId] = useState(null);

  const [successMessage, setSuccessMessage] = useState(false);
  const handleSuccessMessage = () => setSuccessMessage(true);
  const handleFailMessage = () => setSuccessMessage(false);

  const [successMessage2, setSuccessMessage2] = useState(false);
  const handleSuccessMessage2 = () => setSuccessMessage2(true);
  const handleFailMessage2 = () => setSuccessMessage2(false);

  const dispatch = useDispatch();
  useEffect(() => {
    getListOfChallengesData();
  }, []);

  const getListOfChallengesData = async () => {
    try {
      const response = await dispatch(getMyChallenge());
      console.log("challenge data are:", response.payload);
      if (response.meta.requestStatus === "rejected") {
        setChallengesData([]);
      }
      if (response.meta.requestStatus === "fulfilled") {
        setChallengesData(response.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelChallenge = async () => {
    try {
      const response = await dispatch(cancelFutsalChallenge(cancelId));
      console.log("cancel challenge response::", response.payload);
      handleFailMessage();
      handleSuccessMessage2();
      setTimeout(async () => {
        await getListOfChallengesData();
      }, 1000);
      handleFailMessage2();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="max-w-[1320px] pt-[40px] md:px-[20px] mx-auto">
        <h2 className="pt-[20px] text-[40px] font-semibold">My Challenges</h2>
        <ul className="flex flex-row gap-5 mt-[12px]">
          <li
            className={`navbar-list ${
              navbarStatus === 1 ? "text-[#27D483]" : ""
            }`}
            onClick={() => {
              setFilterMatch("");
              setNavbarStatus(1);
            }}
          >
            All Matches
          </li>
          <li
            className={`navbar-list ${
              navbarStatus === 2 ? "text-[#27D483]" : ""
            }`}
            onClick={() => {
              setFilterMatch("accepted");
              setNavbarStatus(2);
            }}
          >
            Accepted
          </li>
          <li
            className={`navbar-list ${
              navbarStatus === 3 ? "text-[#27D483]" : ""
            }`}
            onClick={() => {
              setFilterMatch("pending");
              setNavbarStatus(3);
            }}
          >
            Pending
          </li>
        </ul>

        {challengesData
          .filter((data) => {
            console.log("filter data", data);
            if (filterMatch === "pending") {
              return data.status === "pending";
            }
            if (filterMatch === "playing") {
              return data.status === "playing";
            }
            if (filterMatch === "accepted") {
              return data.opponentDto != null;
            }
            if (!filterMatch) {
              return true;
            }
          })
          .map((data, index) => {
            return (
              <div
                key={index}
                className=" mt-[40px] bg-[#333333] p-[1rem] rounded-[10px] flex flex-col gap-4"
              >
                {/* this is user information */}
                <div className="flex items-center ">
                  {false ? (
                    <IoPersonCircleOutline className="text-[5rem]" />
                  ) : (
                    <div className="bg-[url(/images/messi.png)] w-[6rem] h-[6rem] bg-cover bg-no-repeat rounded-[50%]"></div>
                  )}
                  <div className="ml-[12px] ">
                    <p className="font-normal text-[20px]">
                      {data?.challengerDto?.username}
                    </p>
                    <p className="flex justify-start justify-center items-center gap-2 font-light">
                      <MdOutlineLocalPhone className="text-[20px] text-[#27D483] " />
                      {data?.challengerDto?.phoneNumber}
                      {data?.contactForMatch && `, ${data.contactForMatch}`}
                    </p>
                  </div>
                  {data.status != "completed" && data.status != "cancelled" && (
                    <div className="ml-auto flex flex-row gap-2">
                      <button
                        className="ml-auto bg-[#E63946] hover:bg-[#CC0000] ease-out duration-1000  font-medium ml-[20px] text-[white] rounded-[10px] flex items-center gap-[5px] py-[12px] px-[12px] md:px-[32px] h-fit w-fit text-[14px] hover:-translate-y-[4px] ease-out duration-1000"
                        onClick={() => {
                          setCancelId(data?.id);
                          handleSuccessMessage();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {data?.status === "cancelled" && (
                    <div className="ml-auto flex flex-row gap-2">
                      <p className="text-[red]">Challenge has been cancelled</p>
                    </div>
                  )}
                </div>
                {/* match detail */}
                <div className="flex flex-col gap-4 px-[1rem]">
                  <div>
                    <div className="flex items-center space-x-3  font-medium">
                      <span>
                        <MdOutlineDateRange className="text-[#27D483]" />
                      </span>
                      <span>
                        ({data?.playing_date})
                        {removeSeconds(data?.starting_time)} at
                        {removeSeconds(data?.ending_time)}
                      </span>
                    </div>
                    <div class="flex items-center space-x-3 font-medium ">
                      <span>
                        <IoLocation className="text-[#27D483]" />
                      </span>
                      <span>
                        {data?.futsalGroundDTO?.futsalDto?.futsalAddress}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <strong>Team Format:</strong>
                      {data?.futsalGroundDTO?.groundType}
                    </div>
                    <div>
                      <strong>Payment:</strong> {data?.matchPaymentType}
                    </div>
                  </div>
                  {data?.opponentDto === null ? (
                    <div className="border-[2px] border-[#27D483] rounded-[10px] p-[1rem] bg-[#212121]">
                      <div>
                        <strong className="mr-[12px]">Sent:</strong>
                        {data?.booking_date}
                      </div>
                      <div>
                        <strong className="mr-[12px]">Opponent:</strong>
                        Waiting for opponent's response...
                      </div>
                    </div>
                  ) : (
                    <div className="border-[2px] border-[#27D483] rounded-[10px] p-[1rem] bg-[#212121]">
                      <div>
                        <strong className="mr-[12px]">Accepted:</strong>
                        {data.acceptedDate} {data.acceptedTime}
                      </div>
                      <div>
                        <strong className="mr-[12px]">Opponent:</strong>
                        {data?.opponentDto?.username}_{data?.opponentDto?.email}
                        _{data?.opponentDto?.phoneNumber},
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <Modal open={successMessage} onClose={handleFailMessage}>
        <Box sx={style}>
          <label className="text-[#27D483]">
            Do you want to cancel challenge!
          </label>
          <button
            className="bg-[#27D483] text-[#333333] p-[12px] rounded-[10px] w-fit hover:-translate-y-1 hover:bg-[#1c945c] hover:text-[#FFFFFF] transition-all duration-300"
            onClick={() => {
              handleCancelChallenge();
            }}
          >
            Cancel Challenge
          </button>
        </Box>
      </Modal>
      <Modal open={successMessage2} onClose={handleFailMessage2}>
        <Box sx={style}>Challenge Has been successfully accepted!</Box>
      </Modal>
    </>
  );
}

export default Challenge;
