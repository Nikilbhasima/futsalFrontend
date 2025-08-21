import { FaAddressBook } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoHelpCircle } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { GiRunningNinja } from "react-icons/gi";

export const mainNavList = [
  { to: "/", label: "Dashboard", icon: MdOutlineDashboard },
  { to: "/venue", label: "Venue", icon: TbListDetails },
  { to: "/booking", label: "Booking", icon: FaAddressBook },
  { to: "/match", label: "Match", icon: GiRunningNinja },
];

export const secNavList = [
  { to: "/setting", label: "Setting", icon: IoIosSettings },
  { to: "/help", label: "Help", icon: IoHelpCircle },
];
