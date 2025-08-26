import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./AuthThunks";

// ✅ Fixed Initial State
const initialState = {
  user: null,
  jwt: null,
  loading: false,
  error: null,
  success: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.jwt = null;
      state.error = null;
      state.success = false;
      localStorage.clear();
    },
    clearError: (state) => {
      state.error = null;
    },
    setJwt: (state) => {
      state.jwt = localStorage.getItem("JWT_TOKEN");
    },
    setSuccess: (state) => {
      state.success = true;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setloading: (state) => {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
        state.success = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.token;
        state.success = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
        state.success = false;
      });
  },
});

export const {
  setUser,
  logout,
  clearError,
  clearSuccess,
  setSuccess,
  setJwt,
  setloading,
  clearLoading,
} = authSlice.actions;
export default authSlice.reducer;
