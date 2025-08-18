import { createSlice, isRejected } from "@reduxjs/toolkit";
import {
  generateOTP,
  updatePassword,
  validateOTP,
} from "./PasswordResetThunks";

const initialState = {
  resetLoading: false,
  error: null,
};

const passwordResetSlice = createSlice({
  name: "reset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateOTP.pending, (state) => {
        state.resetLoading = true;
        state.error = null;
      })
      .addCase(generateOTP.fulfilled, (state, action) => {
        state.resetLoading = false;
        state.error = null;
      })
      .addCase(generateOTP.rejected, (state, action) => {
        state.resetLoading = false;
        state.error = action.payload?.message || "opt generation failed";
      })
      .addCase(validateOTP.pending, (state) => {
        state.resetLoading = true;
        state.error = null;
      })
      .addCase(validateOTP.fulfilled, (state, action) => {
        state.resetLoading = false;
        state.error = null;
      })
      .addCase(validateOTP.rejected, (state, action) => {
        state.resetLoading = false;
        state.error = action.payload?.message || "otp validation failed";
      })
      .addCase(updatePassword.pending, (state) => {
        state.resetLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.resetLoading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.resetLoading = false;
        state.error = action.payload?.message || "password change failed";
      });
  },
});

export default passwordResetSlice.reducer;
