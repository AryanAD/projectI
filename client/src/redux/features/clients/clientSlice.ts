import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../../../types/clientTypes";

interface ClientState {
  client: Client | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  client: null,
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,

  reducers: {
    setClient: (state, action: PayloadAction<Client | null>) => {
      state.client = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setClient, setLoading, setError } = clientSlice.actions;

export default clientSlice.reducer;
