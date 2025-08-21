import { NavLink, useNavigate } from "react-router-dom";
import "./adminNavbar.css";
import { IoLogOut } from "react-icons/io5";
import { mainNavList, secNavList } from "../codeReducer/codeReducer";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice/AuthSlice";

const style = {
  backgroundColor: "#27d483",
  padding: "8px",
  borderRadius: "10px",
};
function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="p-[32px] flex flex-col items-start justify-between h-[100%] bg-tertary">
      <div className="flex flex-col gap-[40px]">
        <h2 className="text-primary text-[32px] font-bold ">KickStart</h2>
        <div className="flex flex-col">
          <ul className="flex flex-col gap-[12px] relative text-[18px] font-mediun">
            {mainNavList.map((data, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={data.to}
                    className="flex items-center gap-[8px] text-[18px] p-[8px] "
                  >
                    <data.icon />
                    {data.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-[20px]">
          <h2 className="text-[14px] font-light opacity-50">General</h2>
          <div>
            <ul className="flex flex-col gap-[12px] relative text-[18px] font-mediun">
              {secNavList.map((data, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={data.to}
                      className="flex items-center gap-[8px] text-[18px] p-[8px]"
                    >
                      <data.icon />
                      {data.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          dispatch(logout());
        }}
        className="flex items-center text-[18px] gap-[8px]  p-[8px] rounded-[10px] hover:bg-primary duration-300 transition-all ease-in"
      >
        <IoLogOut />
        LogOut
      </button>
    </div>
  );
}

export default AdminNavbar;
