import { Route, Routes } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Home from "./Home";
import "./home.css";
import AboutUs from "../aboutUs/AboutUs";
import Venue from "../venue/Venue";

function HomeNavbar() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default HomeNavbar;
