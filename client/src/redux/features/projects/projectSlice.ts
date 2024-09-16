import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../../types/projectTypes";

interface ProjectState {
  project: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  project: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,

  reducers: {
    setProject: (state, action: PayloadAction<Project | null>) => {
      state.project = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProject, setLoading, setError } = projectSlice.actions;

export default projectSlice.reducer;
