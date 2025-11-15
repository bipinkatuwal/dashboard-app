import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { DummyJsonResponse, UsersState } from "../../types/user";

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  searchQuery: "",
  page: 1,
  usersPerPage: 10,
  totalUsers: 0,
};

export const fetchUserData = createAsyncThunk(
  "users/fetchUsers",
  async (
    { page = 1, limit = 10 }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const skip = (page - 1) * limit;

      const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: DummyJsonResponse = await response.json();
      console.log("Fetched users:", data);

      return {
        users: data.users,
        total: data.total,
        page,
      };
    } catch (error: any) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message || "Failed to fetch user data");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = Number(action.payload);
    },
    clearUserDataError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.total;
        state.page = action.payload.page;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch users";
      });
  },
});

export const { setSearchQuery, setPage, clearUserDataError } =
  usersSlice.actions;
export default usersSlice.reducer;
