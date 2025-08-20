import React from "react";
import AdminNavbar from "./navbar/AdminNavbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Futsal from "./futsal/Futsal";
import Ground from "./ground/Ground";
import Booking from "./booking/Booking";
import Setting from "./setting/Setting";
import Help from "./help/Help";
import Header from "./navbar/Header";

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
            <Route path="/futsal" element={<Futsal />} />
            <Route path="/ground" element={<Ground />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
