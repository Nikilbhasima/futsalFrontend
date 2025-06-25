import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Venue() {
  return (
    <>
      <div className="pt-[40px] px-[20px] max-w-[1320px] m-auto ">
        <div>
          <ul className="flex flex-cols gap-[32px] ">
            <li>
              <NavLink className="navbar-list" to="browse">
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

        <Outlet />
      </div>
    </>
  );
}

export default Venue;
