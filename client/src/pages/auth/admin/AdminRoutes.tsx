import { Navigate, Outlet } from "react-router";
import ErrorDisplay from "../../error/ErrorDisplay";

const AdminRoutes = () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (userRole !== "admin") {
    return <ErrorDisplay />;
  }

  if (!token || !userRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoutes;
