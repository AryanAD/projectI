import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowBackRounded } from "@mui/icons-material";
import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";
import { useGetAllUsers } from "../../api/users/users";
import {
  useAddProject,
  useGetProjectCategories,
} from "../../api/projects/projects";

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

const AddProjects = () => {
  const { data: existingCategories } = useGetProjectCategories();
  const { data: existingUsers } = useGetAllUsers();
  const addProjectMutation = useAddProject();

  const [name, setName] = useState<string>("");
  const [projectCategoryId, setProjectCategoryId] = useState<number>();
  const [assignedToIds, setAssignedToIds] = useState<number[]>([]);
  const [details, setDetails] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Array.isArray(assignedToIds) || assignedToIds.length === 0) {
      toast.error("Please assign at least one staff member.");
      return;
    }

    if (!name || !details || !status || !projectCategoryId || !deadline) {
      toast.error("All fields are required");
      return;
    }

    const projectData = {
      name,
      details,
      status,
      projectCategoryId,
      assignedToIds,
      deadline,
    };

    addProjectMutation.mutate(projectData, {
      onSuccess: (data) => {
        toast.success(`${data.name} Successfully Created`);
        navigate("/admin/projects");
      },
      onError: () => {
        toast.error("Failed to register Project");
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-65px)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between w-[60%] items-center mb-8"
      >
        <h1 className="text-[#4A4BAC] font-extrabold text-2xl uppercase tracking-widest">
          Add Projects
        </h1>
        <button
          className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white text-[#4A4BAC] hover:bg-indigo-200 font-bold uppercase text-lg shadow-md transition duration-300"
          onClick={() => navigate("/admin/projects")}
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
              htmlFor="name"
            >
              Enter Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Project name"
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="deadline"
            >
              Select Project Deadline
            </label>
            <input
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
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
              <option value="">--Select Project status--</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="category"
            >
              Select Category
            </label>
            <select
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200 bg-white"
              id="category"
              value={projectCategoryId || ""}
              onChange={(e) => setProjectCategoryId(parseInt(e.target.value))}
            >
              <option value="">--Select Project Category--</option>
              {existingCategories?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col col-span-full">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="assignedTo"
            >
              Assign Staffs
            </label>
            <Select
              multiple
              value={assignedToIds}
              onChange={(e) => setAssignedToIds(e.target.value as number[])}
              renderValue={(selected) =>
                existingUsers
                  ?.filter((user) => (selected as number[]).includes(user.id))
                  .map((user) => user.username)
                  .join(", ")
              }
              MenuProps={MenuProps}
            >
              {existingUsers?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <Checkbox checked={assignedToIds.indexOf(option.id) > -1} />
                  <ListItemText primary={option.username} />
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="flex flex-col col-span-full">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="projectDetails"
            >
              Enter Project Details
            </label>
            <textarea
              id="projectDetails"
              value={details}
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
              placeholder="Enter Project Details Here..."
            ></textarea>
          </div>
        </div>

        <div className="my-6 text-center">
          <button
            className="py-2 px-6 rounded-full bg-[#4A4BAC] text-white hover:bg-indigo-700 font-semibold text-lg w-full transition-all duration-200"
            type="submit"
            disabled={addProjectMutation.isPending}
          >
            {addProjectMutation.isPending ? (
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
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddProjects;

const statusOptions = [
  { value: "todo" },
  { value: "doing" },
  { value: "done" },
];
