import { createAsyncThunk } from "@reduxjs/toolkit";
import type { DummyJsonResponse } from "../../types/user";

export const fetchUserData = createAsyncThunk(
  "users/fetchUsers",
  async (
    {
      page = 1,
      limit = 10,
      searchQuery = "",
    }: { page: number; limit: number; searchQuery?: string },
    { rejectWithValue }
  ) => {
    try {
      let url: string;

      if (searchQuery.trim()) {
        // When searching, fetch all users and filter on the server side
        url = `https://dummyjson.com/users/search?q=${encodeURIComponent(
          searchQuery
        )}`;
      } else {
        // Normal pagination
        const skip = (page - 1) * limit;
        url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: DummyJsonResponse = await response.json();

      return {
        users: data.users,
        total: data.total,
        page,
        isSearch: !!searchQuery.trim(),
      };
    } catch (error: any) {
      console.error("Fetch error:", error);
      return rejectWithValue(error.message || "Failed to fetch user data");
    }
  }
);
