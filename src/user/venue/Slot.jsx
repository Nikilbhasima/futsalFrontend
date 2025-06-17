import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
function Slot() {
  const [selectDate, setSelectDate] = useState("");
  const handleChangeDate = (e) => {
    const pickedDate = e.target.value;
    setSelectDate(pickedDate);
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    console.log(selectDate);
    if (pickedDate < formattedDate) {
      alert("Please Select the Valid Date to book Futsal");
    } else {
      console.log("lets call the api");
      console.log("selected date", pickedDate);
    }
  };
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
        <div className="bg-[#333333] rounded-[10px] py-[12px] px-[32px] w-fit hover:bg-[#27D483] hover:text-[#333333] ease-in duration-1000">
          00AM-00PM
        </div>
      </div>
      <div className="mt-[60px]">
        <h2 className="text-[40px] font-semibold">Futsal Location</h2>
      </div>
    </div>
  );
}

export default Slot;
