import axios from "axios";
import { Category, CreateOrUpdatePayload, Project } from "../../types/projects";
import { BASE_URL, PROJECT_CATEGORY_URL, PROJECTS_URL } from "../constants";

const token = localStorage.getItem("token");

const projectEndpoint = `${BASE_URL}${PROJECTS_URL}`;
const projectCategoryEndpoint = `${BASE_URL}${PROJECT_CATEGORY_URL}`;

// Add Project
export const addProject = async (data: CreateOrUpdatePayload) => {
  return axios
    .post<Project>(`${projectEndpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Get All Projects
export const fetchProjects = async () => {
  return axios
    .get<Project[]>(`${projectEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Get Project by ID
export const fetchProjectById = async (id: number) => {
  return axios
    .get<Project>(`${projectEndpoint}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Update Project
export const updateProject = async ({
  id,
  data,
}: {
  id: number;
  data: CreateOrUpdatePayload;
}) => {
  return axios
    .put<Project>(`${projectEndpoint}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Delete Project
export const deleteProject = async (id: number) => {
  return axios.delete<void>(`${projectEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Add Project Category
export const addProjectCategory = async (name: string) => {
  return axios
    .post<Category>(
      `${projectCategoryEndpoint}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

// Get Project Categories
export const fetchProjectCategories = async () => {
  return axios
    .get<Category[]>(`${projectCategoryEndpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

// Update Project Category
export const updateProjectCategory = async ({
  id,
  name,
}: {
  id: number;
  name: string;
}) => {
  return axios
    .put<Category>(
      `${projectCategoryEndpoint}/${id}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

// Delete Project Category
export const deleteProjectCategory = async (id: number) => {
  return axios.delete<void>(`${projectCategoryEndpoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
