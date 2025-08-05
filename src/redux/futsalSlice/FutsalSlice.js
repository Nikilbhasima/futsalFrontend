import { createSlice } from "@reduxjs/toolkit";
import { clearError, clearSuccess, setSuccess } from "../authSlice/AuthSlice";
import { futsalList, futsalById } from "./FutsalThunks";

const initialState = {
  futsal: null,
  loading: false,
  error: null,
};

const futsalSlice = createSlice({
  name: "futsal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(futsalList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(futsalList.fulfilled, (state, action) => {
        state.futsal = action.payload;
        state.loading = false;
      })
      .addCase(futsalList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(futsalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(futsalById.fulfilled, (state, action) => {
        state.futsal = action.payload;
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
