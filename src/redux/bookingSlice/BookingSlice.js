import { createSlice } from "@reduxjs/toolkit";
import { bookingList } from "./BookingThunks";

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
      });
  },
});

export default bookingSlice.reducer;
