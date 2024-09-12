import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: [],
  password: [],
  role: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setName, setPassword, setRole } = userSlice.actions;

export default userSlice.reducer;
