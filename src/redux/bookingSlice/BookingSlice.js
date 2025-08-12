import { createSlice } from "@reduxjs/toolkit";
import {
  bookGround,
  bookingList,
  cancelFutsalBooking,
  getListOfChallenges,
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
      });
  },
});

export default bookingSlice.reducer;
