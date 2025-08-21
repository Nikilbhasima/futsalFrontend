import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const createFutsal = createAsyncThunk(
  "createFutsal/addFutsal",
  async (value, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.post(
        "http://localhost:8080/api/futsal/addFutsal",
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

export const ownerFutsal = createAsyncThunk(
  "createFutsal/ownerFutsal",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("JWT_TOKEN");

    try {
      const response = await axios.get(
        "http://localhost:8080/api/futsal/getFutsal",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("trying to fetch futsal data:", response.data);
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
