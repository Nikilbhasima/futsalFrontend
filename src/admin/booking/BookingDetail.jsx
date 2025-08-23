import { MdDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa6";
import { GiSandsOfTime } from "react-icons/gi";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { MdOutlineSports } from "react-icons/md";

function BookingDetail({ data }) {
  return (
    <div className=" flex gap-[4px] md:gap-[1rem] bg-tertary p-[8px] lg:py-[24px] lg:px-[32px] rounded-[10px] mt-[32px]">
      <img
        src="images/profile.png"
        alt="user photo"
        className="w-[40px] sm:w-[50px] md:w-[77px] bg-primary rounded-[50%] sm:p-[4px]"
      />
      <ul className="flex items-center justify-between text-[12px] sm:text-[12px] md:text-[16px] lg:text-[18px] w-full">
        <li>{data?.challengerDto?.username}</li>
        <li className="flex gap-[8px] items-center">
          <MdDateRange />
          <span>{data?.playing_date}</span>
        </li>
        <li className="flex gap-[8px] items-center">
          <MdAccessTime />
          <span>
            {data?.starting_time}-{data?.ending_time}
          </span>
        </li>
        <li className="flex gap-[8px] items-center">
          <MdOutlinePhone />
          <span>{data?.challengerDto?.phoneNumber}</span>
        </li>
        <li className="flex gap-[8px] items-center">
          <IoCheckmarkDoneOutline />
          <span>{data?.status}</span>
        </li>
        <li className="flex gap-[8px] items-center">
          {data?.bookingType === "book" && <MdOutlineBookmarkAdded />}
          {data?.bookingType === "challenge" && <MdOutlineSports />}

          <span>{data?.bookingType}</span>
        </li>
      </ul>
    </div>
  );
}

export default BookingDetail;
