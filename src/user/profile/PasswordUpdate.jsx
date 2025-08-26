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
  Modal,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/accountManagement/AccountManagementThunks";
import PasswordFieldComponent from "../../ReusedComponent/PasswordFieldComponent";

const inputStyle = {
  color: "white",
  "&:before": { borderBottomColor: "white" },
  "&:hover:not(.Mui-disabled):before": { borderBottomColor: "#27D483" },
  "&:after": { borderBottomColor: "#27D483" },
};

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
    .min(6, "Password must be at least 6 characters")
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "#333333",
  border: "2px solid #000",
  p: "24px",
  borderRadius: "10px",
};
function PasswordUpdate({ open, handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [displayMessage, setDisplayMessage] = useState(false);
  const handleOpen = () => setDisplayMessage(true);
  const handleCloses = () => setDisplayMessage(false);

  return (
    <>
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
            onSubmit={async (values, { resetForm }) => {
              try {
                const response = await dispatch(changePassword(values));

                if (response.meta.requestStatus === "fulfilled") {
                  resetForm();
                  handleClose();
                  setMessage(" Password Change Successfull!");
                  setTimeout(() => {
                    handleOpen();
                  }, 500);
                }
                if (response.meta.requestStatus === "rejected") {
                  setMessage("Please Enter the correct password");
                  handleOpen();
                }
              } catch (error) {
                console.log(error);
              }
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
                    <PasswordFieldComponent
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

                    <PasswordFieldComponent
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

                    <PasswordFieldComponent
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
      <Modal open={displayMessage} onClose={handleCloses}>
        <Box sx={{ ...style2, color: "#27D483" }}>{message}</Box>
      </Modal>
    </>
  );
}

export default PasswordUpdate;
