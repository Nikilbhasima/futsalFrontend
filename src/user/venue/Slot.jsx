import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#333333",
  border: "2px solid #000",
  boxShadow: 24,
  p: "32px",
  borderRadius: "10px",
};
function Slot() {
  const [selectDate, setSelectDate] = useState("");
  const navigate = useNavigate();
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

  // this is model part
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <h2 className="pt-[20px] text-[40px] font-semibold">
        Search Venue For Match
      </h2>
      <p className="font-light ">
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
          onClick={handleOpen}
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
            <div className="grid gap-[20px]">
              <p>Futsal Name:</p>
              <p>Booking Date:</p>
              <p>Futsal Venue:</p>
              <p>Match Time:</p>
              <p>Ground Type:</p>
              <p>Total Price:</p>
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
