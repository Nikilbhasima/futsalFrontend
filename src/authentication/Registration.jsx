import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";

function Registration() {
  const [isUser, setIsUser] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="text-white w-full sm:w-[400px] ">
      <div className="flex items-center gap-[10px]">
        <FaArrowLeft
          className="text-[20px] text-[#27D483] font-light"
          onClick={() => navigate("/authenticate/login")}
        />
        {/* <div className="relative flex m-auto text-[16px] w-[400px] bg-[#212121] gap-[1rem]   py-[12px] rounded-[30px]">
          <div
            className="text-center w-[50%] z-10"
            onClick={() => {
              setIsUser(true);
              navigate("/authenticate/registration/user");
            }}
          >
            User
          </div>
          <div
            className="text-center w-[50%] z-10"
            onClick={() => {
              setIsUser(false);
              navigate("/authenticate/registration/business");
            }}
          >
            Business
          </div>
          <div
            className={`absolute top-0 h-full w-1/2 py-[12px] rounded-[30px] bg-[#27D483] transition-all duration-300 ${
              isUser ? "left-0" : "left-1/2"
            }`}
          ></div>
        </div> */}
        <div className="text-center text-primary text-[24px] font-semibold w-full">
          Registration Form
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Registration;
