import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserDetail = createAsyncThunk(
  "account/getUserDetail",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.get(
        "http://localhost:8080/api/user/getUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("get user detail:", response.data);
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

export const editUserDetail = createAsyncThunk(
  "account/editUserDetail",
  async (editData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const response = await axios.post(
        "http://localhost:8080/api/user/editUserDetails",
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("edit response:", response.data);
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

export const changePassword = createAsyncThunk(
  "account/changePassword",
  async (value, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      const payload = {
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
      };
      const response = await axios.post(
        "http://localhost:8080/api/user/changePassword",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("change password response", response.data);
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
