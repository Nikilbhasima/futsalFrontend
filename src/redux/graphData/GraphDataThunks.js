import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBargraphData = createAsyncThunk(
  "graph/getBargraphData",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("JWT_TOKEN");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/dataForGraph/getBarGraphData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("is graph data available:", response.data);
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

export const getPieChartData = createAsyncThunk(
  "graph/getPieChartData",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("JWT_TOKEN");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/dataForGraph/getDataForPieChart",
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
