import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const bookingList = [
  {
    id: 1,
    futsalVenue: "Bode Futsal",
    location: "Madhyapur, Thimi, Bode",
    bookingDate: "2025-23-6",
    matchTime: "10AM-11AM",
    groundType: "5A",
    totalPrice: 1000,
    status: "pending",
  },
  {
    id: 2,
    futsalVenue: "Kumari Futsal",
    location: "Kathmandu Thamel",
    bookingDate: "2025-23-6",
    matchTime: "10AM-11AM",
    groundType: "7A",
    totalPrice: 2000,
    status: "completed",
  },
  {
    id: 3,
    futsalVenue: "Propotional Futsal",
    location: "Madhyapur, Thimi, Gathaghar",
    bookingDate: "2025-23-6",
    matchTime: "10AM-11AM",
    groundType: "5A",
    totalPrice: 900,
    status: "completed",
  },
];
function MyBooking() {
  const [filterMatch, setFilterMatch] = useState("");
  const [navbarStatus, setNavbarStatus] = useState(1);
  const navigate = useNavigate();
  const { jwt } = useSelector((state) => state.auth);
  console.log("check value:", jwt);

  useEffect(() => {
    if (jwt === null) {
      navigate("/");
    }
  }, [jwt]);

  console.log(navbarStatus);
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
        {bookingList
          .filter((data) => {
            return !filterMatch || data.status === filterMatch;
          })
          .map((data, index) => {
            return (
              <div
                key={index}
                className="rounded-[10px] bg-[#333333] p-[24px] md:p-[32px] mt-[40px]"
              >
                <h1 className="text-[20px] text-[#27D483] font-semibold">
                  {data.futsalVenue}
                </h1>
                <div className="grid md:grid-cols-[3.6fr_1.4fr]">
                  <div className="grid  grid-cols-2 gap-[20px] py-[1rem]">
                    <p className="text-[16px] font-semibold leading-4">
                      Futsal Venue:
                      <span className=" font-light ml-[5px]">
                        {data.futsalVenue}
                      </span>
                    </p>
                    <p className="text-[16px] font-semibold leading-4">
                      Location:
                      <span className="font-light ml-[5px]">
                        {data.location}
                      </span>
                    </p>
                    <p className="text-[16px] font-semibold leading-4">
                      Booking Date:
                      <span className="font-light ml-[5px]">
                        {data.bookingDate}
                      </span>
                    </p>

                    <p className="text-[16px] font-semibold leading-4">
                      Match Time:
                      <span className="font-light ml-[5px]">
                        {data.matchTime}
                      </span>
                    </p>
                    <p className="text-[16px] font-semibold leading-4">
                      Ground Type:
                      <span className="font-light ml-[5px]">
                        {data.groundType}
                      </span>
                    </p>
                    <p className="text-[16px] font-semibold leading-4">
                      Total Price:
                      <span className="font-light ml-[5px]">
                        Rs {data.totalPrice}
                      </span>
                    </p>
                  </div>
                  {data.status != "completed" ? (
                    <div className="flex md:flex-col lg:flex-row gap-[32px] mt-[5px] md:justify-center">
                      <button className="py-[12px] px-[32px] rounded-[10px] bg-[#27D483] text-[#333333] font-medium hover:bg-[#1c945c] hover:-translate-y-[4px] ease-out duration-1000 w-fit h-fit text-nowrap">
                        Pay Now
                      </button>
                      <button className="py-[12px] px-[32px] rounded-[10px] bg-[#E63946] text-[white] font-medium  hover:bg-[#CC0000] hover:-translate-y-[4px] ease-out duration-1000 w-fit h-fit">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="bg-yellow flex justify-center items-center">
                      <h3>Completed</h3>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MyBooking;
