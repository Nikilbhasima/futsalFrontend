import React from "react";
import { IoSearchOutline } from "react-icons/io5";

function BrowseVenue() {
  return (
    <div>
      <h2 className="pt-[20px] text-[40px] font-semibold">
        Search Venue For Match
      </h2>
      <p className="font-light">
        Search venue by its name or location to book futsal fro match
      </p>

      <IoSearchOutline className="text-[#39908F] text-[25px]" />
    </div>
  );
}

export default BrowseVenue;
