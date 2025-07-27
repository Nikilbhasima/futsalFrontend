import React, { useState } from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { HiOutlineUser } from "react-icons/hi2";
import { MdOutlineLocalPhone, MdOutlineEmail } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { VscLocation } from "react-icons/vsc";
import { uploadToCloudnary } from "../../uitls/uploadToCoudinary";

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

  address: Yup.string().required("Address is required"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  bgcolor: "#333333",
  padding: "20px 28px",
  borderRadius: "10px",
};

function EditForm({ open, handleClose }) {
  const [selectedImage, setSelectedImage] = useState();

  return (
    <React.Fragment>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: { backgroundColor: "transparent", padding: "0" },
        }}
      >
        <Box sx={style}>
          <Formik
            initialValues={{
              username: "",
              phoneNumber: "",
              email: "",
              address: "",
              image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("user registration data", values);
            }}
          >
            {({ values, handleChange, setFieldValue }) => {
              // Move handleImageChange inside Formik context
              const handleImageChange = async (event) => {
                const file = event.target.files[0];
                if (file) {
                  const uploadedFile = uploadToCloudnary(file);
                  setSelectedImage(file);
                  setFieldValue("image", uploadedFile);
                }
              };

              return (
                <Form className="flex flex-col mt-[10px]">
                  <div className="relative">
                    <img
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : "./images/profile.png"
                      }
                      alt="profile picture"
                      className="rounded-[10px] h-[12rem] w-[25rem] object-contain mb-4 bg-white py-[5px]"
                    />
                    <input
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </div>
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
                      className="text-red-500 text-sm"
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
                      className="text-red-500 text-sm"
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
                      className="text-red-500 text-sm"
                    />
                    <IconTextField
                      id="address"
                      label="Address"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      icon={<VscLocation style={iconColor} size={25} />}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </Box>
                  <button
                    type="submit"
                    className="bg-[#27D483] text-[#212121] font-semibold py-3 rounded-lg hover:bg-[#22bb74] transition-colors duration-300 mt-10"
                  >
                    Update Profile
                  </button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

export default EditForm;
