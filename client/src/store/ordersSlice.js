import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getAccountOrders,
  getOrderById,
  getOrdersForAdmin,
  updateOrderStatus,
} from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const getOrderByIdThunk = createAsyncThunk(
  "orders/getOrderById",
  async (id, thunkAPI) => {
    try {
      const response = await getOrderById(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAccountOrdersThunk = createAsyncThunk(
  "orders/getAccountOrdersThunk",
  async (_, thunkAPI) => {
    try {
      const response = await getAccountOrders();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrdersForAdminThunk = createAsyncThunk(
  "orders/getOrdersForAdminThunk",
  async (options, thunkAPI) => {
    try {
      const response = await getOrdersForAdmin(options);
      return {
        data: response.data.data,
        totalOrders: response.data.totalOrders,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createOrderThunk = createAsyncThunk(
  "orders/createOrderThunk",
  async (values, thunkAPI) => {
    try {
      const response = await createOrder(values);
      return response.data.data;
    } catch (error) {
      const msg = error.response.data.errors[0];
      console.log(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const updateOrderStatusThunk = createAsyncThunk(
  "orders/updateOrderStatusThunk",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await updateOrderStatus(id, status);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  orders: [],
  ordersAccount: [],
  totalOrders: 0,
  selectedOrder: null,
  error: null,
  isLoading: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrders: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersForAdminThunk.pending, pendingCase);
    builder.addCase(getOrdersForAdminThunk.rejected, rejectedCase);
    builder.addCase(getOrdersForAdminThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload.data;
      state.totalOrders = action.payload.totalOrders;
    });
    builder.addCase(createOrderThunk.pending, pendingCase);
    builder.addCase(createOrderThunk.rejected, rejectedCase);
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orders.push(action.payload);
    });

    builder.addCase(updateOrderStatusThunk.pending, pendingCase);
    builder.addCase(updateOrderStatusThunk.rejected, rejectedCase);
    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.orders.findIndex(
        (order) => order._id === action.payload._id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    });
    builder.addCase(getAccountOrdersThunk.pending, pendingCase);
    builder.addCase(getAccountOrdersThunk.rejected, rejectedCase);
    builder.addCase(getAccountOrdersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.ordersAccount = action.payload;
    });
    builder.addCase(getOrderByIdThunk.pending, pendingCase);
    builder.addCase(getOrderByIdThunk.rejected, rejectedCase);
    builder.addCase(getOrderByIdThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.selectedOrder = action.payload;
    });
  },
});

export const { resetOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
