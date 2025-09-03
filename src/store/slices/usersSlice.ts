import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type User = {
  id: number;
  name: string;
  email: string;
  [k: string]: any;
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data: User[] = await res.json();
      await AsyncStorage.setItem("cachedUsers", JSON.stringify(data));
      return data;
    } catch (err) {
      try {
        const cached = await AsyncStorage.getItem("cachedUsers");
        console.log(cached, "user in ofline mode");
        if (cached) return JSON.parse(cached) as User[];
        return rejectWithValue("No cached data");
      } catch (e) {
        return rejectWithValue("Failed to fetch users");
      }
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [] as User[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchUsers.rejected, (s, a) => {
        s.loading = false;
        s.error = (a.payload as string) || "Error";
      });
  },
});

export default usersSlice.reducer;
