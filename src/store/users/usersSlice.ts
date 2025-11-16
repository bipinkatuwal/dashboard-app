import { createSlice } from "@reduxjs/toolkit";
import type { UsersState } from "../../types/user";
import { fetchUserData } from "./userThunks";

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  searchQuery: "",
  page: 1,
  usersPerPage: 10,
  totalUsers: 0,
};

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
