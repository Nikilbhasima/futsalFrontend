import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Box, Modal } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice/AuthThunks";
import TextFieldComponent from "../ReusedComponent/TextFieldComponent";
import PasswordFieldComponent from "../ReusedComponent/PasswordFieldComponent";
import OtpInput from "./OtpInput";
import {
  generateOTP,
  updatePassword,
  validateOTP,
} from "../redux/passwordReset/PasswordResetThunks";

const validationSchema = Yup.object({
  emailOrMobile: Yup.string()
    .required("Required")
    .test(
      "is-email-or-phone",
      "Must be a valid email or phone number",
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{7,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }
    ),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#333333",
  border: "2px solid #000",
  p: "24px",
  borderRadius: "10px",
};
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isForgetPasswordVisible, setForgetPasswordVisible] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const showForgetPassword = () => setForgetPasswordVisible(true);
  const hideForgetPassword = () => setForgetPasswordVisible(false);

  const [maileEnterd, setMailEntered] = useState(true);
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleOtpSubmit = () => {
    console.log("otp is:", otp);
  };

  const handleGenerateOTP = async () => {
    try {
      const response = await dispatch(generateOTP(formData.email));
      if (response.meta.requestStatus === "fulfilled") {
        setMailEntered(false);
        setIsOTPValid(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleValidateOTP = async () => {
    try {
      const response = await dispatch(
        validateOTP({ email: formData.email, otp: otp })
      );
      console.log("is otp valid:", response.requestStatus);
      if (response.meta.requestStatus === "fulfilled") {
        setMailEntered(false);
        setIsOTPValid(false);
        setPasswordReset(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPasswordWithOTP = async () => {
    try {
      const response = await dispatch(updatePassword(formData));
      if (response.meta.requestStatus === "fulfilled") {
        setFormData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
        setMailEntered(true);
        setIsOTPValid(false);
        setPasswordReset(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-white w-full sm:w-[400px]">
      <div className="flex justify-between items-center text-[20px] mb-8">
        <h1 className="text-[#27D483] text-3xl font-bold">Let's Play</h1>
        <FaArrowLeft className="text-[#27D483]" onClick={() => navigate("/")} />
      </div>

      <p className="font-light text-[16px]">
        Enter your credentials to view your insights
      </p>

      <Formik
        initialValues={{ emailOrMobile: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await dispatch(loginUser(values));
            if (response.meta.requestStatus === "fulfilled") {
              resetForm();
              navigate("/");
            }
          } catch (error) {
            console.error("Login error:", error);
          }
        }}
      >
        {({ values, handleChange }) => (
          <Form className="flex flex-col  mt-8">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextFieldComponent
                id="emailOrMobile"
                label="Email or Phone Number"
                name="emailOrMobile"
                value={values.emailOrMobile}
                onChange={handleChange}
                icon={
                  <MdOutlineMailOutline
                    style={{ color: "#27D483", fontSize: "25px" }}
                  />
                }
              />
              <ErrorMessage
                name="emailOrMobile"
                component="div"
                className="text-red-500 text-sm  rounded shadow"
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
                className="text-red-500 text-sm"
              />
              <label
                className="ml-auto text-[14px] text-[#27D483]"
                onClick={showForgetPassword}
              >
                Forget?
              </label>
            </Box>

            <button
              type="submit"
              className="bg-[#27D483] text-[#212121] font-semibold py-3 rounded-lg hover:bg-[#22bb74] transition duration-300 mt-10"
            >
              Sign In
            </button>
          </Form>
        )}
      </Formik>

      <div className="flex items-center justify-between mt-[20px]">
        <div className="h-[2px] w-[43%] bg-[#27D483]" />
        <p className="text-[#39908F]">or</p>
        <div className="h-[2px] w-[43%] bg-[#27D483]" />
      </div>

      <div className="text-black bg-white py-[12px] rounded-[10px] font-semibold flex justify-center mt-[20px] gap-[10px] cursor-pointer">
        <FcGoogle className="text-[25px]" />
        Sign in with Google
      </div>

      <div className="mt-[32px] flex justify-center">
        Don't have an account?
        <span
          onClick={() => navigate("/authenticate/registration")}
          className="text-[#005FFF] ml-[5px] cursor-pointer"
        >
          Sign Up
        </span>
      </div>
      <Modal open={isForgetPasswordVisible} onClose={hideForgetPassword}>
        <Box sx={{ ...style }}>
          {/* entering email to get OTP */}
          {maileEnterd && (
            <div className="grid gap-[1rem]">
              <h4 className="text-center text-[#27D483]">Forget password</h4>
              <label className="text-[15px]">Enter Your Email Address</label>
              <TextFieldComponent
                id="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={(e) => handleFormData(e)}
              />
              <button
                className="p-[12px] rounded-[10px] bg-[#27D483] hover:-translate-y-1 transition-all duration-300 ease-in"
                onClick={handleGenerateOTP}
              >
                Send
              </button>
            </div>
          )}
          {/* entering otp */}
          {isOTPValid && (
            <div className="grid gap-[1rem]">
              <h4 className="text-center text-[#27D483]">Forget password</h4>
              <label className="text-[15px]">Enter Verification Code</label>

              <OtpInput otp={otp} setOtp={setOtp} />
              <button
                className="p-[12px] rounded-[10px] bg-[#27D483] hover:-translate-y-1 transition-all duration-300 ease-in"
                onClick={handleValidateOTP}
              >
                Send
              </button>
            </div>
          )}

          {passwordReset && (
            <div className="grid gap-[1rem]">
              <h4 className="text-center text-[#27D483]">New Password</h4>
              <PasswordFieldComponent
                id="new"
                label="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleFormData}
                visible={showPassword2}
                toggleVisible={() => setShowPassword2((v) => !v)}
              />
              <PasswordFieldComponent
                id="confirm"
                label="Confrim Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFormData}
                visible={showPassword3}
                toggleVisible={() => setShowPassword3((v) => !v)}
              />
              <button
                className="p-[12px] rounded-[10px] bg-[#27D483] hover:-translate-y-1 transition-all duration-300 ease-in"
                onClick={handleResetPasswordWithOTP}
              >
                Send
              </button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default Login;
