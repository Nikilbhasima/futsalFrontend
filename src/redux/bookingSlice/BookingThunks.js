import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("JWT_TOKEN");

export const bookingList = createAsyncThunk(
  "book/bookingList",
  async ({ groundId, bookingDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/bookings/getFutsalSlot/${groundId}/${bookingDate}`
      );
      console.log(response.data);
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

export const bookGround = createAsyncThunk(
  "book/bookGround",
  async ({ bookingDetail, id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/bookings/bookFutsal/${id}`
      );
      console.log("is ground booked:", response);
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
