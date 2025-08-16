import { createSlice } from "@reduxjs/toolkit";
import { editUserDetail, getUserDetail } from "./AccountManagementThunks";

const initialState = {
  userDetail: null,
  loadingUserData: false,
  error: null,
};

const accountManagementSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetail.pending, (state) => {
        state.loadingUserData = true;
        state.error = null;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.loadingUserData = false;
        state.error = null;
        state.userDetail = action.payload;
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        state.loadingUserData = false;
        state.error = action.payload?.message || "Failed to fetch booking list";
      })
      .addCase(editUserDetail.pending, (state) => {
        state.loadingUserData = true;
        state.error = null;
      })
      .addCase(editUserDetail.fulfilled, (state, action) => {
        state.loadingUserData = false;
        state.error = null;
        state.userDetail = action.payload;
      })
      .addCase(editUserDetail.rejected, (state, action) => {
        state.loadingUserData = true;
        state.error = null;
      });
  },
});

export default accountManagementSlice.reducer;
