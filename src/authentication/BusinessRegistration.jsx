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
import { HiOutlineUser } from "react-icons/hi2";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";

function BusinessRegistration() {
  const [registrationData, setRestistrationData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    password2: "",
    accountType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setRestistrationData((data) => ({ ...registrationData, [name]: value }));
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword2 = (event) => event.preventDefault();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-[10px]">
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
            id="username"
            label="Futsal Name"
            variant="standard"
            name="username"
            value={registrationData.username}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <HiOutlineUser className="text-[#27D483] text-[25px]" />
                </InputAdornment>
              ),
              sx: {
                color: "white",
                "&:before": {
                  borderBottomColor: "white",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#27D483",
                },
                "&:after": {
                  borderBottomColor: "#27D483",
                },
              },
            }}
            sx={{
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiInput-underline:after": { borderBottomColor: "#27D483" },
            }}
          />

          <TextField
            id="phone_number"
            label="Phone Number"
            variant="standard"
            value={registrationData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MdOutlineLocalPhone className="text-[#27D483] text-[25px]" />
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
          <TextField
            id="email"
            label="Futsal Gmail "
            variant="standard"
            value={registrationData.email}
            onChange={handleChange}
            name="email"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MdOutlineEmail className="text-[#27D483] text-[25px]" />
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
              value={registrationData.password}
              onChange={handleChange}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff className="text-[#27D483] text-[25px]" />
                    ) : (
                      <Visibility className="text-[#27D483] text-[25px]" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {/* re-enter password */}
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
              Re-enter Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword2 ? "text" : "password"}
              value={registrationData.password2}
              onChange={handleChange}
              name="password2"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                    edge="end"
                  >
                    {showPassword2 ? (
                      <VisibilityOff className="text-[#27D483] text-[25px]" />
                    ) : (
                      <Visibility className="text-[#27D483] text-[25px]" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>

        <button
          type="submit"
          className="bg-[#27D483] text-[#212121] font-semibold py-3 rounded-lg hover:bg-[#22bb74] transition-colors duration-300 "
        >
          Sign Up
        </button>
      </form>
      <div className="flex items-center justify-between mt-[20px]">
        <div className="h-[2px] w-[43%] bg-[#27D483]"></div>
        <p className="text-[#39908F]">or</p>
        <div className="h-[2px] w-[43%] bg-[#27D483]"></div>
      </div>
      <div className="text-[black] bg-[white] py-[12px] rounded-[10px] font-semibold flex justify-center mt-[20px] gap-[10px]">
        <FcGoogle className="text-[25px]" />
        Sign up with google
      </div>
    </>
  );
}

export default BusinessRegistration;
