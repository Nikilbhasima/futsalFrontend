import React, { Fragment, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import {
  Box,
  TextField,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const style = {
  bgcolor: "#333333",
  padding: "20px 28px",
  borderRadius: "10px",
};
const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});
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
function PasswordUpdate({ open, handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  return (
    <Fragment>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            padding: "0",
            width: "25rem",
          },
        }}
      >
        <Box sx={style}>
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("user registration data", values);
            }}
          >
            {({ values, handleChange }) => {
              return (
                <Form className="flex flex-col mt-[10px]">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      width: "100%",
                    }}
                  >
                    <PasswordInput
                      label="Current Password"
                      value={values.currentPassword}
                      onChange={handleChange}
                      name="currentPassword"
                      visible={showPassword}
                      toggleVisible={() => setShowPassword((v) => !v)}
                    />
                    <ErrorMessage
                      name="currentPassword"
                      component="div"
                      className="text-red-500 text-sm "
                    />
                    <PasswordInput
                      label="New Password "
                      value={values.newPassword}
                      onChange={handleChange}
                      name="newPassword"
                      visible={showPassword2}
                      toggleVisible={() => setShowPassword2((v) => !v)}
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 text-sm "
                    />
                    <PasswordInput
                      label="Confirm Password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      name="confirmPassword"
                      visible={showPassword3}
                      toggleVisible={() => setShowPassword3((v) => !v)}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm "
                    />
                    <button
                      type="submit"
                      className="bg-[#27D483] text-[#212121] font-semibold py-3 rounded-lg hover:bg-[#22bb74] transition-colors duration-300 mt-10"
                    >
                      Update Password
                    </button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Dialog>
    </Fragment>
  );
}

export default PasswordUpdate;
