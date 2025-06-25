import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  Box,
  TextField,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onClickNavigate = () => {
    navigate("/authenticate/registration");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email/Phone:", emailOrPhone);
    console.log("Password:", password);
    // Perform login logic here
  };

  return (
    <div className="text-white w-full sm:w-[400px] ">
      <div className="flex justify-between  items-center text-[20px] mb-8">
        <h1 className=" text-[#27D483] text-3xl font-bold ">Let's Play</h1>
        <div className=" py-[0.6rem] px-[1.5rem] rounded-[10px] bg-[#27D483] text-[#212121] hover:bg-[#22bb74] transition-colors duration-300">
          <FaArrowLeft />
        </div>
      </div>

      <p className="font-light text-sm text-[16px]">
        Enter your credentials to view your insights
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%",
          }}
        >
          {/* Email or Phone Input */}
          <TextField
            id="email-phone"
            label="Email or Phone Number"
            variant="standard"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MdOutlineMailOutline className="text-[#27D483] text-[25px]" />
                </InputAdornment>
              ),
              sx: {
                color: "white", // input text color
                "&:before": {
                  borderBottomColor: "white", // default border
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#27D483", // hover border
                },
                "&:after": {
                  borderBottomColor: "#27D483", // active/focus border
                },
              },
            }}
            sx={{
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiInput-underline:after": { borderBottomColor: "#27D483" },
            }}
            fullWidth
          />

          {/* Password Input */}
          <FormControl
            variant="standard"
            fullWidth
            sx={{
              "& label": {
                color: "white",
              },
              "& label.Mui-focused": {
                color: "white", // Ensure label stays white when input is focused
              },
              "& .MuiInputBase-input": {
                color: "white", // input text
              },
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid white", // default underline
              },
              "& .MuiInput-underline:hover:before": {
                borderBottom: "1px solid #27D483", // underline on hover
              },
              "& .MuiInput-underline:after": {
                borderBottom: "2px solid #27D483", // underline on focus
              },
              "& .MuiSvgIcon-root": {
                color: "white", // icon color
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#27D483", // hover border
              },
            }}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#27D483] text-[#212121] font-semibold py-3 rounded-lg hover:bg-[#22bb74] transition-colors duration-300 mt-10"
        >
          Sign In
        </button>
      </form>
      <div className="flex items-center justify-between mt-[20px]">
        <div className="h-[2px] w-[43%] bg-[#27D483]"></div>
        <p className="text-[#39908F]">or</p>
        <div className="h-[2px] w-[43%] bg-[#27D483]"></div>
      </div>
      <div className="text-[black] bg-[white] py-[12px] rounded-[10px] font-semibold flex justify-center mt-[20px] gap-[10px]">
        <FcGoogle className="text-[25px]" />
        Sign in with google
      </div>
      <div className="mt-[32px] flex justify-center">
        Don't have account?{" "}
        <a className="text-[#005FFF] ml-[5px]" onClick={onClickNavigate}>
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default Login;
