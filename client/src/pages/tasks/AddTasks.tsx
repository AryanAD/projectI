import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowBackRounded } from "@mui/icons-material";
import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";
import { useGetAllUsers } from "../../api/users/users";
import { useGetProjects } from "../../api/projects/projects";
import { useGetClients } from "../../api/clients/clients";
import { useAssignProjectToUser } from "../../api/tasks/tasks";

const MenuProps = {
  PaperProps: {
    style: {
      py: 1.5,
      px: 3,
      borderRadius: "0.5rem",
      border: "1px solid",
      borderColor: "indigo.300",
      backgroundColor: "white",
      transition: "all 0.2s ease-in-out",
      "&:focus-within": {
        borderColor: "indigo.400",
        boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)",
      },
    },
  },
};

const AddTask = () => {
  const { data: existingUsers } = useGetAllUsers();
  const { data: existingProjects } = useGetProjects();
  const { data: existingClients } = useGetClients();
  const addTaskMutation = useAssignProjectToUser();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("todo");
  const [userIds, setUserIds] = useState<number[]>([]);
  const [projectId, setProjectId] = useState<number>();
  const [clientId, setClientId] = useState<number>();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Array.isArray(userIds) || userIds.length === 0) {
      toast.error("Please assign at least one staff member.");
      return;
    }

    if (!title || !description || !status || !projectId || !clientId) {
      toast.error("All fields are required");
      return;
    }

    const taskData = {
      title,
      description,
      status,
      userIds,
      projectId,
      clientId,
    };

    addTaskMutation.mutate(taskData, {
      onSuccess: (data) => {
        toast.success(`Task "${data.title}" successfully created`);
        navigate("/admin/tasks");
      },
      onError: () => {
        toast.error("Failed to create task");
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between w-[60%] items-center mb-8"
      >
        <h1 className="text-[#4A4BAC] font-extrabold text-2xl uppercase tracking-widest">
          Add Task
        </h1>
        <button
          className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white text-[#4A4BAC] hover:bg-indigo-200 font-bold uppercase text-lg shadow-md transition duration-300"
          onClick={() => navigate("/admin/tasks")}
        >
          <ArrowBackRounded />
          Back
        </button>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-[60%] bg-white p-8 rounded-lg shadow-xl space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="title"
            >
              Enter Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter task title"
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="status"
            >
              Select Status
            </label>
            <select
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200 bg-white"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="project"
            >
              Select Project
            </label>
            <select
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200 bg-white"
              id="project"
              value={projectId || ""}
              onChange={(e) => setProjectId(parseInt(e.target.value))}
            >
              <option value="">--Select Project--</option>
              {existingProjects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="client"
            >
              Select Client
            </label>
            <select
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200 bg-white"
              id="client"
              value={clientId || ""}
              onChange={(e) => setClientId(parseInt(e.target.value))}
            >
              <option value="">--Select Client--</option>
              {existingClients?.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col col-span-full">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="assignedTo"
            >
              Assign Staff
            </label>
            <Select
              multiple
              value={userIds}
              onChange={(e) => setUserIds(e.target.value as number[])}
              renderValue={(selected) =>
                existingUsers
                  ?.filter((user) => (selected as number[]).includes(user.id))
                  .map((user) => user.username)
                  .join(", ")
              }
              MenuProps={MenuProps}
            >
              {existingUsers?.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <Checkbox checked={userIds.indexOf(user.id) > -1} />
                  <ListItemText primary={user.username} />
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col col-span-full">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="description"
            >
              Enter Task Description
            </label>
            <textarea
              id="description"
              value={description}
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Enter task description here..."
            ></textarea>
          </div>
        </div>

        <div className="my-6 text-center">
          <button
            className="py-2 px-6 rounded-full bg-[#4A4BAC] text-white hover:bg-indigo-700 font-semibold text-lg w-full transition-all duration-200"
            type="submit"
            disabled={addTaskMutation.isPending}
          >
            {addTaskMutation.isPending ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2z"
                  ></path>
                </svg>
                Creating...
              </span>
            ) : (
              "Create Task"
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddTask;
