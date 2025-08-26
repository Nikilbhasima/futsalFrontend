import { createSlice } from "@reduxjs/toolkit";
import {
  acceptChallenge,
  bookGround,
  bookingList,
  cancelFutsalBooking,
  cancelFutsalChallenge,
  getAdminBookingNumber,
  getListOfChallenges,
  getMyChallenge,
  getNumberOfBooking,
  updatePhysicalPayment,
  userBookings,
} from "./BookingThunks";

const initialState = {
  bookings: null,
  loadingBooking: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookingList.pending, (state) => {
        state.loadingBooking = true;
        state.error = null;
      })
      .addCase(bookingList.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.error = null;
        state.bookings = action.payload;
      })
      .addCase(bookingList.rejected, (state, action) => {
        state.loadingBooking = false;
        state.error = action.payload?.message || "Failed to fetch booking list";
      })
      .addCase(bookGround.pending, (state) => {
        state.loadingBooking = true;
        state.error = null;
      })
      .addCase(bookGround.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.error = null;
        state.bookings = action.payload;
      })
      .addCase(bookGround.rejected, (state, action) => {
        state.loadingBooking = false;
        state.error = action.payload?.message || "Failed to fetch booking list";
      })
      .addCase(userBookings.pending, (state) => {
        state.loadingBooking = true;
        state.error = null;
      })
      .addCase(userBookings.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(userBookings.rejected, (state, action) => {
        action.loadingBooking = false;
        state.error = action.payload?.message || "Failed to fetch booking list";
      })
      .addCase(cancelFutsalBooking.pending, (state) => {
        state.loadingBooking = true;
        state.error = null;
      })
      .addCase(cancelFutsalBooking.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(cancelFutsalBooking.rejected, (state, action) => {
        action.loadingBooking = false;
        state.error = action.payload?.message || "Failed to cancel Booking";
      })
      .addCase(getListOfChallenges.pending, (state) => {
        state.loadingBooking = true;
        state.error = null;
      })
      .addCase(getListOfChallenges.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(getListOfChallenges.rejected, (state, action) => {
        action.loadingBooking = false;
        state.error =
          action.payload?.message || "Failed to get list of challenge data";
      })
      .addCase(acceptChallenge.pending, (state) => {
        state.loadingBooking = true;
        state.error = null;
      })
      .addCase(acceptChallenge.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(acceptChallenge.rejected, (state, action) => {
        action.loadingBooking = false;
        state.error = action.payload?.message || "Failed to accept challenge";
      })
      .addCase(getMyChallenge.pending, (state) => {
        state.loadingBooking = true;
        state.error = null;
      })
      .addCase(getMyChallenge.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(getMyChallenge.rejected, (state, action) => {
        action.loadingBooking = false;
        state.error = action.payload?.message || "Failed to get My Challenge";
      })
      .addCase(cancelFutsalChallenge.pending, (state) => {
        state.loadingBooking = true;
        state.error = null;
      })
      .addCase(cancelFutsalChallenge.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(cancelFutsalChallenge.rejected, (state, action) => {
        action.loadingBooking = false;
        state.error = action.payload?.message || "Failed to cancel Challenge";
      })
      .addCase(updatePhysicalPayment.pending, (state) => {
        state.loadingBooking = true;
        state.error = null;
      })
      .addCase(updatePhysicalPayment.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(updatePhysicalPayment.rejected, (state, action) => {
        action.loadingBooking = false;
        state.error = action.payload?.message || "Failed to update Payment";
      })
      .addCase(getNumberOfBooking.pending, (state) => {
        state.loadingBooking = true;
        state.error = null;
      })
      .addCase(getNumberOfBooking.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(getNumberOfBooking.rejected, (state, action) => {
        action.loadingBooking = false;
        state.error =
          action.payload?.message || "Failed to get Number of booking";
      })
      .addCase(getAdminBookingNumber.pending, (state) => {
        state.loadingBooking = true;
        state.error = null;
      })
      .addCase(getAdminBookingNumber.fulfilled, (state, action) => {
        state.loadingBooking = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(getAdminBookingNumber.rejected, (state, action) => {
        action.loadingBooking = false;
        state.error =
          action.payload?.message || "Failed to get Number of booking";
      });
  },
});

export default bookingSlice.reducer;
