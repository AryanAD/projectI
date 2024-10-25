import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { ArrowBackRounded } from "@mui/icons-material";
import {
  useAddProjectMutation,
  useGetProjectCategoriesQuery,
} from "../../redux/features/projects/projectApiSlice";

const AddProjects = () => {
  const [addProject, { isLoading }] = useAddProjectMutation();
  const { data: existingCategories } = useGetProjectCategoriesQuery();

  const [name, setName] = useState<string>("");
  const [projectCategoryId, setProjectCategoryId] = useState<number>();
  const [details, setDetails] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const navigate = useNavigate();

  console.log(projectCategoryId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !details || !status || !projectCategoryId || !deadline) {
      toast.error("All fields are required");
      return;
    }

    try {
      const projectData = {
        name,
        details,
        status: status.toLowerCase(),
        projectCategoryId,
        deadline,
      };
      const data = await addProject(projectData).unwrap();
      toast.success(`${data.name} Successfully Created`);
      navigate("/projects");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register Project");
    }
  };

  return (
    <div className={CustomCSS.mainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading="Add Projects" />

        <button
          className={CustomCSS.addButton}
          onClick={() => navigate("/projects")}
        >
          <ArrowBackRounded />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={CustomCSS.gridTwo}>
          <div className="flex flex-col">
            <label className={CustomCSS.label} htmlFor="name">
              Enter Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Project name"
              className={CustomCSS.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className={CustomCSS.label} htmlFor="deadline">
              Select Project Deadline
            </label>
            <input
              className={CustomCSS.input}
              type="datetime-local"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className={CustomCSS.label} htmlFor="status">
              Select Status
            </label>
            <select
              className={`${CustomCSS.select} bg-white`}
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
            <label className={CustomCSS.label} htmlFor="category">
              Select Category
            </label>
            <select
              className={`${CustomCSS.select} bg-white`}
              id="category"
              value={projectCategoryId || ""}
              onChange={(e) => {
                setProjectCategoryId(parseInt(e.target.value));
              }}
            >
              <option value="">--Select Project Category--</option>
              {existingCategories &&
                existingCategories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col col-span-full">
            <label className={CustomCSS.label} htmlFor="projectDetails">
              Enter Project Details
            </label>
            <textarea
              id="projectDetails"
              value={details}
              className={CustomCSS.input}
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
              placeholder="Enter Project Details Here..."
            ></textarea>
          </div>
        </div>

        <div className="my-5">
          <button
            className={CustomCSS.submitButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjects;

const statusOptions = [
  { value: "todo" },
  { value: "doing" },
  { value: "done" },
];
