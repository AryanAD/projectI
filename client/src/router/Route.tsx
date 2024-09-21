import { Navigate, Route, Routes } from "react-router";

import ErrorDisplay from "../pages/error/ErrorDisplay";
import Navigation from "../pages/home/Navigation";
import Homepage from "../pages/home/Homepage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route
          errorElement={<ErrorDisplay />}
          path="/"
          element={
            // <AuthWrapper>
            <Navigation />
            // </AuthWrapper>
          }
        >
          <Route index={true} path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

// const AuthWrapper = ({ children }) => {
//   const token = localStorage.getItem("token");

//   if (token === null) return <Navigate to={"/login"} />;

//   return token && children;
// };
