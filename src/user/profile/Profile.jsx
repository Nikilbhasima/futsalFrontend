import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import EditForm from "./EditForm";

function Profile() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log("hello everyone");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <section className="pt-[40px] md:px-[20px] max-w-[1320px] m-auto ">
      <div className="pt-[20px] flex sm:justify-between">
        <div>
          <h2 className=" text-[40px] font-semibold">Profile Page</h2>
          <p className="opacity-60">
            Manage your account and track your activities
          </p>
        </div>
        <button
          className="px-[12px] py-[12px]  text-[#27D483] rounded-[10px] w-[9rem] md:w-fit h-fit flex justify-between md:gap-3 hover:bg-[#27D483] hover:text-[#333333] transition-all ease-in-out duration-1000"
          onClick={handleClickOpen}
        >
          Edit Profile
          <FiEdit className="text-[20px]" />
        </button>
      </div>

      {/* <hr class="border-t-2 border-dashed border-[#27D483] my-4" /> */}
      <div className="grid lg:grid-cols-[1fr_2fr] gap-[20px] lg:gap-[32px] col-start-1 mt-4">
        <div className="flex bg-[#333333] relative rounded-[24px] min-h-[10rem] py-[1rem]">
          <img
            src="./images/messi.png"
            className=" rounded-[10px] md:rounded-[10px] h-[10rem] w-[70%] md:h-[70%] md:w-[70%] m-auto object-cover object-top transition  hover:scale-105 ease-in-out duration-300"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-[1rem] bg-[#333333] rounded-[10px] p-[24px]">
          <div>
            <div className="flex justify-between border-b-[1px] border-b-[#27D483] p-[12px] text-[16px]">
              <span className="font-semibold">Username:</span>
              <span className="font-light">Nikil Bhasima</span>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-[#27D483] p-[12px] text-[16px]">
              <span className="font-semibold">Phone Number:</span>
              <span className="font-light">9808029931</span>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-[#27D483] p-[12px] text-[16px]">
              <span className="font-semibold">Email:</span>
              <span className="font-light">nikilbhasima@gmail.com</span>
            </div>
            <div className="flex justify-between border-b-[1px] border-b-[#27D483] p-[12px] text-[16px]">
              <span className="font-semibold">Location:</span>
              <span className="font-light">Madhyapur, Thimi, Pobu</span>
            </div>
          </div>

          <div className="flex justify-between relative">
            <div className="flex flex-col justify-center items-center p-[32px] bg-[#212121] rounded-[10px] w-[30%] hover:-translate-y-2 transition duration-300 ease-in-out">
              <span className="text-[32px] text-center text-[#27D483]">0</span>
              <span className="text-[16px] text-center opacity-60">
                Booking
              </span>
            </div>
            <div className="flex flex-col justify-center items-center  p-[32px] bg-[#212121] rounded-[10px] w-[30%] hover:-translate-y-2 transition duration-300 ease-in-out">
              <span className="text-[32px] text-center text-[#27D483]">0</span>
              <span className="text-[16px] text-center opacity-60">
                Challenge
              </span>
            </div>
            <div className="flex flex-col justify-center items-center  p-[32px] bg-[#212121] rounded-[10px] w-[30%] hover:-translate-y-2 transition duration-300 ease-in-out">
              <span className="text-[32px] text-center text-[#27D483]">0</span>
              <span className="text-[16px] text-center opacity-60">
                Canceled
              </span>
            </div>
          </div>
        </div>
      </div>
      <EditForm open={open} handleClose={handleClose} />
    </section>
  );
}

export default Profile;
