import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const initiatePayment = createAsyncThunk(
  "payment/initiatePayment",
  async ({ formData, bookingId }, { rejectWithValue }) => {
    const token = localStorage.getItem("JWT_TOKEN");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/payments/initiate/${bookingId}`,
        formData,
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

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (transactionUuid, { rejectWithValue }) => {
    const token = localStorage.getItem("JWT_TOKEN");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/payments/verify/${transactionUuid}`,
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
