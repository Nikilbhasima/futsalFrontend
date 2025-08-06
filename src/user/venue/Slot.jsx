import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Map, { Source, Layer, Marker } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useDispatch, useSelector } from "react-redux";
import { futsalById } from "../../redux/futsalSlice/FutsalThunks";
import { generateTimeSlots } from "../../uitls/TimeSlotGenerator";
import { CallMerge } from "@mui/icons-material";
import GeoLocationMaping from "../../ReusedComponent/GeoLocationMaping";
import { bookingList } from "../../redux/bookingSlice/BookingThunks";
import TimeSlot from "./TimeSlot";
import BookingModel from "./venueComponent/BookingModel";
import ChallengeModel from "./venueComponent/ChallengeModel";

function Slot() {
  const { success } = useSelector((state) => state.auth);
  const [listOfBookedGround, setListOfBookedGround] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [futsalData, setFutsalData] = useState(null);
  const [futsalList, setFutsalList] = useState([]);
  const { bookingType } = useOutletContext();
  const param = useParams();
  const idData = param.futsalId;
  const [selectDate, setSelectDate] = useState("");
  const [selectGround, setSelectGround] = useState(0);

  // ignor these part
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  // handle change date function
  const handleChangeDate = (e) => {
    const pickedDate = e.target.value;
    setSelectDate(pickedDate);
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    if (pickedDate < formattedDate) {
      alert("Please Select the Valid Date to book Futsal");
      setSelectDate("");
    } else {
      console.log("lets call the api");
      console.log("selected date", pickedDate);
    }
  };

  const [playingTime, setPlayingTime] = useState({
    starting_time: "",
    ending_time: "",
  });

  useEffect(() => {
    getFutsalDataById(idData);
  }, []);

  const getFutsalDataById = async (idData) => {
    try {
      const data = await dispatch(futsalById(idData));
      setFutsalList(data.payload.futsalGroundList);
      setFutsalData(data.payload);
      const today = new Date();
      const localDate = today.toISOString().split("T")[0];
      setSelectDate(localDate);
      const groundId = data?.payload?.futsalGroundList[0]?.id;
      const listOfData = await dispatch(
        bookingList({
          groundId: groundId,
          bookingDate: localDate,
        })
      );
      setListOfBookedGround(listOfData.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListOfBookedGround();
  }, [selectDate, selectGround]);

  const getListOfBookedGround = async () => {
    try {
      const listOfData = await dispatch(
        bookingList({
          groundId: selectGround,
          bookingDate: selectDate,
        })
      );
      setListOfBookedGround(listOfData.payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="pt-[20px] text-[40px] text-[#27D483] font-semibold">
        Choose Slot For Match
      </h2>
      <p className="font-light opacity-50 ">
        Choose preferred date and time to play from the below options
      </p>
      <div>
        <div className="flex justify-between mt-[12px] md:mt-[16px] flex-wrap gap-[1rem]">
          <div className="flex items-center  gap-[12px]">
            <label className="text-[14px] sm:text-[16px]">Selected date:</label>
            <div className="flex ">
              <input
                type="date"
                placeholder="Search"
                value={selectDate}
                name="selectDate"
                onChange={handleChangeDate}
                className="text-[#39908F] border-none  outline-none placeholder:text-[#39908F] bg-white text-[16px] p-[12px] sm:py-[12px] sm:px-[32px] rounded-[10px]   "
              />
            </div>
          </div>

          {/* available Ground */}
          <div className="flex gap-[12px] items-center">
            <label className="text-[14px] sm:text-[16px]">
              Available Ground:
            </label>
            {futsalList?.map((data, index) => {
              return (
                <button
                  key={index}
                  className={` rounded-[10px] p-[10px] text-[12px] sm:p-[12px] hover:-translate-y-2 duration-1000 transition ease-in-out ${
                    selectGround === index
                      ? "bg-[#FACC15] text-[#FFFFFF]"
                      : "bg-[#27D483]"
                  } `}
                  onClick={() => setSelectGround(index)}
                >
                  {data.groundType} Ground
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Available slot of futsal Ground */}
      <div className="mt-[60px] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6  gap-[1rem] sm:gap-[2rem] md:justify-start ">
        <TimeSlot
          success={success}
          bookingType={bookingType}
          handleOpen={handleOpen}
          handleOpen2={handleOpen2}
          setPlayingTime={setPlayingTime}
          futsalData={futsalData}
          futsalList={futsalList}
          listOfBookedGround={listOfBookedGround}
        />
      </div>

      {/* this part is of map */}
      <div className="mt-[60px] mb-[1rem]">
        <h2 className="text-[40px] font-semibold mb-6">Futsal Location</h2>
        <GeoLocationMaping end={[85.314, 27.7056]} />
      </div>
      {/* Booking Modal */}
      <BookingModel
        open={open}
        handleClose={handleClose}
        ground={selectGround}
        groundDetail={futsalList}
        playingTime={playingTime}
        setPlayingTime={setPlayingTime}
        selectDate={selectDate}
        bookingType={bookingType}
      />

      {/* Challenge Modal */}
      <ChallengeModel open2={open2} handleClose2={handleClose2} />
    </div>
  );
}

export default Slot;
