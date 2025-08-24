import React, { use, useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Box, Modal } from "@mui/material";
import { HiOutlineUser } from "react-icons/hi2";
import { MdOutlineLocalPhone, MdOutlineEmail } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../redux/authSlice/AuthThunks";
import { useDispatch, useSelector } from "react-redux";
import { clearSuccess, setSuccess } from "../redux/authSlice/AuthSlice";
import TextFieldComponent from "../ReusedComponent/TextFieldComponent";
import PasswordFieldComponent from "../ReusedComponent/PasswordFieldComponent";

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
// Icon color
const iconColor = { color: "#27D483" };
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "#333333",
  border: "2px solid #000",
  p: "24px",
  borderRadius: "10px",
  color: "#27D483",
};
function UserRegistration() {
  const dispatch = useDispatch();
  const { loading, error, jwt, success } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [messageModal, setMessageModal] = useState(false);
  const showMessageModal = () => setMessageModal(true);
  const hideMessageModal = () => setMessageModal(false);

  return (
    <>
      <Formik
        initialValues={{
          role: "ROLE_USER",
          username: "",
          phoneNumber: "",
          email: "",
          password: "",
          password2: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const result = await dispatch(registerUser(values));
            if (result.meta.requestStatus === "fulfilled") {
              resetForm();
              dispatch(clearSuccess());
              setErrorMessage(result.payload.message);
              showMessageModal();
            }
            if (result.meta.requestStatus === "rejected") {
              setErrorMessage(result.payload.message);
              showMessageModal();
            }
          } catch (error) {
            console.error("Registration error:", error);
          }
        }}
      >
        {({ values, handleChange }) => (
          <Form className="flex flex-col  mt-[10px]">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <TextFieldComponent
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
              <TextFieldComponent
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
              <TextFieldComponent
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
              <PasswordFieldComponent
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
              <PasswordFieldComponent
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
      <Modal open={messageModal} onClose={hideMessageModal}>
        <Box sx={style}>{errorMessage}</Box>
      </Modal>
    </>
  );
}

export default UserRegistration;
