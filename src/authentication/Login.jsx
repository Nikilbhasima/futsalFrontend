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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice/AuthThunks";

const inputSx = {
  color: "white",
  "&:before": { borderBottomColor: "white" },
  "&:hover:not(.Mui-disabled):before": { borderBottomColor: "#27D483" },
  "&:after": { borderBottomColor: "#27D483" },
};

const labelSx = {
  color: "white",
  "&.Mui-focused": { color: "white" },
};

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

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          console.log("Login Data:", values);
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
              <TextField
                label="Email or Phone Number"
                variant="standard"
                name="emailOrMobile"
                value={values.emailOrMobile}
                onChange={handleChange}
                InputLabelProps={{ sx: labelSx }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MdOutlineMailOutline
                        style={{ color: "#27D483", fontSize: "25px" }}
                      />
                    </InputAdornment>
                  ),
                  sx: inputSx,
                }}
                fullWidth
              />
              <ErrorMessage
                name="emailOrMobile"
                component="div"
                className="text-red-500 text-sm  rounded shadow"
              />

              <FormControl variant="standard" fullWidth>
                <InputLabel sx={labelSx}>Password</InputLabel>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  sx={inputSx}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((p) => !p)}
                        onMouseDown={(e) => e.preventDefault()}
                        sx={{ color: "#27D483" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
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
    </div>
  );
}

export default Login;
