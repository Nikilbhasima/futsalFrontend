import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelFutsalBooking,
  userBookings,
} from "../../redux/bookingSlice/BookingThunks";
import {
  generateFutsalTimeSlots,
  removeSeconds,
} from "../../uitls/TimeSlotGenerator";
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
};
function MyBooking() {
  const [filterMatch, setFilterMatch] = useState("");
  const [navbarStatus, setNavbarStatus] = useState(1);
  const [userBookingList, setUserBookingList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserBooking();
  }, []);

  const getUserBooking = async () => {
    try {
      const response = await dispatch(userBookings("book"));
      setUserBookingList(response.payload);
      console.log("book", response.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const numberOfSlot = (starting, ending) => {
    const data = generateFutsalTimeSlots(starting, ending, 60);
    return data.length;
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [bookindId, setBookingId] = useState(null);

  const cancelBookingById = async (id) => {
    try {
      const response = await dispatch(cancelFutsalBooking(id));
      if (response.meta.requestStatus === "fulfilled") {
        console.log("i wasn't called", response.payload);
        handleClose();
        handleOpen2();
        await getUserBooking();
      }
      console.log("cancelation response:", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-[1320px] pt-[40px] px-[10px] md:px-[20px] mx-auto">
      <h2 className="pt-[20px] text-[40px] font-semibold">My Bookings</h2>
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
            setFilterMatch("completed");
            setNavbarStatus(2);
          }}
        >
          Completed
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
      <div className="mt-[60px]">
        {userBookingList
          .filter((data) => {
            return !filterMatch || data.status === filterMatch;
          })
          .map((data, index) => {
            console.log("checking data:", data);
            return (
              <div
                key={index}
                className="rounded-[10px] bg-[#333333] p-[24px] md:p-[32px] mt-[40px]"
              >
                <h1 className="text-[20px] text-[#27D483] font-semibold"></h1>
                <div className="grid md:grid-cols-[3.6fr_1.4fr]">
                  <div className="grid  grid-cols-2 gap-[20px] py-[1rem]">
                    <p className="text-[16px] font-semibold leading-4">
                      Futsal Venue:
                      <span className=" font-light ml-[5px]">
                        {data?.futsalGroundDTO?.futsalDto?.futsalName}
                      </span>
                    </p>
                    <p className="text-[16px] font-semibold leading-4">
                      Location:
                      <span className="font-light ml-[5px]">
                        {data?.futsalGroundDTO?.futsalDto?.futsalAddress}
                      </span>
                    </p>
                    <p className="text-[16px] font-semibold leading-4">
                      Playing Date:
                      <span className="font-light ml-[5px]">
                        {data?.booking_date}
                      </span>
                    </p>

                    <p className="text-[16px] font-semibold leading-4">
                      Match Time:
                      <span className="font-light ml-[5px]">
                        {data?.starting_time}-{data?.ending_time}
                      </span>
                    </p>
                    <p className="text-[16px] font-semibold leading-4">
                      Ground Type:
                      <span className="font-light ml-[5px]">
                        {data?.futsalGroundDTO?.groundType}
                      </span>
                    </p>
                    <p className="text-[16px] font-semibold leading-4">
                      Total Price:
                      <span className="font-light ml-[5px]">
                        Rs
                        {data?.futsalGroundDTO?.pricePerHour *
                          numberOfSlot(
                            removeSeconds(data?.starting_time),
                            removeSeconds(data?.ending_time)
                          )}
                      </span>
                    </p>
                  </div>
                  {data.status === "pending" && (
                    <div className="flex md:flex-col lg:flex-row gap-[32px] mt-[5px] md:justify-center">
                      <button className="py-[12px] px-[32px] rounded-[10px] bg-[#27D483] text-[#333333] font-medium hover:bg-[#1c945c] hover:-translate-y-[4px] ease-out duration-1000 w-fit h-fit text-nowrap">
                        Pay Now
                      </button>
                      <button
                        className="py-[12px] px-[32px] rounded-[10px] bg-[#E63946] text-[white] font-medium  hover:bg-[#CC0000] hover:-translate-y-[4px] ease-out duration-1000 w-fit h-fit"
                        onClick={() => {
                          handleOpen(true);
                          setBookingId(data.id);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {data.status === "completed" && (
                    <div className="bg-yellow flex justify-center items-center">
                      <h3>Completed</h3>
                    </div>
                  )}
                  {data.status === "cancelled" && (
                    <div className="bg-yellow flex justify-center items-center">
                      <h3 className="text-[#E63946]">Cancelled</h3>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <label className="text-[#27D483]">
            Do you wanna Cancel you Booking
          </label>
          <button
            className="bg-[#27D483] text-[#333333] p-[12px] rounded-[10px] w-fit hover:-translate-y-1 hover:bg-[#1c945c] hover:text-[#FFFFFF] transition-all duration-300"
            onClick={() => cancelBookingById(bookindId)}
          >
            Cancel Booking
          </button>
        </Box>
      </Modal>
      <Modal open={open2} onClose={handleClose2}>
        <Box sx={style}>
          <label className="text-[#27D483]">
            Booking Succcessfully Cancelled!
          </label>
        </Box>
      </Modal>
    </div>
  );
}

export default MyBooking;
