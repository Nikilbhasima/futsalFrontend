import React, { useEffect, useState } from "react";
import {
  generateTimeSlots,
  isValidLocalTime,
} from "../../uitls/TimeSlotGenerator";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { bookGround } from "../../redux/bookingSlice/BookingThunks";
import { Color } from "maplibre-gl";
import { useDispatch } from "react-redux";
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
function AdminTimeSlot({
  futsalData,
  success,
  bookingType,
  bookingList,
  selectDate,
  groundId,
  getListOfBookings,
}) {
  const dispatch = useDispatch();
  const [numberOfSlot, setNumberOfSlot] = useState(0);
  const [slot, setSlot] = useState([]);
  const [bookingModal, setBookingModal] = useState(false);
  const viewBookingModal = () => setBookingModal(true);
  const hideBookingModal = () => setBookingModal(false);

  const [messageModal, setMessageModal] = useState(false);
  const viewMessageModal = () => setMessageModal(true);
  const hideMessageModal = () => setMessageModal(false);

  let groundDetail = futsalData?.futsalGroundList?.find(
    (data) => data.id === groundId
  );

  const [playingTime, setPlayingTime] = useState({
    starting_time: "",
    ending_time: "",
  });
  useEffect(() => {
    if (futsalData != null) {
      const slot = generateTimeSlots(
        futsalData?.futsalOpeningHours,
        futsalData?.futsalClosingHours,
        60
      );
      setSlot(slot);
    }
  }, [bookingList]);

  const isSlotBooked = (slotStartTime, slotEndTime) => {
    const now = new Date();
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
    const today = new Date().toISOString().split("T")[0];
    if (bookingList?.length != 0) {
      for (let booking of bookingList) {
        const bookingStart = booking?.starting_time.substring(0, 5);
        const bookingEnd = booking?.ending_time.substring(0, 5);
        if (
          (today === selectDate && slotStartTime < formattedTime) ||
          (bookingStart === slotStartTime && bookingEnd === slotEndTime)
        ) {
          return true;
        }
      }
    } else if (today === selectDate && slotStartTime < formattedTime) {
      return true;
    } else {
      return false;
    }
  };

  const findNumberOFBooking = () => {
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
  };
  const handleBookFutsal = async () => {
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
        await getListOfBookings();
        viewMessageModal();
        hideBookingModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <>
      {slot.map((data, index) => {
        const isBooked = isSlotBooked(data.startTime, data.endTime);

        return (
          <div
            key={index}
            className={`bg-[#333333] rounded-[10px] text-[12px] sm:text-[14px] p-[12px] sm:px-[12px] sm:py-[16px] max-w-[8rem] sm:max-w-[9rem]   ${
              isBooked
                ? "bg-red-500 text-white cursor-not-allowed"
                : "bg-[#27D483] text-white  cursor-pointer hover:bg-[#27D483] hover:text-[#333333] ease-in duration-300"
            }`}
            onClick={() => {
              if (success && !isBooked) {
                bookingType === "book" && viewBookingModal();
              }
              setPlayingTime({
                starting_time: data.startTime,
                ending_time: data.endTime,
              });
              findNumberOFBooking();
            }}
          >
            {data.startTimeDisplay}-{data.endTimeDisplay}
          </div>
        );
      })}
      <Modal open={bookingModal} onClose={hideBookingModal}>
        <Box sx={style}>
          <div className="grid gap-[32px]">
            <h1 className="text-[#27D483] text-center text-[25px] font-semibold">
              Match Detail
            </h1>

            <div className="grid gap-[15px]">
              <div className="flex justify-between">
                <span className="text-[16px] font-medium">Match Price:</span>
                <span className="font-thin">
                  Rs{groundDetail?.pricePerHour}
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
                <span className="font-thin">{groundDetail?.groundType}</span>
              </div>
              <div className="h-[2px] w-full bg-[#27D483] rounded-[10px]"></div>
              <div className="flex justify-between">
                <span className="text-[16px] font-medium">Total Price:</span>
                <span className="font-thin">
                  Rs{numberOfSlot * groundDetail?.pricePerHour}
                </span>
              </div>
            </div>

            <button
              className=" px-[32px] py-[12px] bg-[#27D483] text-[#212121] rounded-[10px] w-fit m-auto hover:-translate-y-2 transition-all duration-300"
              onClick={handleBookFutsal}
            >
              Book Now
            </button>
          </div>
        </Box>
      </Modal>
      <Modal open={messageModal} onClose={hideMessageModal}>
        <Box sx={{ ...style, color: "#27D483" }}>Booking Successfull!</Box>
      </Modal>
    </>
  );
}

export default AdminTimeSlot;
