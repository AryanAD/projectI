import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import authReducer from "./features/auth/authSlice";
import usersReducer from "./features/users/userSlice";
import clientsReducer from "./features/clients/clientSlice";
import tasksReducer from "./features/tasks/taskSlice";
import projectsReducer from "./features/projects/projectSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    users: usersReducer,
    clients: clientsReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
