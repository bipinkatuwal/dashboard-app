import { createAsyncThunk } from "@reduxjs/toolkit";
import type { DummyJsonResponse } from "../../types/user";

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
