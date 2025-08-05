import React, { useEffect, useState } from "react";
import "./navbar.css";
import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import SecondaryButton from "../buttonComponent/SecondaryButton";
import PrimaryButton from "../buttonComponent/PrimaryButton";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice/AuthSlice";

function Navbar() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [changeWidths, setChangeWidths] = useState(true);
  const [click, setClick] = useState(true);
  const [displayIcon, setDisplayIcon] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { success, jwt } = useSelector((state) => state.auth);
  console.log(jwt);

  useEffect(() => {
    if (screenSize < 998) {
      setChangeWidths(false);
      setDisplayIcon(true);
    }
    if (screenSize >= 998) {
      setChangeWidths(true);
      setDisplayIcon(false);
      setClick(true);
    }
  }, [screenSize]);

  // management of screen width
  useEffect(() => {
    window.addEventListener("resize", changeWidth);
  }, []);

  const changeWidth = () => {
    setScreenSize(window.innerWidth);
  };

  const [filter, setFilter] = useState(true);
  const handleFilter = () => {
    setFilter(!filter);
  };
  return (
    <nav className=" navbar-main-body flex flex-row justify-between px-[32px] py-[12px] bg-[#212121]  z-110">
      <p className="futsalName flex-none">KickStart</p>
      {changeWidths ? (
        <>
          <div className="links-contain flex flex-row grow  items-center ">
            <ul className=" link-ul flex flex-row  gap-[32px] m-auto">
              <li>
                <NavLink to="/" className="navbar-list">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={`/venue/${"book"}`} className="navbar-list">
                  Venue
                </NavLink>
              </li>
              {success ? (
                <>
                  <li>
                    <NavLink to="/bookings" className="navbar-list">
                      MyBookings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/challenge" className="navbar-list">
                      MyChallenge
                    </NavLink>
                  </li>
                </>
              ) : null}

              <li>
                <NavLink to="/about" className="navbar-list">
                  AboutUs
                </NavLink>
              </li>
            </ul>
            <div className=" flex gap-[16px] ">
              {/* this is non login part */}
              {success ? (
                <div className="relative">
                  {displayIcon ? (
                    <PrimaryButton buttonName="Logout" />
                  ) : (
                    <>
                      <div
                        className="bg-cover bg-no-repeat bg-center rounded-[50%] h-[3rem] w-[3rem] bg-[url(/images/messi.png)] "
                        onClick={handleFilter}
                      ></div>
                      <ul
                        role="menu"
                        className={` w-[300%] bg-white absolute -right-2 w-[200%] rounded-[10px]  shadow-lg overflow-hidden transition-all duration-300 ease-in-out origin-top z-10 ${
                          filter
                            ? "opacity-0 scale-y-0 h-0 -translate-y-2 pointer-events-none"
                            : "opacity-100 scale-y-100 h-auto translate-y-2 pointer-events-auto"
                        }`}
                      >
                        <li
                          className="py-[12px] px-[12px] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light flex justify-between items-center"
                          onClick={() => navigate("/profile")}
                        >
                          Edit Profile
                          <CgProfile className="text-[16px]" />
                        </li>
                        <li className="py-[12px] px-[12px] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light flex justify-between items-center">
                          Setting
                          <IoSettingsOutline className="text-[16px]" />
                        </li>
                        <li
                          className="py-[12px] px-[12px] text-black text-left hover:bg-[#27D483] cursor-pointer text-[14px] font-light flex justify-between items-center"
                          onClick={() => {
                            console.log("logout");
                            dispatch(logout());
                            navigate("/");
                          }}
                        >
                          Logout
                          <FiLogOut className="text-[16px]" />
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <PrimaryButton
                    buttonName="Sign in"
                    navTo="authenticate/login"
                  />
                  <SecondaryButton
                    buttonName="Sign up"
                    navTo="/authenticate/registration"
                  />
                </>
              )}
            </div>
          </div>
        </>
      ) : null}
      {/* this will be display when screen size shrinks */}
      {displayIcon ? (
        <div className="flex items-center justify-center z-110">
          {click ? (
            <MdOutlineMenu
              className="text-[30px]"
              onClick={() => {
                setClick(false);
                setChangeWidths(true);
              }}
            />
          ) : (
            <RxCross2
              className="text-[30px]"
              onClick={() => {
                setClick(true);
                setChangeWidths(false);
              }}
            />
          )}
        </div>
      ) : null}
    </nav>
  );
}

export default Navbar;
