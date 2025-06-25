import React from "react";

function MyBooking() {
  return (
    <div className="max-w-[1320px] pt-[40px] px-[10px] md:px-[20px] mx-auto">
      <h2 className="pt-[20px] text-[40px] font-semibold">My Bookings</h2>
      <div className="mt-[60px]">
        <div className="rounded-[10px] bg-[#333333] p-[24px] md:p-[32px]">
          <h1 className="text-[20px] text-[#27D483] font-semibold">
            Name Of Futsal
          </h1>
          <div className="grid md:grid-cols-[3.6fr_1.4fr]">
            <div className="grid  grid-cols-2 gap-[20px] py-[1rem]">
              <p className="text-[16px] font-semibold leading-4">
                Futsal Venue:
                <span className=" font-light ml-[5px]">Lorem ipsum </span>
              </p>
              <p className="text-[16px] font-semibold leading-4">
                Location:
                <span className="font-light ml-[5px]">
                  Madhyapur, Thimi, Bode
                </span>
              </p>
              <p className="text-[16px] font-semibold leading-4">
                Booking Date:
                <span className="font-light ml-[5px]">6/23/2025</span>
              </p>

              <p className="text-[16px] font-semibold leading-4">
                Match Time:
                <span className="font-light ml-[5px]"> 10AM - 11 AM</span>
              </p>
              <p className="text-[16px] font-semibold leading-4">
                Ground Type: <span className="font-light ml-[5px]">5A</span>
              </p>
              <p className="text-[16px] font-semibold leading-4">
                Total Price:{" "}
                <span className="font-light ml-[5px]">Rs 1000</span>
              </p>
            </div>
            <div className="flex md:flex-col lg:flex-row gap-[32px] mt-[5px] md:justify-center">
              <button className="py-[12px] px-[32px] rounded-[10px] bg-[#27D483] text-[#333333] font-medium hover:bg-[#1c945c] hover:-translate-y-[4px] ease-out duration-1000 w-fit h-fit text-nowrap">
                Pay Now
              </button>
              <button className="py-[12px] px-[32px] rounded-[10px] bg-[#E63946] text-[white] font-medium  hover:bg-[#CC0000] hover:-translate-y-[4px] ease-out duration-1000 w-fit h-fit">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBooking;
