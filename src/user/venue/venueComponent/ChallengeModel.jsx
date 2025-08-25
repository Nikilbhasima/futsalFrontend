import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearLoading, setloading } from "../../../redux/authSlice/AuthSlice";
import { bookGround } from "../../../redux/bookingSlice/BookingThunks";
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

function ChallengeModel({
  open2,
  handleClose2,
  groundDetail,
  playingTime,
  groundId,
  selectDate,
  bookingType,
  getListOfBookedGround,
}) {
  const [groundInfromation, setGroundInformation] = useState({});
  const [challengeData, setChallengeData] = useState({
    phoneNumber: "",
    paymentType: "50-50",
  });
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSuccessMessage = () => setSuccessMessage(true);
  const handleFailMessage = () => setSuccessMessage(false);
  useEffect(() => {
    if (Array.isArray(groundDetail) && groundDetail.length > 0) {
      const foundGround = groundDetail.find((item) => item.id === groundId);
      if (foundGround) {
        setGroundInformation(foundGround);
      }
    }
  }, [groundId, groundDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallengeData((pre) => {
      return { ...pre, [name]: value };
    });
  };
  const handleSubmitChallenge = async () => {
    dispatch(setloading());
    const currentBookingDetail = {
      starting_time: playingTime?.starting_time,
      ending_time: playingTime?.ending_time,
      playing_date: selectDate,
      bookingType: bookingType,
      matchPaymentType: challengeData.paymentType,
      contactForMatch: challengeData.phoneNumber,
    };
    try {
      const response = await dispatch(
        bookGround({
          bookingDetail: currentBookingDetail,
          groundId: groundId,
        })
      );
      if (response.meta.requestStatus === "fulfilled") {
        handleClose2();
        await getListOfBookedGround();
        handleSuccessMessage();
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(clearLoading());
  };
  return (
    <>
      <Modal open={open2} onClose={handleClose2}>
        <Box sx={style}>
          <div className="grid gap-[32px]">
            <h1 className="text-[#27D483] text-center text-[25px] font-semibold">
              Inviter Detail
            </h1>
            <div className="grid gap-[20px]">
              {/* <div className="flex justify-between">
              <span className="text-[16px] font-medium">Inviter Name:</span>
              <span className="font-thin">Nikil Bhasima</span>
            </div>
            <div className="h-[2px] w-full bg-[#27D483] "></div> */}
              <div className="flex justify-between">
                <span className="text-[16px] font-medium">Team Format:</span>
                <span className="font-thin">
                  {groundInfromation.groundType}
                </span>
              </div>
              <div className="h-[2px] w-full bg-[#27D483] "></div>
              <div className="grid grid-cols-[1fr_1fr]  items-center">
                <span className="text-[16px] font-medium ">
                  Contact For Match:
                </span>
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
              onClick={handleSubmitChallenge}
            >
              Challenge
            </button>
          </div>
        </Box>
      </Modal>

      <Modal open={successMessage} onClose={handleFailMessage}>
        <Box sx={{ ...style, color: "#27D483" }}>
          Your Fustal has been successfull booked!
        </Box>
      </Modal>
    </>
  );
}

export default ChallengeModel;
