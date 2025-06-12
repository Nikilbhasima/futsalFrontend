import React, { useEffect, useState } from "react";
import "./navbar.css";
import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import SecondaryButton from "../buttonComponent/SecondaryButton";
import PrimaryButton from "../buttonComponent/PrimaryButton";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [changeWidths, setChangeWidths] = useState(true);
  const [click, setClick] = useState(true);
  const [displayIcon, setDisplayIcon] = useState(false);

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
  return (
    <div className=" navbar-main-body flex flex-row justify-between px-[32px] py-[12px] bg-[#212121]  z-110">
      <p className="futsalName flex-none">KickStart</p>
      {changeWidths ? (
        <>
          <div className="links-contain flex flex-row grow  items-center  ">
            <ul className=" link-ul flex flex-row m-auto gap-[32px] p-[16px]">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/venue">Venue</NavLink>
              </li>
              {true ? (
                <>
                  <li>MyBookings</li>
                  <li>MyChallenge</li>
                </>
              ) : null}

              <li>
                <NavLink to="/about">AboutUs</NavLink>
              </li>
            </ul>
            <div className=" flex gap-[16px] ">
              {true ? (
                <>
                  <PrimaryButton buttonName="Sign in" />
                  <SecondaryButton buttonName="Sign up" />
                </>
              ) : (
                <PrimaryButton buttonName="Logout" />
              )}
            </div>
          </div>
        </>
      ) : null}

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
    </div>
  );
}

export default Navbar;
