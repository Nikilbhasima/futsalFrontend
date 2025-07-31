import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { HiOutlineUser } from "react-icons/hi2";
import { MdOutlineLocalPhone, MdOutlineEmail } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice/AuthThunks";
import TextFieldComponent from "../ReusedComponent/TextFieldComponent";
import PasswordFieldComponent from "../ReusedComponent/PasswordFieldComponent";

const iconColor = { color: "#27D483" };
const formControlSx = {
  "& label": { color: "white" },
  "& label.Mui-focused": { color: "white" },
  "& .MuiInputBase-input": { color: "white" },
  "& .MuiInput-underline:before": { borderBottom: "1px solid white" },
  "& .MuiInput-underline:hover:before": { borderBottom: "1px solid #27D483" },
  "& .MuiInput-underline:after": { borderBottom: "2px solid #27D483" },
  // Removed the line below to prevent overriding icon colors to white
  // "& .MuiSvgIcon-root": { color: "white" },
};

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

// === Main Component ===
function BusinessRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <Formik
        initialValues={{
          role: "ROLE_OWNER",
          username: "",
          phoneNumber: "",
          email: "",
          password: "",
          password2: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await dispatch(registerUser(values));
            console.log("user registration data", response);
            if (response.meta.requestStatus === "fulfilled") {
              resetForm();
            }
          } catch (error) {
            console.error("Registration error:", error);
          }
        }}
      >
        {({ values, handleChange }) => (
          <Form className="flex flex-col mt-[10px]">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextFieldComponent
                id="username"
                label="Futsal Name"
                name="username"
                value={values.username}
                onChange={handleChange}
                icon={
                  <HiOutlineUser style={{ color: "#27D483", fontSize: 25 }} />
                }
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm "
              />
              <TextFieldComponent
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                icon={
                  <MdOutlineLocalPhone
                    style={{ color: "#27D483", fontSize: 25 }}
                  />
                }
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm  "
              />
              <TextFieldComponent
                id="email"
                label="Futsal Gmail"
                name="email"
                value={values.email}
                onChange={handleChange}
                icon={
                  <MdOutlineEmail style={{ color: "#27D483", fontSize: 25 }} />
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm  "
              />

              <PasswordFieldComponent
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                visible={showPassword}
                toggleVisible={() => setShowPassword((prev) => !prev)}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm "
              />
              <PasswordFieldComponent
                label="Re-enter Password"
                name="password2"
                value={values.password2}
                onChange={handleChange}
                visible={showPassword2}
                toggleVisible={() => setShowPassword2((prev) => !prev)}
              />
              <ErrorMessage
                name="password2"
                component="div"
                className="text-red-500 text-sm  "
              />
            </Box>

            <button
              type="submit"
              className="bg-[#27D483] text-[#212121] font-semibold py-3 rounded-lg hover:bg-[#22bb74] transition-colors duration-300 mt-10"
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

export default BusinessRegistration;
