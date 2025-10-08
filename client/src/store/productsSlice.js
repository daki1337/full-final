import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getSaleProducts,
  searchProducts,
  updateProduct,
} from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const getProductByIdThunk = createAsyncThunk(
  "products/getProductByIdThunk",
  async (id, thunkAPI) => {
    try {
      const response = await getProductById(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getAllProductsThunk = createAsyncThunk(
  "products/getAllProductsThunk",
  async ({ filters, pagination }, thunkAPI) => {
    try {
      const response = await getAllProducts(filters, pagination);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "products/createProductThunk",
  async (values, thunkAPI) => {
    try {
      const response = await createProduct(values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "products/updateProductThunk",
  async ({ id, values }, thunkAPI) => {
    try {
      const response = await updateProduct(id, values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProductThunk",
  async (id, thunkAPI) => {
    try {
      const response = await deleteProduct(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const searchProductsThunk = createAsyncThunk(
  "products/searchProductsThunk",
  async ({ title, pagination }, thunkAPI) => {
    try {
      const response = await searchProducts(title, pagination);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const getSaleProductsThunk = createAsyncThunk(
  "products/getSaleProductsThunk",
  async ({ pagination }, thunkAPI) => {
    try {
      const response = await getSaleProducts(pagination);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    totalProducts: 0,
    selectedProduct: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProductThunk.pending, pendingCase);
    builder.addCase(createProductThunk.rejected, rejectedCase);
    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products.push(action.payload);
    });

    builder.addCase(updateProductThunk.pending, pendingCase);
    builder.addCase(updateProductThunk.rejected, rejectedCase);
    builder.addCase(updateProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });

    builder.addCase(deleteProductThunk.pending, pendingCase);
    builder.addCase(deleteProductThunk.rejected, rejectedCase);
    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    });

    builder.addCase(getAllProductsThunk.pending, pendingCase);
    builder.addCase(getAllProductsThunk.rejected, rejectedCase);
    builder.addCase(getAllProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload.data;
      state.totalProducts = action.payload.totalProducts;
    });

    builder.addCase(getProductByIdThunk.pending, pendingCase);
    builder.addCase(getProductByIdThunk.rejected, rejectedCase);
    builder.addCase(getProductByIdThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.selectedProduct = action.payload;
    });

    builder.addCase(searchProductsThunk.pending, pendingCase);
    builder.addCase(searchProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload.data;
      state.totalProducts = action.payload.totalProducts;
    });
    builder.addCase(searchProductsThunk.rejected, rejectedCase);

    builder.addCase(getSaleProductsThunk.pending, pendingCase);
    builder.addCase(getSaleProductsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload.data;
      state.totalProducts = action.payload.totalProducts;
    });
    builder.addCase(getSaleProductsThunk.rejected, rejectedCase);
  },
});

export default productsSlice.reducer;
