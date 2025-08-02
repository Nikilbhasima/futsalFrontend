import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// accessing jwt token
const token = localStorage.getItem("JWT_TOKEN");
export const futsalList = createAsyncThunk(
  "futsal/futsalList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/futsal/getAllFutsal",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Return the data so it can be used in your reducer
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      const errorStatus = error.response?.status;

      // Return the rejected value
      return rejectWithValue({
        message: errorMessage,
        status: errorStatus,
      });
    }
  }
);

export const futsalById = createAsyncThunk(
  "futsal/futsalById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/futsal/getFutsalById/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
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
