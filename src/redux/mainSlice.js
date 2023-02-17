import { createSlice } from "@reduxjs/toolkit";

// my slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    profiles: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.profiles = action.payload.profiles;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export const users = (state) => state.usersSlice.profiles;

export default usersSlice.reducer;
