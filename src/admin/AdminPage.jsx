import React from "react";
import AdminNavbar from "./navbar/AdminNavbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Booking from "./booking/Booking";
import Setting from "./setting/Setting";
import Help from "./help/Help";
import Header from "./navbar/Header";
import Venue from "./venue/Venue";
import Match from "./match/Match";

function AdminPage() {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen relative">
      <div>
        <AdminNavbar />
      </div>
      <div className="flex flex-col ml-[8px]">
        <Header />
        <div className=" h-[100%] p-[32px]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/match" element={<Match />} />
            <Route path="/help" element={<Help />} />
            <Route path="/venue" element={<Venue />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
