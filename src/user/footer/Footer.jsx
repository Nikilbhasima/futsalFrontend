import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
function Footer() {
  return (
    <div className="lg:max-w-[1327px] md:w-full w-full mx-auto mt-[80px] grid grid-cols-4 lg:px-[60px] md:px-[40px] sm:px-[20px] px-[10px] pb-[40px]">
      <div className="flex flex-col items-center lg:gap-[0.5rem] md:gap-[0.3rem] ">
        <h1 className="text-[#27D483] lg:text-[2rem] md:text-[1.5rem] sm-[1rem] font-semibold">
          KickStart
        </h1>
        <div>
          <p className="lg:text-[14px] text-[10px]">&copy;2025 BhasimaCode</p>
          <p className="lg:text-[14px] text-[10px]">Allrights Reserved</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-[0.5rem] ">
        <p className="text-[#27D483] lg:text-[1.5rem] md:text-[1rem] sm:text-[1rem] text-[1rem] ">
          Company
        </p>
        <ul>
          <li className="lg:text-[14px] text-[10px]">About</li>
          <li className="lg:text-[14px] text-[10px]">Contact</li>
        </ul>
      </div>
      <div className="flex flex-col items-center gap-[0.5rem]">
        <p className="text-[#27D483] lg:text-[1.5rem] md:text-[1rem] sm:text-[1rem] text-[1rem] ">
          Social
        </p>
        <div className="flex gap-[1rem]">
          <FaFacebookSquare className="lg:text-[14px] text-[10px]" />
          <FaInstagramSquare className="lg:text-[14px] text-[10px]" />
          <FaWhatsappSquare className="lg:text-[14px] text-[10px]" />
          <FaXTwitter className="lg:text-[14px] text-[10px]" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-[0.5rem]">
        <p className="text-[#27D483] lg:text-[1.5rem] md:text-[1rem] sm:text-[1rem] text-[1rem] ">
          Privacy & Terms
        </p>
        <ul className="flex flex-col items-center">
          <li className="text-[40px]">Privacy Policy</li>
          <li className="text-[40px]">Terms of Service</li>
          <li className="text-[40px]">Cancellation Policy</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
