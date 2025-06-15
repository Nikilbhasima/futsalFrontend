import { Route, Routes } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Home from "./Home";
import "./home.css";
import AboutUs from "../aboutUs/AboutUs";
import Venue from "../venue/Venue";
import BrowseVenue from "../venue/BrowseVenue";
import Match from "../venue/Match";

function HomeNavbar() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/venue" element={<Venue />}>
          <Route path="browse" element={<BrowseVenue />} />
          <Route path="match" element={<Match />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default HomeNavbar;
