import { NavLink, useNavigate } from "react-router-dom";
import "./adminNavbar.css";
import { IoLogOut } from "react-icons/io5";
import { mainNavList, secNavList } from "../codeReducer/codeReducer";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice/AuthSlice";
import { RiArrowDropRightLine } from "react-icons/ri";
import { useState } from "react";

function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navbarExpane, setNavbarExpand] = useState(false);

  return (
    <div
      className={`flex flex-col items-start justify-between h-full bg-tertary relative 
        transition-all duration-500 ease-in-out p-[32px]
        ${!navbarExpane ? "w-full " : "w-[7rem] "}`}
    >
      {/* Toggle Arrow */}
      <div
        className={`absolute bg-primary rounded-[10px] -right-2 top-10 cursor-pointer 
          transition-transform duration-500 ease-in-out 
          ${navbarExpane ? "rotate-180" : ""}`}
        onClick={() => setNavbarExpand(!navbarExpane)}
      >
        <RiArrowDropRightLine className="text-[32px]" />
      </div>

      {/* Top Section */}
      <div className="flex flex-col gap-[40px]">
        {/* Title */}
        <h2 className="text-primary text-[32px] font-bold overflow-hidden transition-all duration-500">
          <span
            className={`inline-block transition-all duration-500 ${
              navbarExpane ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            KickStart
          </span>
          <span
            className={`inline-block transition-all duration-500 ${
              !navbarExpane ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            KC
          </span>
        </h2>

        {/* Main Nav */}
        <div className="flex flex-col">
          <ul className="flex flex-col gap-[12px] text-[18px] font-medium">
            {mainNavList.map((data, index) => (
              <li key={index}>
                <NavLink
                  to={data.to}
                  className="flex items-center gap-[8px] p-[8px] w-fit"
                >
                  <data.icon />
                  <span
                    className={`transition-all duration-500 overflow-hidden ${
                      navbarExpane ? "opacity-0 w-0" : "opacity-100 w-auto ml-2"
                    }`}
                  >
                    {data.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Secondary Nav */}
        <div className="flex flex-col gap-[20px]">
          <h2 className="text-[14px] font-light opacity-50">General</h2>
          <ul className="flex flex-col gap-[12px] text-[18px] font-medium">
            {secNavList.map((data, index) => (
              <li key={index}>
                <NavLink
                  to={data.to}
                  className="flex items-center gap-[8px] p-[8px] w-fit"
                >
                  <data.icon />
                  <span
                    className={`transition-all duration-500 overflow-hidden ${
                      navbarExpane ? "opacity-0 w-0" : "opacity-100 w-auto ml-2"
                    }`}
                  >
                    {data.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => dispatch(logout())}
        className="flex items-center gap-[8px] p-[8px] rounded-[10px] hover:bg-primary 
          transition-all duration-500 ease-in-out"
      >
        <IoLogOut />
        <span
          className={`transition-all duration-500 overflow-hidden ${
            navbarExpane ? "opacity-0 w-0" : "opacity-100 w-auto ml-2"
          }`}
        >
          LogOut
        </span>
      </button>
    </div>
  );
}

export default AdminNavbar;
