import { createSlice } from "@reduxjs/toolkit";
import { addGround, getGroundList } from "./GroundThunks";

const initialState = {
  groundLoading: false,
  error: null,
  groundDetail: null,
};
const groundSlice = createSlice({
  name: "ground",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGround.pending, (state) => {
        state.groundLoading = true;
        state.error = null;
      })
      .addCase(addGround.fulfilled, (state, action) => {
        state.groundLoading = false;
        state.groundDetail = action.payload;
        state.error = null;
      })
      .addCase(addGround.rejected, (state, action) => {
        state.groundLoading = false;
        state.error = action.payload?.message || "Fail to add ground";
      })
      .addCase(getGroundList.pending, (state) => {
        state.groundLoading = true;
        state.error = null;
      })
      .addCase(getGroundList.fulfilled, (state, action) => {
        state.groundLoading = false;
        state.groundDetail = action.payload;
        state.error = null;
      })
      .addCase(getGroundList.rejected, (state, action) => {
        state.groundLoading = false;
        state.error = action.payload?.message || "Fail to get ground";
      });
  },
});

export default groundSlice.reducer;
