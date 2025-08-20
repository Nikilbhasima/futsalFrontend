import { FaAddressBook } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoHelpCircle } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";

export const mainNavList = [
  { to: "/", label: "Dashboard", icon: MdOutlineDashboard },
  { to: "/futsal", label: "Futsal", icon: TbListDetails },
  { to: "/ground", label: "Ground", icon: TbListDetails },
  { to: "/booking", label: "Booking", icon: FaAddressBook },
];

export const secNavList = [
  { to: "/setting", label: "Setting", icon: IoIosSettings },
  { to: "/help", label: "Help", icon: IoHelpCircle },
];
