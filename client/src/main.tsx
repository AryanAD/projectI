import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

// App and CSS
import App from "./App.tsx";
import "./index.css";

// Redux
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

// Necessary Imports
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Homepage from "./pages/home/Homepage.tsx";

// Create Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Homepage />} />
    </Route>
  )
);

// App
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
