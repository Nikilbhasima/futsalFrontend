import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader, ScaleLoader, PropagateLoader } from "react-spinners";
import PasswordFieldComponent from "../ReusedComponent/PasswordFieldComponent";
import TextFieldComponent from "../ReusedComponent/TextFieldComponent";
import {
  generateOTP,
  updatePassword,
  validateOTP,
} from "../redux/passwordReset/PasswordResetThunks";
import OtpInput from "./OtpInput";

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
function PasswordResetWithOTP({ isForgetPasswordVisible, hideForgetPassword }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const dispatch = useDispatch();
  const { resetLoading } = useSelector((state) => state.reset);
  const [maileEnterd, setMailEntered] = useState(true);
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  //   displaying password change success
  const [userMessage, setUserMessage] = useState(false);
  const handleVisibleMessage = () => setUserMessage(true);
  const handleHideMessage = () => setUserMessage(false);
  //   handle state of form
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

  //   function required to change password
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
        setOtp(Array(6).fill(""));

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

        setIsOTPValid(false);
        setPasswordReset(false);
        hideForgetPassword();
        setMailEntered(true);
        handleVisibleMessage();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        open={isForgetPasswordVisible}
        onClose={() => {
          hideForgetPassword();
        }}
      >
        <Box sx={{ ...style }}>
          <div>
            {maileEnterd &&
              (!resetLoading ? (
                <div className="grid gap-[1rem]">
                  <h4 className="text-center text-[#27D483]">
                    Forget password
                  </h4>
                  <label className="text-[15px]">
                    Enter Your Email Address
                  </label>
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
              ) : (
                <div className="flex justify-center items-center h-[8rem]">
                  <SyncLoader color="#27D483" />
                </div>
              ))}

            {/* entering otp */}
            {isOTPValid &&
              (!resetLoading ? (
                <div className="grid gap-[1rem]">
                  <h4 className="text-center text-[#27D483]">
                    Forget password
                  </h4>
                  <label className="text-[15px]">Enter Verification Code</label>

                  <OtpInput otp={otp} setOtp={setOtp} />
                  <button
                    className="p-[12px] rounded-[10px] bg-[#27D483] hover:-translate-y-1 transition-all duration-300 ease-in"
                    onClick={handleValidateOTP}
                  >
                    Send
                  </button>
                </div>
              ) : (
                <div className="flex justify-center items-center h-[8rem]">
                  <ScaleLoader color="#27D483" />
                </div>
              ))}
            {passwordReset &&
              (!resetLoading ? (
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
              ) : (
                <div className="flex justify-center items-center h-[8rem]">
                  <PropagateLoader color="#27D483" />
                </div>
              ))}
          </div>
          {/* entering email to get OTP */}
        </Box>
      </Modal>
      <Modal open={userMessage} onClose={handleHideMessage}>
        <Box sx={{ ...style, color: "#27D483" }}>
          Password Change Successfull!
        </Box>
      </Modal>
    </>
  );
}

export default PasswordResetWithOTP;
