import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Router } from "./router/Route";
import { HashRouter } from "react-router-dom";

const RouteManager = () => {
  return (
    <HashRouter>
      <ToastContainer />
      <Router />
    </HashRouter>
  );
};

const App = () => {
  return RouteManager();
};

export default App;
