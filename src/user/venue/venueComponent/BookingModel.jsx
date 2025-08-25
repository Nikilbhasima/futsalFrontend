import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import {
  generateTimeSlots,
  isValidLocalTime,
} from "../../../uitls/TimeSlotGenerator";
import { useDispatch } from "react-redux";
import { bookGround } from "../../../redux/bookingSlice/BookingThunks";
import { clearLoading, setloading } from "../../../redux/authSlice/AuthSlice";
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

function BookingModel({
  open,
  handleClose,
  groundDetail,
  playingTime,
  setPlayingTime,
  selectDate,
  bookingType,
  groundId,
  getListOfBookedGround,
}) {
  const [Custome, handleCustome] = useState(true);
  const [numberOfSlot, setNumberOfSlot] = useState(0);
  const dispatch = useDispatch();
  const [groundInfromation, setGroundInformation] = useState({});
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

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setPlayingTime((pre) => ({ ...pre, [name]: value }));
  };

  useEffect(() => {
    if (
      isValidLocalTime(playingTime.starting_time) &&
      isValidLocalTime(playingTime.ending_time)
    ) {
      const data = generateTimeSlots(
        playingTime.starting_time,
        playingTime.ending_time,
        60
      );
      setNumberOfSlot(data.length);
    }
  }, [playingTime]);

  const handleBookFutsal = async () => {
    dispatch(setloading());
    const currentBookingDetail = {
      starting_time: playingTime?.starting_time,
      ending_time: playingTime?.ending_time,
      playing_date: selectDate,
      bookingType: bookingType,
    };

    try {
      const response = await dispatch(
        bookGround({
          bookingDetail: currentBookingDetail,
          groundId: groundId,
        })
      );

      // Call to refresh the booking list only if booking was successful
      if (response.meta.requestStatus === "fulfilled") {
        await getListOfBookedGround();
        handleClose();
        handleSuccessMessage();
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(clearLoading());
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="grid gap-[32px]">
            <h1 className="text-[#27D483] text-center text-[25px] font-semibold">
              Match Detail
            </h1>
            {Custome ? (
              <div className="grid gap-[15px]">
                <div className="flex justify-between">
                  <span className="text-[16px] font-medium">Match Price:</span>
                  <span className="font-thin">
                    Rs {groundInfromation?.pricePerHour}
                  </span>
                </div>
                <div className="h-[2px] w-full bg-[#27D483] rounded-[10px]"></div>
                <div className="flex justify-between">
                  <span className="text-[16px] font-medium">Match Time:</span>
                  <span className="font-thin">
                    {playingTime.starting_time} - {playingTime.ending_time}
                  </span>
                </div>
                <div className="h-[2px] w-full bg-[#27D483] rounded-[10px]"></div>
                <div className="flex justify-between">
                  <span className="text-[16px] font-medium">Ground Type:</span>
                  <span className="font-thin">
                    {groundInfromation?.groundType}
                  </span>
                </div>
                <div className="h-[2px] w-full bg-[#27D483] rounded-[10px]"></div>
                <div className="flex justify-between">
                  <span className="text-[16px] font-medium">Total Price:</span>
                  <span className="font-thin">
                    Rs {numberOfSlot * groundInfromation?.pricePerHour}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-[1rem]">
                <p>Choose Your Time</p>
                <div className="flex flex-col gap-[10px]">
                  <label className="opacity-50">Starting</label>
                  <input
                    type="time"
                    className="bg-[white] text-[black] text-[16px] py-[10px] px-[16px] rounded-[10px]"
                    value={playingTime.starting_time}
                    name="starting_time"
                    onChange={handleTimeChange}
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label className="opacity-50">Ending</label>
                  <input
                    type="time"
                    className="bg-[white] text-[black] text-[16px] py-[10px] px-[16px] rounded-[10px]"
                    value={playingTime.ending_time}
                    name="ending_time"
                    onChange={handleTimeChange}
                  />
                </div>
              </div>
            )}

            {Custome ? (
              <button
                onClick={() => handleCustome(false)}
                className=" ml-auto bg-[white] text-[black] w-fit py-[5px] px-[4px] rounded-[10px]"
              >
                Custom
              </button>
            ) : (
              <button
                onClick={() => handleCustome(true)}
                className=" ml-auto bg-[white] text-[black] w-fit py-[5px] px-[4px] rounded-[10px]"
              >
                Select Time
              </button>
            )}

            <button
              className=" px-[32px] py-[12px] bg-[#27D483] text-[#212121] rounded-[10px] w-fit m-auto hover:-translate-y-2 transition-all duration-300"
              onClick={handleBookFutsal}
            >
              Book Now
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

export default BookingModel;
