import { Route, Routes } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Home from "./Home";
import "./home.css";
import AboutUs from "../aboutUs/AboutUs";
import Venue from "../venue/Venue";
import BrowseVenue from "../venue/BrowseVenue";
import Match from "../venue/Match";
import Slot from "../venue/Slot";
import MyBooking from "../bookings/MyBooking";
import Authentication from "../../authentication/Authentication";
import Login from "../../authentication/Login";
import Registration from "../../authentication/Registration";
import UserRegistration from "../../authentication/UserRegistration";
import BusinessRegistration from "../../authentication/BusinessRegistration";

function HomeNavbar() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/venue" element={<Venue />}>
          <Route index element={<BrowseVenue />} />
          <Route path="browse" element={<BrowseVenue />} />
          <Route path="match" element={<Match />} />
          <Route path="slot" element={<Slot />} />
        </Route>
        <Route path="/bookings" element={<MyBooking />} />
        <Route path="/authenticate" element={<Authentication />}>
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />}>
            <Route path="user" element={<UserRegistration />} />
            <Route path="business" element={<BusinessRegistration />} />
            <Route path="*" element={<UserRegistration />} />
            <Route index element={<UserRegistration />} />
          </Route>
          <Route path="*" element={<Login />} />
          <Route index element={<Login />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default HomeNavbar;
