import React, { useEffect, useState } from "react";
import Carousel from "../carosel/Carousel";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { GoDotFill } from "react-icons/go";

const bgImgs = [
  "https://www.b360nepal.com/storage/wp-content/uploads/2023/01/Futsal-tournament-5.jpg",
  "https://amnnepal.com/wp-content/uploads/2022/07/289451266_136545569002320_6074986624005120131_n.jpg",
  "https://www.trinity.edu.np/assets/backend/uploads/Gallery/ECA/2020/Intra-College%20Futsal%20Competition/New%20folder/IMG_0212.jpg",
];

function Event() {
  const [currentPostion, setCurrentPosition] = useState(0);

  const handlePrev = () => {
    const isFirstImg = currentPostion === 0;
    const newIndex = isFirstImg ? bgImgs.length - 1 : currentPostion - 1;
    setCurrentPosition(newIndex);
  };

  const handleNext = () => {
    const isLastImg = currentPostion === bgImgs.length - 1;
    const newIndex = isLastImg ? 0 : currentPostion + 1;
    setCurrentPosition(newIndex);
  };

  const onClickGo = (index) => {
    setCurrentPosition((p) => (p = index));
  };
  useEffect(() => {
    const imgInterval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(imgInterval);
  }, [currentPostion]);

  return (
    <div className="mt-[80px] mb-[80px] max-w-[1327px] ms:w-[100%]  ml-auto mr-auto ">
      <h1 className="text-[40px] text-center text-[#27D483] font-semibold">
        Events
      </h1>
      <div className="mt-[40px]  mx-auto lg:w-[70%] md:w-[70%] sm:w-[70%] w-[70%]  p-[0.5rem] relative z-[90]">
        <div className="group hover:bg-[#27D483]   rounded-[50px] size-fit flex justify-center items-center absolute lg:-left-[4rem] sm:-left-[2rem] -left-[2rem] top-[50%] -translate-y-[50%] cursor-pointer transition-all duration-300 ease-in">
          <MdOutlineKeyboardArrowLeft
            className="lg:text-[3rem] sm:text-[2rem] text-[1.5rem] group-hover:text-[#212121] transition-all duration-300 ease-in"
            onClick={handlePrev}
          />
        </div>
        <div className="group hover:bg-[#27D483] cursor-pointer rounded-[50px] size-fit flex justify-center items-center absolute  lg:-right-[4rem] sm:-right-[2rem] -right-[2rem] top-[50%] -translate-y-[50%] transition-all duration-300 ease-in">
          <MdOutlineKeyboardArrowRight
            className="lg:text-[3rem] sm:text-[2rem] text-[1.5rem] group-hover:text-[#212121] transition-all duration-300 ease-in"
            onClick={handleNext}
          />
        </div>
        <div
          style={{ backgroundImage: `url(${bgImgs[currentPostion]})` }}
          className=" lg:h-[600px] md:h-[400px] sm:h-[250px] min-h-[250px] min-w-[200px]  bg-cover bg-no-repeat rounded-[10px] z-[50]"
        ></div>
        <div className="bg-[black]p-[1rem] flex justify-center mt-[1rem]">
          {bgImgs.map((value, index) => {
            return (
              <GoDotFill
                className="lg:text-[1.5rem] md:text-[1rem] text-[white]"
                style={{
                  color: currentPostion === index ? "#27D483" : "white",
                }}
                key={index}
                onClick={() => onClickGo(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Event;
