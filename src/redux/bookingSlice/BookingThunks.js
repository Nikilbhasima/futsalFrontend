import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const userBookings = createAsyncThunk(
  "book/userBookings",
  async (bookingType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.get(
        `http://localhost:8080/api/bookings/getBookingsByUserId/${bookingType}`,
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

export const cancelFutsalBooking = createAsyncThunk(
  "book/cancelFutsalBooking",
  async (futsalById, { rejectWithValue }) => {
    const token = localStorage.getItem("JWT_TOKEN");
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/bookings/cancalFutsalBooking/${futsalById}`,
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

export const getListOfChallenges = createAsyncThunk(
  "book/getListOfChallenge",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/bookings/getListOfFutsalChallenge"
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

export const acceptChallenge = createAsyncThunk(
  "book/acceptChallenge",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.post(
        `http://localhost:8080/api/bookings/acceptChallenge/${id}`,
        {},
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

export const getMyChallenge = createAsyncThunk(
  "book/getMyChallenge",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.get(
        "http://localhost:8080/api/bookings/getMyChallenge",
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

export const cancelFutsalChallenge = createAsyncThunk(
  "book/cancelFutsalChallenge",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.delete(
        `http://localhost:8080/api/bookings/cancelFutsalChallenge/${id}`,
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

export const updatePhysicalPayment = createAsyncThunk(
  "book/updatePhysicalPayment",
  async (bookidId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.post(
        `http://localhost:8080/api/bookings/updatePhysicalPayment/${bookidId}`,
        {},
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

export const getNumberOfBooking = createAsyncThunk(
  "book/getNumberOfBooking",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.get(
        "http://localhost:8080/api/bookings/getUserBookingsNumbers",
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

export const getAdminBookingNumber = createAsyncThunk(
  "book/getAdminBookingNumber",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.get(
        "http://localhost:8080/api/bookings/getDataForAdmin",
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
