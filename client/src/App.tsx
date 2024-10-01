import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Router } from "./router/Route";
import { BrowserRouter } from "react-router-dom";

const RouteManager = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Router />
    </BrowserRouter>
  );
};

const App = () => {
  return RouteManager();
};

export default App;
