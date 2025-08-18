import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const generateOTP = createAsyncThunk(
  "reset/generatOTP",
  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/opt/generate/${userEmail}`,
        {}
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      const errorStatus = error.response?.status;
      return rejectWithValue({
        message: errorMessage,
        status: errorStatus,
      });
    }
  }
);

export const validateOTP = createAsyncThunk(
  "reset/validateOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    const strOTP = otp.join("");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/opt/validate/${email}/${strOTP}`,
        {}
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      const errorStatus = error.response?.status;
      return rejectWithValue({
        message: errorMessage,
        status: errorStatus,
      });
    }
  }
);

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/changePasswordFromOTP",
        value
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      const errorStatus = error.response?.status;
      return rejectWithValue({
        message: errorMessage,
        status: errorStatus,
      });
    }
  }
);
