import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
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

function PasswordFieldComponent({
  label,
  value,
  onChange,
  name,
  visible,
  toggleVisible,
}) {
  return (
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
}

export default PasswordFieldComponent;
