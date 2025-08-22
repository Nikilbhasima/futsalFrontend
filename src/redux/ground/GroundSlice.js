import { createSlice } from "@reduxjs/toolkit";
import { addGround, editGroundDetail, getGroundList } from "./GroundThunks";

const initialState = {
  groundLoading: false,
  error: null,
  groundDetail: null,
};
const groundSlice = createSlice({
  name: "ground",
  initialState,
  reducers: {
    setGroundDetail: (state, action) => {
      console.log("is there data in action.payload:", action.payload);
      state.groundDetail = action.payload;
    },
    clearGroundDetail: (state) => {
      state.groundDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGround.pending, (state) => {
        state.groundLoading = true;
        state.error = null;
      })
      .addCase(addGround.fulfilled, (state, action) => {
        state.groundLoading = false;
        // state.groundDetail = action.payload;
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
        // state.groundDetail = action.payload;
        state.error = null;
      })
      .addCase(getGroundList.rejected, (state, action) => {
        state.groundLoading = false;
        state.error = action.payload?.message || "Fail to get ground";
      })
      .addCase(editGroundDetail.pending, (state) => {
        state.groundLoading = true;
        state.error = null;
      })
      .addCase(editGroundDetail.fulfilled, (state, action) => {
        state.groundLoading = false;
        // state.groundDetail = action.payload;
        state.error = null;
      })
      .addCase(editGroundDetail.rejected, (state, action) => {
        state.groundLoading = false;
        state.error = action.payload?.message || "Fail to edit ground";
      });
  },
});
export const { setGroundDetail, clearGroundDetail } = groundSlice.actions;
export default groundSlice.reducer;
