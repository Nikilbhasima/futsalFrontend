import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroundList } from "../../redux/ground/GroundThunks";
import { ownerFutsal } from "../../redux/createFutsal/CreateFutsalThunks";
import TimeSlot from "../../user/venue/TimeSlot";
import AdminTimeSlot from "./AdminTimeSlot";
import { bookingList } from "../../redux/bookingSlice/BookingThunks";

function Match() {
  const [selectDate, setSelectDate] = useState("");
  const [listOfGround, setListOfGround] = useState([]);
  const [groundId, setGroundId] = useState(null);
  const [buttonId, setButtonId] = useState(0);
  // const [futsalDetail, setFutsalDetail] = useState();
  const [futsalData, setFutsalData] = useState(null);
  const [bookingLists, setBookingList] = useState([]);

  const { success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // selecting playing time
  const [playingTime, setPlayingTime] = useState({
    starting_time: "",
    ending_time: "",
  });

  const handleChangeDate = (e) => {
    const pickedDate = e.target.value;
    setSelectDate(pickedDate);
  };
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
  const getFutsalDetail = async () => {
    const response = await dispatch(ownerFutsal());
    if (response.meta.requestStatus === "fulfilled") {
      setFutsalData(response.payload);
    }
  };
  const getListOfBookings = async () => {
    try {
      if (groundId != null) {
        const response = await dispatch(
          bookingList({
            groundId: groundId,
            bookingDate: selectDate,
          })
        );
        if (response.meta.requestStatus === "fulfilled") {
          setBookingList(response.payload);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectDate(today);
    getOfFutsalGround();
    getFutsalDetail();
  }, []);

  useEffect(() => {
    getListOfBookings();
  }, [selectDate, groundId]);

  return (
    <div>
      <h2 className="text-primary text-[40px] font-semibold">Book Futsal</h2>
      <section className="flex  justify-between mt-[32px]">
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
      </section>
      <section className="mt-[60px] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-[1rem] sm:gap-[2rem] md:justify-start  min-h-[10rem]">
        <AdminTimeSlot
          futsalData={futsalData}
          success={success}
          bookingType="book"
          bookingList={bookingLists}
          selectDate={selectDate}
          groundId={groundId}
          getListOfBookings={getListOfBookings}
        />
      </section>
    </div>
  );
}

export default Match;
