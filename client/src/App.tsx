import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Router } from "./router/Route";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
