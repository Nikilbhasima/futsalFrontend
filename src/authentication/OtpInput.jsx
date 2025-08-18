import React, { useState, useRef } from "react";

export default function OtpInput({ otp, setOtp }) {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // ✅ move focus only when typing a digit
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          value={digit}
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-[60px] h-[60px] rounded-full border border-[#27D483] text-center text-2xl 
                     focus:outline-none focus:ring-2 focus:ring-[#1ECC70]"
        />
      ))}
    </div>
  );
}
