import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "../../../types/clientTypes";

interface ClientState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients(state, action: PayloadAction<Client[]>) {
      state.clients = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setClients, setLoading, setError } = clientSlice.actions;
export default clientSlice.reducer;
