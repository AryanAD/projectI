import { Navigate, Route, Routes } from "react-router";

import ErrorDisplay from "../pages/error/ErrorDisplay";

import Navigation from "../components/dashboard/Navigation";
import Homepage from "../pages/home/Homepage";

import Login from "../pages/auth/Login";

import Users from "../pages/users/index";
import AddUsers from "../pages/users/AddUsers";
import SingleUser from "../pages/users/SingleUser";
import UsersTable from "../components/users/UsersTable";
import EditSingleUser from "../pages/users/EditSingleUser";

import Clients from "../pages/clients/index";
import AddClients from "../pages/clients/AddClients";
import SingleClient from "../pages/clients/SingleClient";
import ClientsTable from "../components/clients/ClientsTable";
import EditSingleClient from "../pages/clients/EditSingleClient";

import ClientCategories from "../pages/clients/categories/index";
import AddClientCategories from "../pages/clients/categories/AddCategories";
import EditClientCategory from "../pages/clients/categories/EditSingleCategory";
import ClientCategoryTable from "../components/clients/categories/CategoryTable";

import Projects from "../pages/projects/index";
import AddProjects from "../pages/projects/AddProjects";
import SingleProject from "../pages/projects/SingleProject";
import ProjectsTable from "../components/projects/ProjectsTable";
import EditSingleProject from "../pages/projects/EditSingleProject";

import ProjectCategories from "../pages/projects/categories/index";
import AddProjectCategories from "../pages/projects/categories/AddCategories";
import EditProjectCategory from "../pages/projects/categories/EditSingleCategory";
import ProjectCategoryTable from "../components/projects/categories/CategoryTable";

import Tasks from "../pages/tasks/index";
import Profile from "../pages/Profile";

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

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Users */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<SingleUser />} />
          <Route path="/add-users" element={<AddUsers />} />
          <Route path="/manage-users" element={<UsersTable />} />
          <Route path="/edit-user/:id" element={<EditSingleUser />} />

          {/* Clients */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<SingleClient />} />
          <Route path="/add-clients" element={<AddClients />} />
          <Route path="/manage-clients" element={<ClientsTable />} />
          <Route path="/edit-clients/:id" element={<EditSingleClient />} />

          {/* Clients Categories*/}
          <Route path="/client-categories" element={<ClientCategories />} />
          <Route
            path="/add-client-category"
            element={<AddClientCategories />}
          />
          <Route
            path="/manage-client-category"
            element={<ClientCategoryTable />}
          />
          <Route
            path="/edit-client-category/:id"
            element={<EditClientCategory />}
          />

          {/* Projects */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<SingleProject />} />
          <Route path="/add-projects" element={<AddProjects />} />
          <Route path="/manage-projects" element={<ProjectsTable />} />
          <Route path="/edit-projects/:id" element={<EditSingleProject />} />

          {/* Projects Categories*/}
          <Route path="/project-categories" element={<ProjectCategories />} />
          <Route
            path="/add-project-category"
            element={<AddProjectCategories />}
          />
          <Route
            path="/manage-project-category"
            element={<ProjectCategoryTable />}
          />
          <Route
            path="/edit-project-category/:id"
            element={<EditProjectCategory />}
          />

          {/* Tasks */}
          <Route path="/tasks" element={<Tasks />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorDisplay />} />
      </Routes>
    </>
  );
};

// const AuthWrapper = ({ children }) => {
//   const token = localStorage.getItem("role");

//   if (token === null) return <Navigate to={"/login"} />;

//   return token && children;
// };
