import { createSlice } from "@reduxjs/toolkit";
import { initiatePayment, verifyPayment } from "./OnlinePaymentThunks";

const initialState = {
  paymentLoading: false,
  error: null,
  paymentDetail: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.paymentLoading = true;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.error = null;
        state.paymentDetail = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.error = action.payload?.message || "fail to initate payment";
        state.paymentDetail = null;
        state.paymentLoading = false;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.paymentLoading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.error = null;
        state.paymentDetail = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.error = action.payload?.message || "fail to verify payment";
        state.paymentDetail = null;
        state.paymentLoading = false;
      });
  },
});

export default paymentSlice.reducer;
