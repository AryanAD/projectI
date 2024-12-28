// import ReactDOM from "react-dom/client";

// // App and CSS
// import App from "./App";
// import "./index.css";

// // Redux
// import { store } from "./redux/store.ts";
// import { Provider } from "react-redux";

// // Router
// import { Route, RouterProvider, createRoutesFromElements } from "react-router";
// import { createBrowserRouter } from "react-router-dom";

// import ErrorDisplay from "./pages/error/ErrorDisplay";

// import Homepage from "./pages/home/Homepage";

// import Login from "./pages/auth/Login";

// import Users from "./pages/users/index";
// import AddUsers from "./pages/users/AddUsers";
// import SingleUser from "./pages/users/SingleUser";
// import UsersTable from "./components/users/UsersTable";
// import EditSingleUser from "./pages/users/EditSingleUser";

// import Clients from "./pages/clients/index";
// import AddClients from "./pages/clients/AddClients";
// import SingleClient from "./pages/clients/SingleClient";
// import ClientsTable from "./components/clients/ClientsTable";
// import EditSingleClient from "./pages/clients/EditSingleClient";

// import ClientCategories from "./pages/clients/categories/index";
// import AddClientCategories from "./pages/clients/categories/AddCategories";
// import EditClientCategory from "./pages/clients/categories/EditSingleCategory";
// import ClientCategoryTable from "./components/clients/categories/CategoryTable";

// import Projects from "./pages/projects/index";
// import AddProjects from "./pages/projects/AddProjects";
// import SingleProject from "./pages/projects/SingleProject";
// import ProjectsTable from "./components/projects/ProjectsTable";
// import EditSingleProject from "./pages/projects/EditSingleProject";

// import ProjectCategories from "./pages/projects/categories/index";
// import AddProjectCategories from "./pages/projects/categories/AddCategories";
// import EditProjectCategory from "./pages/projects/categories/EditSingleCategory";
// import ProjectCategoryTable from "./components/projects/categories/CategoryTable";

// import Tasks from "./pages/tasks/index";
// import Profile from "./pages/Profile";
// import AdminRoutes from "./pages/auth/admin/AdminRoutes.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { path: "/login", element: <Login /> },
//       { path: "*", element: <ErrorDisplay /> },
//       { index: true, path: "", element: <Homepage /> },
//     ],
//   },
// ]);
// // createRoutesFromElements(
// //   <Route path="/" element={<App />}>
// //     <Route path="/login" element={<Login />} />
// //     <Route path="*" element={<ErrorDisplay />} />
// //     <Route index={true} path="" element={<Homepage />} />

// //     {/* Admin Routes */}
// //     <Route path="/admin" element={<AdminRoutes />}>
// //       <Route path="profile" element={<Profile />} />

// //       <Route path="users" element={<Users />} />
// //       <Route path="users/:id" element={<SingleUser />} />
// //       <Route path="add-users" element={<AddUsers />} />
// //       <Route path="manage-users" element={<UsersTable />} />
// //       <Route path="edit-user/:id" element={<EditSingleUser />} />

// //       <Route path="clients" element={<Clients />} />
// //       <Route path="clients/:id" element={<SingleClient />} />
// //       <Route path="add-clients" element={<AddClients />} />
// //       <Route path="manage-clients" element={<ClientsTable />} />
// //       <Route path="edit-clients/:id" element={<EditSingleClient />} />

// //       <Route path="client-categories" element={<ClientCategories />} />
// //       <Route path="add-client-category" element={<AddClientCategories />} />
// //       <Route path="manage-client-category" element={<ClientCategoryTable />} />
// //       <Route path="edit-client-category/:id" element={<EditClientCategory />} />

// //       <Route path="projects" element={<Projects />} />
// //       <Route path="projects/:id" element={<SingleProject />} />
// //       <Route path="add-projects" element={<AddProjects />} />
// //       <Route path="manage-projects" element={<ProjectsTable />} />
// //       <Route path="edit-projects/:id" element={<EditSingleProject />} />

// //       <Route path="project-categories" element={<ProjectCategories />} />
// //       <Route path="add-project-category" element={<AddProjectCategories />} />
// //       <Route
// //         path="manage-project-category"
// //         element={<ProjectCategoryTable />}
// //       />
// //       <Route
// //         path="edit-project-category/:id"
// //         element={<EditProjectCategory />}
// //       />

// //       <Route path="tasks" element={<Tasks />} />
// //     </Route>
// //   </Route>
// // );

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <Provider store={store}>
//     <RouterProvider router={router} />
//   </Provider>
// );

import ReactDOM from "react-dom/client";

// App and CSS
import App from "./App";
import "./index.css";

// Redux
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

// Router
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import ErrorDisplay from "./pages/error/ErrorDisplay";

import Homepage from "./pages/home/Homepage";
import Login from "./pages/auth/Login";

// Admin Routes
import AdminRoutes from "./pages/auth/admin/AdminRoutes.tsx";
import Profile from "./pages/Profile";

import Users from "./pages/users/index";
import AddUsers from "./pages/users/AddUsers";
import SingleUser from "./pages/users/SingleUser";
import UsersTable from "./components/users/UsersTable";
import EditSingleUser from "./pages/users/EditSingleUser";

import Clients from "./pages/clients/index";
import AddClients from "./pages/clients/AddClients";
import SingleClient from "./pages/clients/SingleClient";
import ClientsTable from "./components/clients/ClientsTable";
import EditSingleClient from "./pages/clients/EditSingleClient";

import ClientCategories from "./pages/clients/categories/index";
import AddClientCategories from "./pages/clients/categories/AddCategories";
import EditClientCategory from "./pages/clients/categories/EditSingleCategory";
import ClientCategoryTable from "./components/clients/categories/CategoryTable";

import Projects from "./pages/projects/index";
import AddProjects from "./pages/projects/AddProjects";
import SingleProject from "./pages/projects/SingleProject";
import ProjectsTable from "./components/projects/ProjectsTable";
import EditSingleProject from "./pages/projects/EditSingleProject";

import ProjectCategories from "./pages/projects/categories/index";
import AddProjectCategories from "./pages/projects/categories/AddCategories";
import EditProjectCategory from "./pages/projects/categories/EditSingleCategory";
import ProjectCategoryTable from "./components/projects/categories/CategoryTable";

import Tasks from "./pages/tasks/index";

// Define the router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route index={true} path="" element={<Homepage />} />
      <Route path="*" element={<ErrorDisplay />} />
      <Route path="admin" element={<AdminRoutes />}>
        <Route path="profile" element={<Profile />} />

        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<SingleUser />} />
        <Route path="add-users" element={<AddUsers />} />
        <Route path="manage-users" element={<UsersTable />} />
        <Route path="edit-user/:id" element={<EditSingleUser />} />

        <Route path="clients" element={<Clients />} />
        <Route path="clients/:id" element={<SingleClient />} />
        <Route path="add-clients" element={<AddClients />} />
        <Route path="manage-clients" element={<ClientsTable />} />
        <Route path="edit-clients/:id" element={<EditSingleClient />} />

        <Route path="client-categories" element={<ClientCategories />} />
        <Route path="add-client-category" element={<AddClientCategories />} />
        <Route
          path="manage-client-category"
          element={<ClientCategoryTable />}
        />
        <Route
          path="edit-client-category/:id"
          element={<EditClientCategory />}
        />

        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<SingleProject />} />
        <Route path="add-projects" element={<AddProjects />} />
        <Route path="manage-projects" element={<ProjectsTable />} />
        <Route path="edit-projects/:id" element={<EditSingleProject />} />

        <Route path="project-categories" element={<ProjectCategories />} />
        <Route path="add-project-category" element={<AddProjectCategories />} />
        <Route
          path="manage-project-category"
          element={<ProjectCategoryTable />}
        />
        <Route
          path="edit-project-category/:id"
          element={<EditProjectCategory />}
        />

        <Route path="tasks" element={<Tasks />} />
      </Route>
    </Route>
  )
);

// Render the application
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
