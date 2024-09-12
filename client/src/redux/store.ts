import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import tasksReducer from "./features/tasks/taskSlice";
import usersReducer from "./features/users/userSlice";
import clientsReducer from "./features/clients/clientSlice";
import projectsReducer from "./features/projects/projectSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
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
