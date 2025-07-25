import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

function Venue() {
  const param = useParams();
  const bookingType = param.bookingType;
  console.log("form venue", bookingType);
  return (
    <>
      <div className="pt-[40px] px-[5px]  md:px-[20px] max-w-[1320px] m-auto ">
        <div>
          <ul className="flex flex-cols gap-[32px] ">
            <li>
              <NavLink
                className="navbar-list"
                to={`/venue/${bookingType}/browse`}
              >
                Browse Match
              </NavLink>
            </li>

            <li>
              <NavLink className="navbar-list" to="match">
                Play Match
              </NavLink>
            </li>
          </ul>
        </div>

        <Outlet context={{ bookingType }} />
      </div>
    </>
  );
}

export default Venue;
