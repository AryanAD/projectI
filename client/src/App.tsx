import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navigation from "./components/dashboard/Navigation";
import { useLocation } from "react-router";
import Login from "./pages/auth/Login";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <ToastContainer />
      {currentPath.includes("login") ? <Login /> : <Navigation />}
    </>
  );
}

export default App;
