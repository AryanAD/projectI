import { Navigate, Outlet } from "react-router-dom";

const StaffRoutes = () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token || userRole !== "staff") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default StaffRoutes;
