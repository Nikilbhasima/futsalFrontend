import { createSlice } from "@reduxjs/toolkit";
import { getBargraphData, getPieChartData } from "./GraphDataThunks";

const initialState = {
  barGraphData: null,
  error: null,
  graphLoading: false,
};

const graphDataSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBargraphData.pending, (state) => {
        state.graphLoading = true;
      })
      .addCase(getBargraphData.fulfilled, (state, action) => {
        state.graphLoading = false;
        state.getBargraphData = action.payload;
      })
      .addCase(getBargraphData.rejected, (state, action) => {
        state.graphLoading = false;
        state.error = action.payload?.message || "Fail to get graph data";
      })
      .addCase(getPieChartData.pending, (state) => {
        state.graphLoading = true;
      })
      .addCase(getPieChartData.fulfilled, (state, action) => {
        state.graphLoading = false;
        state.getBargraphData = action.payload;
      })
      .addCase(getPieChartData.rejected, (state, action) => {
        state.graphLoading = false;
        state.error = action.payload?.message || "Fail to get graph data";
      });
  },
});

export default graphDataSlice.reducer;
