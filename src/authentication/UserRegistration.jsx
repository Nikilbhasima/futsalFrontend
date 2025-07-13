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
import { MdOutlineLocalPhone, MdOutlineEmail } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// Reusable input styles
const inputStyle = {
  color: "white",
  "&:before": { borderBottomColor: "white" },
  "&:hover:not(.Mui-disabled):before": { borderBottomColor: "#27D483" },
  "&:after": { borderBottomColor: "#27D483" },
};

// Reusable form control styles
const formControlStyle = {
  "& label": { color: "white" },
  "& label.Mui-focused": { color: "white" },
  "& .MuiInputBase-input": { color: "white" },
  "& .MuiInput-underline:before": { borderBottom: "1px solid white" },
  "& .MuiInput-underline:hover:before": { borderBottom: "1px solid #27D483" },
  "& .MuiInput-underline:after": { borderBottom: "2px solid #27D483" },
};

// Icon color
const iconColor = { color: "#27D483" };

// Reusable TextField with icon
const IconTextField = ({ id, label, name, value, onChange, icon }) => (
  <TextField
    id={id}
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    variant="standard"
    fullWidth
    InputLabelProps={{ style: { color: "white" } }}
    InputProps={{
      endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      sx: inputStyle,
    }}
    sx={{
      "& .MuiInput-underline:before": { borderBottomColor: "white" },
      "& .MuiInput-underline:after": { borderBottomColor: "#27D483" },
    }}
  />
);

// Password input component
const PasswordInput = ({
  label,
  value,
  onChange,
  name,
  visible,
  toggleVisible,
}) => (
  <FormControl variant="standard" fullWidth sx={formControlStyle}>
    <InputLabel>{label}</InputLabel>
    <Input
      type={visible ? "text" : "password"}
      value={value}
      onChange={onChange}
      name={name}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={toggleVisible} edge="end">
            {visible ? (
              <VisibilityOff sx={iconColor} />
            ) : (
              <Visibility sx={iconColor} />
            )}
          </IconButton>
        </InputAdornment>
      }
    />
  </FormControl>
);

// validating user registration data
const phoneRegex = /^[0-9]{10}$/;

const validationSchema = Yup.object({
  username: Yup.string()
    .max(25, "Maximum 25 characters allowed")
    .required("Username is required"),

  phoneNumber: Yup.string()
    .matches(phoneRegex, "Phone number must be 10 digits")
    .required("Phone number is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please re-enter your password"),
});

function UserRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          role: "user",
          username: "",
          phoneNumber: "",
          email: "",
          password: "",
          password2: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("user registration data", values);
        }}
      >
        {({ values, handleChange }) => (
          <Form className="flex flex-col  mt-[10px]">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
              }}
            >
              <IconTextField
                id="username"
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                icon={<HiOutlineUser style={iconColor} size={25} />}
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm "
              />
              <IconTextField
                id="phone"
                label="Phone Number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                icon={<MdOutlineLocalPhone style={iconColor} size={25} />}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm  "
              />
              <IconTextField
                id="email"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                icon={<MdOutlineEmail style={iconColor} size={25} />}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm  "
              />
              <PasswordInput
                label="Password"
                value={values.password}
                onChange={handleChange}
                name="password"
                visible={showPassword}
                toggleVisible={() => setShowPassword((v) => !v)}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm "
              />
              <PasswordInput
                label="Re-enter Password"
                value={values.password2}
                onChange={handleChange}
                name="password2"
                visible={showPassword2}
                toggleVisible={() => setShowPassword2((v) => !v)}
              />
              <ErrorMessage
                name="password2"
                component="div"
                className="text-red-500 text-sm  "
              />
            </Box>

            <button
              type="submit"
              className="bg-[#27D483] text-[#212121] font-semibold py-3 rounded-lg hover:bg-[#22bb74] transition-colors duration-300  mt-10"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <div className="flex items-center justify-between mt-[20px]">
        <div className="h-[2px] w-[43%] bg-[#27D483]"></div>
        <p className="text-[#39908F]">or</p>
        <div className="h-[2px] w-[43%] bg-[#27D483]"></div>
      </div>

      <div className="text-[black] bg-[white] py-[12px] rounded-[10px] font-semibold flex justify-center mt-[20px] gap-[10px]">
        <FcGoogle className="text-[25px]" />
        Sign up with Google
      </div>
    </>
  );
}

export default UserRegistration;
