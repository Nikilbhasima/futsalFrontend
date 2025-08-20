import { IoSearchSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

function Header() {
  return (
    <div className="flex justify-end bg-tertary">
      <div className="flex gap-[20px] py-[24px] px-[32px] ">
        <div className="flex items-center text-[16px]">
          <div className="bg-secondary py-[12px] pl-[16px] pr-[6px] rounded-s-[10px]">
            <IoSearchSharp className="text-primary text-[24px]" />
          </div>

          <input
            type="text"
            placeholder="Search"
            className="bg-secondary text-primary py-[12px] rounded-e-[10px] pl-[6px] outline-none"
          />
        </div>
        <div className="p-[12px] bg-secondary w-fit rounded-[10px]">
          <IoMdNotificationsOutline className="text-primary text-[24px]" />
        </div>
        <img
          src="/images/messi.png"
          alt=""
          className="rounded-[50%] h-[3rem] w-[3rem] object-cover object-center"
        />
      </div>
    </div>
  );
}

export default Header;
