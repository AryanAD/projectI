import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: [],
  description: [],
  status: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,

  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setName, setDescription, setStatus } = projectSlice.actions;

export default projectSlice.reducer;
