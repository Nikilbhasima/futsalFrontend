import { createSlice } from "@reduxjs/toolkit";
import {
  acceptChallenge,
  bookGround,
  bookingList,
  cancelFutsalBooking,
  cancelFutsalChallenge,
  getListOfChallenges,
  getMyChallenge,
  userBookings,
} from "./BookingThunks";

const initialState = {
  bookings: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookingList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookingList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.bookings = action.payload;
      })
      .addCase(bookingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch booking list";
      })
      .addCase(bookGround.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookGround.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.bookings = action.payload;
      })
      .addCase(bookGround.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch booking list";
      })
      .addCase(userBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(userBookings.rejected, (state, action) => {
        action.loading = false;
        state.error = action.payload?.message || "Failed to fetch booking list";
      })
      .addCase(cancelFutsalBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelFutsalBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(cancelFutsalBooking.rejected, (state, action) => {
        action.loading = false;
        state.error = action.payload?.message || "Failed to cancel Booking";
      })
      .addCase(getListOfChallenges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListOfChallenges.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(getListOfChallenges.rejected, (state, action) => {
        action.loading = false;
        state.error =
          action.payload?.message || "Failed to get list of challenge data";
      })
      .addCase(acceptChallenge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptChallenge.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(acceptChallenge.rejected, (state, action) => {
        action.loading = false;
        state.error = action.payload?.message || "Failed to accept challenge";
      })
      .addCase(getMyChallenge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyChallenge.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(getMyChallenge.rejected, (state, action) => {
        action.loading = false;
        state.error = action.payload?.message || "Failed to get My Challenge";
      })
      .addCase(cancelFutsalChallenge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelFutsalChallenge.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.bookings = action.payload;
      })
      .addCase(cancelFutsalChallenge.rejected, (state, action) => {
        action.loading = false;
        state.error = action.payload?.message || "Failed to cancel Challenge";
      });
  },
});

export default bookingSlice.reducer;
