import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";

import AdminRoutes from "../pages/auth/admin/AdminRoutes";

import Homepage from "../pages/home/Homepage";
import Profile from "../pages/Profile";

import ErrorDisplay from "../pages/error/ErrorDisplay";
import Login from "../pages/auth/Login";

import Users from "../pages/users";
import SingleUser from "../pages/users/SingleUser";
import AddUsers from "../pages/users/AddUsers";
import EditSingleUser from "../pages/users/EditSingleUser";

import Clients from "../pages/clients";
import SingleClient from "../pages/clients/SingleClient";
import AddClients from "../pages/clients/AddClients";
import EditSingleClient from "../pages/clients/EditSingleClient";
import ClientCategories from "../pages/clients/categories";
import AddClientCategories from "../pages/clients/categories/AddCategories";
import EditClientCategory from "../pages/clients/categories/EditSingleCategory";

import Projects from "../pages/projects";
import SingleProject from "../pages/projects/SingleProject";
import AddProjects from "../pages/projects/AddProjects";
import EditSingleProject from "../pages/projects/EditSingleProject";
import ProjectCategories from "../pages/projects/categories";
import AddProjectCategories from "../pages/projects/categories/AddCategories";
import EditProjectCategory from "../pages/projects/categories/EditSingleCategory";

import Tasks from "../pages/tasks";
import SingleTask from "../pages/tasks/SingleTask";
import AddTask from "../pages/tasks/AddTasks";
import EditSingleTask from "../pages/tasks/EditSingleTask";
import Navigation from "../components/dashboard/Navigation";

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route errorElement={<ErrorDisplay />} element={<App />} />,
    <Route path="login" element={<Login />} />,
    <Route path="/" element={<Navigation />}>
      <Route index path="" element={<Homepage />} />
      <Route path="profile" element={<Profile />} />

      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<SingleUser />} />
        <Route path="add-users" element={<AddUsers />} />
        <Route path="edit-users/:id" element={<EditSingleUser />} />

        <Route path="clients" element={<Clients />} />
        <Route path="clients/:id" element={<SingleClient />} />
        <Route path="add-clients" element={<AddClients />} />
        <Route path="edit-clients/:id" element={<EditSingleClient />} />

        <Route path="client-categories" element={<ClientCategories />} />
        <Route path="add-client-category" element={<AddClientCategories />} />
        <Route
          path="edit-client-category/:id"
          element={<EditClientCategory />}
        />

        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<SingleProject />} />
        <Route path="add-projects" element={<AddProjects />} />
        <Route path="edit-projects/:id" element={<EditSingleProject />} />

        <Route path="project-categories" element={<ProjectCategories />} />
        <Route path="add-project-category" element={<AddProjectCategories />} />
        <Route
          path="edit-project-category/:id"
          element={<EditProjectCategory />}
        />

        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks/:id" element={<SingleTask />} />
        <Route path="add-tasks" element={<AddTask />} />
        <Route path="edit-tasks/:id" element={<EditSingleTask />} />
      </Route>
    </Route>,
  ])
);
