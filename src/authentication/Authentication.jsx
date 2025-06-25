import React from "react";
import Login from "./Login";
import { Outlet } from "react-router-dom";

function Authentication() {
  return (
    <div className=" h-[91vh] flex  items-center sm:justify-center p-[20px]">
      <div className="bg-[#333333] w-full sm:w-fit  border-0 flex rounded-[10px] p-[32px]">
        {/* <Login /> */}
        <Outlet />
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:w-[400px] ">
          <img
            className="max-h-[490px]"
            src="/images/heroimg.png"
            alt="player image"
          />
        </div>
      </div>
    </div>
  );
}

export default Authentication;
