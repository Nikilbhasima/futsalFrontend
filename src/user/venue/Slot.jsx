import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "#333333",
  border: "2px solid #000",
  boxShadow: 24,
  p: "32px",
  borderRadius: "10px",
};
function Slot() {
  const { bookingType } = useOutletContext();
  console.log("this is booking type", bookingType);
  const [selectDate, setSelectDate] = useState("");
  const [time, setTime] = useState({
    starting: "",
    ending: "",
  });
  const navigate = useNavigate();

  // handle change date function
  const handleChangeDate = (e) => {
    const pickedDate = e.target.value;
    setSelectDate(pickedDate);
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    console.log(selectDate);
    if (pickedDate < formattedDate) {
      alert("Please Select the Valid Date to book Futsal");
      setSelectDate("");
    } else {
      console.log("lets call the api");
      console.log("selected date", pickedDate);
    }
  };

  const handleTimeChange = (e) => {
    const [name, value] = e.target;
    setTime((pre) => ({ ...pre, [name]: value }));
    console.log(name, value);
  };
  // this is model part
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // this is for challenge
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [Custome, handleCustome] = useState(true);

  return (
    <div>
      <h2 className="pt-[20px] text-[40px] font-semibold">
        Search Venue For Match
      </h2>
      <p className="font-light opacity-50 ">
        Choose preferred date and time to play from the below options
      </p>
      <div className="flex items-center mt-[12px] md:mt-[16px] gap-[12px]">
        <p>Selected date:</p>
        <div className="flex ">
          <input
            type="date"
            placeholder="Search"
            value={selectDate}
            name="selectDate"
            onChange={handleChangeDate}
            className="text-[#39908F] border-none  outline-none placeholder:text-[#39908F] bg-white text-[16px] py-[12px] px-[32px] rounded-[10px]   "
          />
        </div>
      </div>
      <div className="mt-[60px]  flex md:gap-[20px] gap-[10px]  md:justify-start flex-wrap">
        <div
          className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000"
          onClick={bookingType == "book" ? handleOpen : handleOpen2}
        >
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
      </div>
      <div className="mt-[60px]">
        <h2 className="text-[40px] font-semibold">Futsal Location</h2>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="grid gap-[32px]">
            <h1 className="text-[#27D483] text-center text-[25px] font-semibold">
              Match Detail
            </h1>
            {Custome ? (
              <div className="grid gap-[20px]">
                <p>
                  Match Price:<span className="ml-[5px]">Rs 1000</span>
                </p>
                <p>
                  Match Time:<span className="ml-[5px]">10AM - 11AM</span>
                </p>
                <p>
                  Ground Type: <span className="ml-[5px]">5A</span>
                </p>
                <p>
                  Total Price: <span className="ml-[5px]">Rs1000</span>
                </p>
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
              <div className="grid grid-cols-[1fr_2fr]  items-center">
                <p>Inviter Name:</p>
                <input
                  className="py-[10px] px-[24px] bg-[white] text-[#333333] rounded-[5px] border-none outline-none"
                  type="text"
                  placeholder="Inviter Name"
                />
              </div>
              <div className="grid grid-cols-[1fr_2fr]  items-center">
                <p>Phone:</p>{" "}
                <input
                  className="py-[10px] px-[24px] bg-[white] text-[#333333] rounded-[5px] border-none outline-none"
                  type="text"
                  placeholder="Phone Number"
                />
              </div>

              <div className="grid grid-cols-[1fr_2fr]  items-center">
                <p>Team Format:</p>
                <select
                  name=""
                  id=""
                  className="py-[10px] px-[24px] bg-[white] text-[#333333] rounded-[5px] border-none outline-none  "
                >
                  <option value="5v5">5v5</option>
                </select>
              </div>
              <div className="grid grid-cols-[1fr_2fr]  items-center">
                <p>Payment Type:</p>
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
              Book Now
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Slot;
