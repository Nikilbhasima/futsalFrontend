import React from "react";
import "./service.css";
import Card from "../card/Card";
function Service() {
  return (
    <div className="mt-[80px] mb-[80px]">
      <h1 className="text-center text-[40px] text-[#27D483] font-semibold">
        Our Services
      </h1>
      <div className="card-container   mt-[40px] ">
        <Card
          img="./images/service1.png"
          header="Book Venue"
          detail="Browse different venues to book a spot for your team"
          button="View Venue"
        />
        <Card
          img="./images/service2.jpg"
          header="Match"
          detail="Look for or accept matches to play against other teams"
          button="Find Match"
        />
        <Card
          img="./images/service1.png"
          header="Event"
          detail="Seamlessly organize an event at the location of your choice"
          button="Participate"
        />
        <Card
          img="./images/service3.png"
          header="Coach"
          detail="Become and register as a coach to share your expertise at all levels"
          button="Find Coach"
        />
      </div>
    </div>
  );
}

export default Service;
