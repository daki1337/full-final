import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAdminStats } from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const getAdminStatsThunk = createAsyncThunk(
  "stats/getAdminStatsThunk",
  async (_, thunkAPI) => {
    try {
      const response = await getAdminStats();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    stats: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdminStatsThunk.pending, pendingCase);
    builder.addCase(getAdminStatsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.stats = action.payload;
    });
    builder.addCase(getAdminStatsThunk.rejected, rejectedCase);
  },
});

export default statsSlice.reducer;
