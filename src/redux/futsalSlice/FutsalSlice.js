import { createSlice } from "@reduxjs/toolkit";
import { clearError, clearSuccess, setSuccess } from "../authSlice/AuthSlice";
import { futsalList, futsalById } from "./FutsalThunks";

const initialState = {
  futsal: null,
  loading: false,
  error: null,
  success: false,
};

const futsalSlice = createSlice({
  name: "futsal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(futsalList.pending, (state) => {
        state.loading = true;
        state.success = true;
        state.error = null;
      })
      .addCase(futsalList.fulfilled, (state, action) => {
        state.futsal = action.payload;
        console.log("futsal Data", action.payload);
        state.success = false;
        state.loading = false;
      })
      .addCase(futsalList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(futsalById.pending, (state) => {
        state.loading = true;
        state.success = true;
        state.error = null;
      })
      .addCase(futsalById.fulfilled, (state, action) => {
        state.futsal = action.payload;
        console.log("mic check:", action.payload);
        state.success = false;
        state.loading = false;
      })
      .addCase(futsalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { futsal } = futsalSlice.actions;
export default futsalSlice.reducer;
