import { Navigate, Route, Routes } from "react-router";

import ErrorDisplay from "../pages/error/ErrorDisplay";

import Navigation from "../pages/home/Navigation";
import Homepage from "../pages/home/Homepage";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Users from "../pages/users/index";
import AddUsers from "../pages/users/AddUsers";
import UsersTable from "../pages/users/UsersTable";

import Clients from "../pages/clients";
import AddClients from "../pages/clients/AddClients";
import ManageClients from "../pages/clients/ManageClients";

import Projects from "../pages/projects";
import AddProjects from "../pages/projects/AddProjects";
import ManageProjects from "../pages/projects/ManageProjects";

import Tasks from "../pages/tasks";
import ManageTasks from "../pages/tasks/ManageTasks";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            // <AuthWrapper>
            <Navigation />
            // </AuthWrapper>
          }
        >
          <Route index={true} path="" element={<Homepage />} />

          {/* Users */}
          <Route path="/users" element={<Users />} />
          <Route path="/add-users" element={<AddUsers />} />
          <Route path="/manage-users" element={<UsersTable />} />

          {/* Clients */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/add-clients" element={<AddClients />} />
          <Route path="/manage-clients" element={<ManageClients />} />

          {/* Projects */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/add-projects" element={<AddProjects />} />
          <Route path="/manage-projects" element={<ManageProjects />} />

          {/* Tasks */}
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/manage-tasks" element={<ManageTasks />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorDisplay />} />
      </Routes>
    </>
  );
};

// const AuthWrapper = ({ children }) => {
//   const token = localStorage.getItem("token");

//   if (token === null) return <Navigate to={"/login"} />;

//   return token && children;
// };
