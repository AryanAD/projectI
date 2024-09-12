import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: [],
  description: [],
  assignedTo: [],
  status: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setAssignedTo: (state, action) => {
      state.assignedTo = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setName, setDescription, setAssignedTo, setStatus } =
  taskSlice.actions;

export default taskSlice.reducer;
