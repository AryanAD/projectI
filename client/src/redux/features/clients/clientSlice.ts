import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: [],
  description: [],
};

const clientSlice = createSlice({
  name: "clients",
  initialState,

  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setName, setDescription } = clientSlice.actions;

export default clientSlice.reducer;
