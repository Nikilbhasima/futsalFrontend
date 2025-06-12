import React, { useState } from "react";
import PrimaryButton from "../buttonComponent/PrimaryButton";

function Contact() {
  const [formValue, setFormValue] = useState({
    name: "",
    gmail: "",
    description: "",
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValue((p) => ({ ...p, [name]: value }));
  };
  return (
    <div className="pt-[80px] mx-auto  md:w-full sm:w-full ">
      <h1 className="text-[40px] text-[#27D483] font-semibold text-center">
        Contact Us
      </h1>
      <p className="mt-[28px] text-[16px] text-center text-[#27D483] ">
        Any question or remark? just write us a message
      </p>
      <div className="mt-[60px] flex flex-col mx-auto gap-[40px] lg:w-[720px] md:w-full sm:w-full p-[1rem] ">
        <div className="flex justify-between">
          <input
            name="name"
            type="text"
            value={formValue.name}
            className="bg-[white] text-[#333333] py-[12px] px-[32px] lg:w-[45%] sm:w-[45%] w-[45%]"
            placeholder="Enter Name"
            onChange={handleChangeValue}
          />
          <input
            name="gmail"
            type="email"
            value={formValue.gmail}
            className="bg-[white] text-[#333333] text-[#333333] py-[12px] px-[32px] lg:w-[45%] sm:w-[45%] w-[45%]"
            placeholder="Gmail"
            onChange={handleChangeValue}
          />
        </div>
        <textarea
          name="description"
          value={formValue.description}
          placeholder="Ask any question"
          onChange={handleChangeValue}
          className="bg-[white] text-[#333333] py-[12px] px-[32px] lg:h-[5rem]"
        />
        <button className="py-[12px] px-[32px] rounded-[10px] bg-[#27D483] hover:bg-[#1c945c] hover:scale-[1.05] transition-all duration-1000 ease-in">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Contact;
