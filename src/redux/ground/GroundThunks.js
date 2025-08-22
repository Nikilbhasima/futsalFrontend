import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addGround = createAsyncThunk(
  "ground/addGround",
  async (value, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.post(
        "http://localhost:8080/api/ground/addGround",
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

export const getGroundList = createAsyncThunk(
  "ground/getGroundList",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("JWT_TOKEN");
    try {
      const resonse = await axios.get(
        "http://localhost:8080/api/ground/getGround",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resonse.data;
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

export const editGroundDetail = createAsyncThunk(
  "ground/editGroundDetail",
  async (value, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.post(
        "http://localhost:8080/api/ground/editGroundDetail",
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
