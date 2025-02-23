export const QUERY_KEYS = {
  PROFILE: "profile",
  USERS: "users",
  USER_BY_ID: (id: number) => ["users", id],

  CLIENTS: "clients",
  CLIENT_BY_ID: (id: number) => ["clients", id],
  CLIENT_CATEGORIES: "clientCategories",

  PROJECTS: "projects",
  PROJECT_BY_ID: (id: number) => ["projects", id],
  PROJECT_CATEGORIES: "projectCategories",

  TASKS: "tasks",
  TASK_BY_ID: (taskId: number) => ["tasks", taskId],
  USER_TASKS: (userId: number) => ["tasks", "user", userId],

  STAFF_TASKS: "staff-tasks",
};
