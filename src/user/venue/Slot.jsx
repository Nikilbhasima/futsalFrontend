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

function Slot() {
  const { success } = useSelector((state) => state.auth);
  const [listOfBookedGround, setListOfBookedGround] = useState([]);
  const [Custome, handleCustome] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [futsalData, setFutsalData] = useState(null);
  const [futsalList, setFutsalList] = useState([]);
  const [slot, setSlot] = useState([]);
  const { bookingType } = useOutletContext();
  const param = useParams();
  const idData = param.futsalId;
  const [selectDate, setSelectDate] = useState("");
  const [time, setTime] = useState({
    starting: "",
    ending: "",
  });

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

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTime((pre) => ({ ...pre, [name]: value }));
  };
  // this is model part
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  // this is end for model part

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
  // generating time slot
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

  // compare time
  const isSlotBooked = (slotStartTime, slotEndTime) => {
    for (let booking of listOfBookedGround) {
      const bookingStart = booking.starting_time.substring(0, 5);
      const bookingEnd = booking.ending_time.substring(0, 5);

      if (bookingStart === slotStartTime && bookingEnd === slotEndTime) {
        return true;
      }
    }
    return false;
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
                  className={`bg-[#27D483] rounded-[10px] p-[10px] text-[12px] sm:p-[12px] hover:-translate-y-2 duration-1000 transition ease-in-out `}
                >
                  {data.groundType} Ground
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* avaible slot of futsal Ground */}
      <div className="mt-[60px] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6  gap-[1rem] sm:gap-[2rem] md:justify-start ">
        {slot.map((data, index) => {
          return (
            <div
              key={index}
              className={`bg-[#333333] rounded-[10px] text-[12px] sm:text-[14px] p-[12px] sm:px-[12px] sm-py-[16px]  max-w-[8rem]  sm:max-w-[9rem] hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000 ${
                isSlotBooked(data.startTime, data.endTime)
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : "bg-[#27D483] text-white hover:bg-green-600"
              }`}
              onClick={() => {
                if (success) {
                  if (!isSlotBooked(data.startTime, data.endTime)) {
                    bookingType == "book" ? handleOpen() : handleOpen2();
                  }
                }
              }}
            >
              {data.startTimeDisplay}-{data.endTimeDisplay}
            </div>
          );
        })}
      </div>

      {/* this part is of map */}
      <div className="mt-[60px] mb-[1rem]">
        <h2 className="text-[40px] font-semibold mb-6">Futsal Location</h2>

        <GeoLocationMaping end={[85.314, 27.7056]} />
      </div>
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
                  <span className="font-thin">Rs 1000</span>
                </div>

                <div className="h-[2px] w-full bg-[#27D483] rounded-[10px]"></div>

                <div className="flex justify-between">
                  <span className="text-[16px] font-medium">Match Time:</span>
                  <span className="font-thin">10AM - 11AM</span>
                </div>
                <div className="h-[2px] w-full bg-[#27D483] rounded-[10px]"></div>

                <div className="flex justify-between">
                  <span className="text-[16px] font-medium">Ground Type:</span>
                  <span className="font-thin">5A</span>
                </div>
                <div className="h-[2px] w-full bg-[#27D483] rounded-[10px]"></div>

                <div className="flex justify-between">
                  <span className="text-[16px] font-medium">Total Price:</span>
                  <span className="font-thin">Rs 1000</span>
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
                  />
                </div>

                <div className="flex flex-col gap-[10px]">
                  <label className="opacity-50">Ending</label>
                  <input
                    type="time"
                    className="bg-[white] text-[black] text-[16px] py-[10px] px-[16px] rounded-[10px]"
                    value={time.ending}
                    name="ending"
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
              className=" px-[32px] py-[12px] bg-[#27D483] text-[#212121] rounded-[10px] w-fit m-auto"
              onClick={() => navigate("/bookings")}
            >
              Book Now
            </button>
          </div>
        </Box>
      </Modal>
      {/* this is for challenge */}
      <Modal open={open2} onClose={handleClose2}>
        <Box sx={style}>
          <div className="grid gap-[32px]">
            <h1 className="text-[#27D483] text-center text-[25px] font-semibold">
              Inviter Detail
            </h1>
            <div className="grid gap-[20px]">
              <div className="flex justify-between">
                <span className="text-[16px] font-medium">Inviter Name:</span>
                <span className="font-thin">Nikil Bhasima</span>
              </div>
              <div className="h-[2px] w-full bg-[#27D483] "></div>
              <div className="flex justify-between">
                <span className="text-[16px] font-medium">Team Format:</span>
                <span className="font-thin">5A</span>
              </div>

              <div className="h-[2px] w-full bg-[#27D483] "></div>
              <div className="grid grid-cols-[1fr_1fr]  items-center">
                <span className="text-[16px] font-medium ">Add Phone:</span>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full py-[10px] px-[24px] bg-[white] text-[#333333] rounded-[5px] border-none outline-none "
                />
              </div>
              <div className="h-[2px] w-full bg-[#27D483] "></div>
              <div className="grid grid-cols-[1fr_1fr]  items-center">
                <p className="">Payment Type:</p>
                <select
                  name=""
                  id=""
                  className="py-[10px] px-[24px] bg-[white] text-[#333333] rounded-[5px] border-none outline-none "
                >
                  <option value="5v5">50-50</option>
                  <option value="5v5">60-40</option>
                  <option value="5v5">70-30</option>
                </select>
              </div>
            </div>
            <button
              className=" px-[32px] py-[12px] bg-[#27D483] text-[#212121] rounded-[10px] w-fit m-auto"
              onClick={() => navigate("/bookings")}
            >
              Challenge
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Slot;
