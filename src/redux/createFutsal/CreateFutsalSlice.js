import { createSlice } from "@reduxjs/toolkit";
import { createFutsal, ownerFutsal } from "./CreateFutsalThunks";

const initialState = {
  futsalDetail: "",
  futsalLoading: false,
  error: null,
};

const createFutsalSlice = createSlice({
  name: "createFutsal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFutsal.pending, (state) => {
        state.futsalLoading = true;
      })
      .addCase(createFutsal.fulfilled, (state, action) => {
        state.futsalLoading = false;
        state.futsalDetail = action.payload;
      })
      .addCase(createFutsal.rejected, (state, action) => {
        state.futsalLoading = false;
        state.error = action.payload?.message || "failed to create futsal";
      })
      .addCase(ownerFutsal.pending, (state) => {
        state.futsalLoading = true;
      })
      .addCase(ownerFutsal.fulfilled, (state, action) => {
        state.futsalLoading = false;
        state.futsalDetail = action.payload;
      })
      .addCase(ownerFutsal.rejected, (state, action) => {
        state.futsalLoading = false;
        state.error = action.payload?.message || "failed to create futsal";
      });
  },
});
export default createFutsalSlice.reducer;
