import { InputAdornment, TextField } from "@mui/material";
import React from "react";
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

function TextFieldComponent({ id, label, name, value, onChange, icon }) {
  return (
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
}

export default TextFieldComponent;
