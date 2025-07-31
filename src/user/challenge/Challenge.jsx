import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { GiSoccerKick } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const matchDetail = [
  {
    id: 1,
    name: "Nikil Bhasima",
    phone: "9808029931",
    date: "2025-07-15",
    time: "6:00PM",
    venue: "kathamdu Futsal",
    teamFromat: "5A",
    payment: "50-50",
    status: "pending",
    request: "me",
    acceptedDate: null,
    acceptedTime: null,
    opponent: null,
  },

  {
    id: 2,
    name: "Nikil Bhasima",
    phone: "9808029990",
    date: "2025-07-15",
    time: "6:00PM",
    venue: "Bode Futsal",
    teamFromat: "5A",
    payment: "70-30",
    status: "playing",
    request: "me",
    acceptedDate: "2025-07-15",
    acceptedTime: "10:30AM",
    oppnent: "Bikal Rai",
  },
  {
    id: 3,
    name: "Saurav Prajapati",
    phone: "9808029990",
    date: "2025-07-15",
    time: "6:00PM",
    venue: "Bode Futsal",
    teamFromat: "5A",
    payment: "50-50",
    status: "played",
    request: "opponent",
    acceptedDate: "2025-07-15",
    acceptedTime: "10:30AM",
    oppnent: "Nikil Bhasima",
  },
];
function Challenge() {
  const [filterMatch, setFilterMatch] = useState("");
  const [navbarStatus, setNavbarStatus] = useState(1);
  const navigate = useNavigate();
  const { jwt } = useSelector((state) => state.auth);
  console.log("check values:", jwt);

  useEffect(() => {
    if (jwt === null) {
      navigate("/");
    }
  }, [jwt]);

  return (
    <div className="max-w-[1320px] pt-[40px] md:px-[20px] mx-auto">
      <h2 className="pt-[20px] text-[40px] font-semibold">My Challenges</h2>
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
            setFilterMatch("playing");
            setNavbarStatus(2);
          }}
        >
          Accepted
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

      {matchDetail
        .filter((data) => {
          if (filterMatch === "pending") {
            return data.status === "pending";
          }
          if (filterMatch === "playing") {
            return data.status === "playing";
          }
          if (!filterMatch) {
            return true;
          }
        })
        .map((data, index) => {
          return (
            <div
              key={index}
              className=" mt-[40px] bg-[#333333] p-[1rem] rounded-[10px] flex flex-col gap-4"
            >
              {/* this is user information */}
              <div className="flex items-center ">
                {false ? (
                  <IoPersonCircleOutline className="text-[5rem]" />
                ) : (
                  <div className="bg-[url(/images/messi.png)] w-[6rem] h-[6rem] bg-cover bg-no-repeat rounded-[50%]"></div>
                )}
                <div className="ml-[12px] ">
                  <p className="font-normal text-[20px]">{data.name}</p>
                  <p className="flex justify-start justify-center items-center gap-2 font-light">
                    <MdOutlineLocalPhone className="text-[20px] text-[#27D483] " />
                    {data.phone}
                  </p>
                </div>
                {data.status != "played" && (
                  <div className="ml-auto flex flex-row gap-2">
                    <button className="ml-auto bg-[#E63946] hover:bg-[#CC0000] ease-out duration-1000  font-medium ml-[20px] text-[white] rounded-[10px] flex items-center gap-[5px] py-[12px] px-[12px] md:px-[32px] h-fit w-fit text-[14px] hover:-translate-y-[4px] ease-out duration-1000">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {/* match detail */}
              <div className="flex flex-col gap-4 px-[1rem]">
                <div>
                  <div class="flex items-center space-x-3  font-medium">
                    <span>
                      <MdOutlineDateRange className="text-[#27D483]" />
                    </span>
                    <span>
                      {data.date} at {data.time}
                    </span>
                  </div>
                  <div class="flex items-center space-x-3 font-medium ">
                    <span>
                      <IoLocation className="text-[#27D483]" />
                    </span>
                    <span>{data.venue}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <strong>Team Format:</strong> {data.teamFromat}
                  </div>
                  <div>
                    <strong>Payment:</strong> {data.payment}
                  </div>
                </div>
                {data.status === "pending" ? (
                  <div className="border-[2px] border-[#27D483] rounded-[10px] p-[1rem] bg-[#212121]">
                    <div>
                      <strong className="mr-[12px]">Sent:</strong>
                      2025-07-14 10:30 AM
                    </div>
                    <div>
                      <strong className="mr-[12px]">Opponent:</strong>
                      Waiting for opponent's response...
                    </div>
                  </div>
                ) : (
                  <div className="border-[2px] border-[#27D483] rounded-[10px] p-[1rem] bg-[#212121]">
                    <div>
                      <strong className="mr-[12px]">Accepted:</strong>
                      {data.acceptedDate} {data.acceptedTime}
                    </div>
                    <div>
                      <strong className="mr-[12px]">Opponent:</strong>
                      {data.oppnent}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Challenge;
