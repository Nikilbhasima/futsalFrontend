import React, { useEffect, useState } from "react";
import { generateTimeSlots } from "../../uitls/TimeSlotGenerator";

function TimeSlot({
  success,
  bookingType,
  handleOpen,
  handleOpen2,
  setPlayingTime,
  futsalData,
  futsalList,
  listOfBookedGround,
}) {
  const [slot, setSlot] = useState([]);
  useEffect(() => {
    if (futsalData != null) {
      const slot = generateTimeSlots(
        futsalData?.futsalOpeningHours,
        futsalData?.futsalClosingHours,
        60
      );
      setSlot(slot);
    }
  }, [futsalList]);

  const isSlotBooked = (slotStartTime, slotEndTime) => {
    if (listOfBookedGround?.length != 0) {
      for (let booking of listOfBookedGround) {
        const bookingStart = booking?.starting_time.substring(0, 5);
        const bookingEnd = booking?.ending_time.substring(0, 5);

        if (bookingStart === slotStartTime && bookingEnd === slotEndTime) {
          return true;
        }
      }
    }

    return false;
  };
  console.log("time slot are:", slot);
  return (
    <>
      {slot.map((data, index) => {
        const isBooked = isSlotBooked(data.startTime, data.endTime);

        return (
          <div
            key={index}
            className={`bg-[#333333] rounded-[10px] text-[12px] sm:text-[14px] p-[12px] sm:px-[12px] sm:py-[16px] max-w-[8rem] sm:max-w-[9rem]  ${
              isBooked
                ? "bg-red-500 text-white cursor-not-allowed"
                : "bg-[#27D483] text-white  cursor-pointer hover:bg-[#27D483] hover:text-[#333333] ease-in duration-300"
            }`}
            onClick={() => {
              if (success && !isBooked) {
                bookingType === "book" ? handleOpen() : handleOpen2();
              }
              setPlayingTime({
                starting_time: data.startTime,
                ending_time: data.endTime,
              });
            }}
          >
            {data.startTimeDisplay}-{data.endTimeDisplay}
          </div>
        );
      })}
    </>
  );
}

export default TimeSlot;
