import React, { useCallback, useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import BookingDetail from "./BookingDetail";
import { useDispatch } from "react-redux";
import { getGroundList } from "../../redux/ground/GroundThunks";
import { bookingList } from "../../redux/bookingSlice/BookingThunks";

function Booking() {
  const dispatch = useDispatch();
  const [selectDate, setSelectDate] = useState("");
  const [filter, setFilter] = useState(true);
  const [groundId, setGroundId] = useState(null);
  const [buttonId, setButtonId] = useState(0);
  const [listOfBookings, setListOfBookings] = useState([]);
  const [listOfGround, setListOfGround] = useState([]);
  const [bookingStatus, setBookingStatus] = useState();

  const getOfFutsalGround = async () => {
    try {
      const response = await dispatch(getGroundList());
      if (response.meta.requestStatus != "rejected") {
        setListOfGround(response.payload);
        setGroundId(response?.payload?.[0]?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeDate = (e) => {
    const pickedDate = e.target.value;
    setSelectDate(pickedDate);
  };
  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };
  const getListOfBookings = useCallback(async () => {
    try {
      if (groundId != null) {
        const response = await dispatch(
          bookingList({
            groundId: groundId,
            bookingDate: selectDate,
          })
        );
        if (response.meta.requestStatus === "fulfilled") {
          setListOfBookings(response.payload);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, groundId, selectDate]);

  useEffect(() => {
    getListOfBookings();
  }, [getListOfBookings]);

  useEffect(() => {
    setSelectDate(getCurrentDate());
    getOfFutsalGround();
  }, []);

  return (
    <div>
      <h2 className="pt-[20px] text-[40px] text-[#27D483] font-semibold">
        Bookings
      </h2>
      <div className="flex justify-between mt-[12px] md:mt-[16px] ">
        <div className="flex gap-[12px] ">
          <div className="flex items-center gap-[12px]">
            <label className="text-[14px] sm:text-[16px]">Selected date:</label>
            <input
              type="date"
              placeholder="Search"
              value={selectDate}
              name="selectDate"
              onChange={handleChangeDate}
              className="text-[#39908F] border-none outline-none placeholder:text-[#39908F] bg-white text-[16px] p-[12px] sm:py-[12px] sm:px-[32px] rounded-[10px]"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setFilter(!filter)}
              className="group flex sm:gap-[10px] text-[#39908F] text-[16px] bg-white p-[12px] rounded-[10px] hover:bg-[#27D483] hover:text-[#212121] ease-in transition-all duration-300"
            >
              {/* <GiSettingsKnobs className="text-[#39908F] text-[25px] group-hover:text-[#212121] text-[16px] " /> */}
              Filter
              <RiArrowDropDownLine
                className={
                  filter
                    ? "text-[#39908F] text-[25px] group-hover:text-[#212121] text-[25px] "
                    : "text-[#39908F] text-[25px] group-hover:text-[#212121] text-[25px] rotate-180"
                }
              />
            </button>
            <ul
              role="menu"
              className={`bg-white absolute left-0 w-[130%] md:w-[140%] rounded-[10px] py-[10px] shadow-lg overflow-hidden transition-all duration-300 ease-in-out origin-top z-10 ${
                filter
                  ? "opacity-0 scale-y-0 h-0 -translate-y-2 pointer-events-none"
                  : "opacity-100 scale-y-100 h-auto translate-y-1 pointer-events-auto"
              }`}
            >
              <li
                onClick={() => setBookingStatus("")}
                className="py-[12px] px-[5px] sm:px-[12]px-[12px] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light"
              >
                show All
              </li>
              <li
                onClick={() => setBookingStatus("completed")}
                className="py-[12px] px-[5px] sm:px-[12]px-[12px] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light"
              >
                Completed
              </li>
              <li
                onClick={() => setBookingStatus("pending")}
                className="py-[12px] px-[5px] sm:px-[12] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light"
              >
                Pending
              </li>
              <li
                onClick={() => setBookingStatus("playing")}
                className="py-[12px] px-[5px] sm:px-[12] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light"
              >
                Playing
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-[1rem]">
          <label className="text-[14px] sm:text-[16px]">
            Available Ground:
          </label>
          <div className="flex gap-[12px]">
            {listOfGround.map((data, index) => {
              return (
                <button
                  onClick={() => {
                    setButtonId(index);
                    setGroundId(data?.id);
                  }}
                  className={`rounded-[10px] p-[10px] sm:text-[12px] text-[16px] sm:py-[12px] sm:px-[32px] hover:-translate-y-1 duration-300 transition ease-in-out  ${
                    index === buttonId
                      ? "bg-[#FACC15] text-[#FFFFFF]"
                      : "bg-[#27D483] text-white"
                  }`}
                  key={index}
                >
                  {data.groundType}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        {listOfBookings
          ?.filter((data) => {
            if (!bookingStatus) return true;
            return data?.status === bookingStatus;
          })
          .map((data, index) => {
            return (
              <BookingDetail
                key={index}
                data={data}
                getListOfBookings={getListOfBookings}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Booking;
