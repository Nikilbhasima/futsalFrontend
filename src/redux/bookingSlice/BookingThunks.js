import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const token = localStorage.getItem("JWT_TOKEN");

export const bookingList = createAsyncThunk(
  "book/bookingList",
  async ({ groundId, bookingDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/bookings/getFutsalSlot/${groundId}/${bookingDate}`
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

export const bookGround = createAsyncThunk(
  "book/bookGround",
  async ({ bookingDetail, groundId }, { rejectWithValue }) => {
    const token = localStorage.getItem("JWT_TOKEN");
    console.log(bookingDetail, ":", groundId);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/bookings/bookFutsal/${groundId}`,
        bookingDetail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
