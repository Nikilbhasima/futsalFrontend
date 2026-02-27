import { InputAdornment, TextField } from "@mui/material";
import React from "react";

// Reusable input styles
const inputStyle = {
  color: "white",
  "&:before": { borderBottomColor: "white" },
  "&:hover:not(.Mui-disabled):before": { borderBottomColor: "#27D483" },
  "&:after": { borderBottomColor: "#27D483" },
};

// Icon color
const iconColor = { color: "#27D483" };

function TextFieldComponent({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  icon,
  type,
  error,
  helperText,
  ...props
}) {
  return (
    <TextField
      id={id}
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur} // Added onBlur handler
      error={error} // Added error prop
      helperText={helperText} // Added helperText prop
      variant="standard"
      fullWidth
      InputLabelProps={{
        shrink: type === "time" ? true : undefined,
        style: { color: "white" }, // Keep white label
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
        sx: inputStyle,
      }}
      sx={{
        "& .MuiInput-underline:before": {
          borderBottomColor: error ? "#f44336" : "white", // Red underline for error
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: error ? "#f44336" : "#27D483", // Red underline for error
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottomColor: error ? "#f44336" : "#27D483",
        },
        // Error text styling - bright red for visibility
        "& .MuiFormHelperText-root": {
          color: error ? "#ff6b6b" : "inherit", // Bright red for better visibility
          fontSize: "0.75rem",
          fontWeight: error ? "500" : "normal", // Bold error text
        },
        // Keep input text white even with errors
        "& .MuiInputBase-input": {
          color: "white",
        },
      }}
      {...props} // Spread any additional props
    />
  );
}

export default TextFieldComponent;
