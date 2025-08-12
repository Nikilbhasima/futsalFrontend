import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import Futsal from "./Futsal";
import { useDispatch } from "react-redux";
import { futsalList } from "../../redux/futsalSlice/FutsalThunks";

function BrowseVenue() {
  const navigate = useNavigate();
  const { bookingType } = useOutletContext();
  const [filter, setFilter] = useState(true);
  const [futsalListData, setList] = useState([]);
  const [searchByFutsalName, setSearchByFutsalName] = useState("");
  const [groundType, setGroundType] = useState("");

  // fetching futsal list from backend
  const dispatch = useDispatch();
  useEffect(() => {
    getFutsalList();
  }, []);

  const getFutsalList = async () => {
    try {
      const data = await dispatch(futsalList());
      setList(data.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = () => {
    setFilter(!filter);
  };

  return (
    <div>
      <h2 className="pt-[20px] text-[40px] text-[#27D483] font-semibold">
        Search Venue For Match
      </h2>
      <p className="font-light">
        Search venue by its name or location to book futsal fro match
      </p>
      <div className="flex mt-[12px] gap-[12px]">
        <div className="flex ">
          <input
            value={searchByFutsalName}
            name="searchByFutsalName"
            onChange={(e) => setSearchByFutsalName(e.target.value)}
            type="text"
            placeholder="Search"
            className="text-[#39908F] border-none  outline-none placeholder:text-[#39908F] bg-white text-[16px] py-[12px] px-[24px] sm:px-[32px] rounded-l-[10px]  "
          />
          <button className="group bg-white py-[12px] px-[32px] rounded-r-[10px] hover:bg-[#27D483] ease-in transition-all duration-300">
            <IoSearchOutline className="text-[#39908F] text-[25px] group-hover:text-[#212121] " />
          </button>
        </div>
        {/* this part is for sorting and filtering futsal ground */}

        <div className="relative">
          <button
            onClick={handleFilter}
            className="group flex sm:gap-[10px] text-[#39908F] text-[16px] bg-white p-[12px] rounded-[10px] hover:bg-[#27D483] hover:text-[#212121] ease-in transition-all duration-300"
          >
            {/* <GiSettingsKnobs className="text-[#39908F] text-[25px] group-hover:text-[#212121] text-[16px] " /> */}
            Sort & Filter
            <RiArrowDropDownLine
              className={
                filter
                  ? "text-[#39908F] text-[25px] group-hover:text-[#212121] text-[25px] "
                  : "text-[#39908F] text-[25px] group-hover:text-[#212121] text-[25px] rotate-180"
              }
            />
          </button>
          <ul
            role="menu"
            className={`bg-white absolute left-0 w-[130%] md:w-[140%] rounded-[10px] py-[10px] shadow-lg overflow-hidden transition-all duration-300 ease-in-out origin-top z-10 ${
              filter
                ? "opacity-0 scale-y-0 h-0 -translate-y-2 pointer-events-none"
                : "opacity-100 scale-y-100 h-auto translate-y-1 pointer-events-auto"
            }`}
          >
            <span className="text-[black] px-[5px] sm:px-[12] text-[16px] font-bold">
              Filter By
            </span>
            <li className="py-[12px] px-[5px] sm:px-[12]px-[12px] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light">
              Price (Low to High)
            </li>
            <li className="py-[12px] px-[5px] sm:px-[12] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light">
              Rating (Low to High)
            </li>
            <li className="py-[12px] px-[5px] sm:px-[12] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light">
              Rating (High to Low)
            </li>
            <span className="text-[black] py-[12px] px-[5px] sm:px-[12] text-[16px] font-bold">
              Filter By Ground
            </span>
            <li
              className="py-[12px] px-[5px] sm:px-[12] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light"
              onClick={() => setGroundType("5A")}
            >
              5A Ground
            </li>
            <li
              className="py-[12px] px-[5px] sm:px-[12] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light"
              onClick={() => setGroundType("7A")}
            >
              7A Ground
            </li>
          </ul>
        </div>
        {/* end of sorting and filtering */}
      </div>
      <div className="mt-[60px] flex flex-col gap-[32px]">
        {futsalListData
          ?.filter((data) => {
            // Match search by name or address
            const matchesSearch =
              data.futsalName
                ?.toLowerCase()
                .includes(searchByFutsalName.toLowerCase()) ||
              data.futsalAddress
                ?.toLowerCase()
                .includes(searchByFutsalName.toLowerCase());

            // Match ground type (check first element in futsalGroundList)
            const matchesGround =
              groundType === "" ||
              data.futsalGroundList?.some(
                (ground) => ground.groundType?.toUpperCase() === groundType
              );

            return matchesSearch && matchesGround;
          })
          ?.map((data, index) => {
            console.log("futsal data:", data);
            return <Futsal bookingType={bookingType} key={index} data={data} />;
          })}
      </div>
    </div>
  );
}

export default BrowseVenue;
