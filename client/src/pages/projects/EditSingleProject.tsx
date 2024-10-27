import { ArrowBackRounded } from "@mui/icons-material";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetProjectCategoriesQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../redux/features/projects/projectApiSlice";
import { useGetAllUsersQuery } from "../../redux/features/users/userApiSlice";

const EditSingleProject = () => {
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const { data: previousProjectData } = useGetProjectQuery();
  const { data: existingCategories } = useGetProjectCategoriesQuery();
  const { data: existingUsers } = useGetAllUsersQuery();

  const [name, setName] = useState<string>("");
  const [projectCategoryId, setProjectCategoryId] = useState<number>();
  const [assignedToIds, setAssignedToIds] = useState<number[]>([]);
  const [details, setDetails] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [clientCategoryId, setClientCategoryId] = useState<number>();
  const [userId, setUserId] = useState<number>();
  const [existingCategoryName, setExistingCategoryName] = useState<string>("");
  const [existingUserName, setExistingUserName] = useState<string>("");

  const navigate = useNavigate();

  const { id } = useParams();
  const projectId = parseInt(id);

  useEffect(() => {
    if (previousProjectData && id) {
      const previousProject = previousProjectData.find(
        (element) => element.id === projectId
      );
      const formatDate = (dateString: string) => {
        return new Date(dateString).toISOString().slice(0, 16); // Format to yyyy-MM-ddThh:mm
      };
      if (previousProject) {
        setName(previousProject?.name.split(" ")[0] || "");
        setDetails(previousProject.details || "");
        setStatus(previousProject.status || "");
        setDeadline(formatDate(previousProject.startDate || ""));
        setClientCategoryId(previousProject.projectCategoryId);
        setUserId(previousProject.Users[0].id);
        setExistingCategoryName(previousProject.ProjectCategory.name || "");
        setExistingUserName(previousProject.Users[0].username || "");
      }
    }
  }, [previousProjectData, id, projectId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedClientData = {
        name,
        details,
        status: status.toLowerCase(),
        projectCategoryId,
        assignedToIds,
        deadline,
      };
      const data = await updateProject({
        id: projectId,
        data: updatedClientData,
      }).unwrap();
      toast.success(`${data.name} Successfully Updated`);
      navigate("/clients");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update client");
    }
  };

  return (
    <div className={CustomCSS.mainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading="Edit Client" />

        <button
          className={CustomCSS.addButton}
          onClick={() => navigate("/clients")}
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

          <div className="flex flex-col">
            <label className={CustomCSS.label} htmlFor="assignedTo">
              Assign Staffs
            </label>
            <select
              className={`${CustomCSS.select} bg-white`}
              id="assignedTo"
              value={assignedToIds || ""}
              onChange={(e) => {
                const id = parseInt(e.target.value);
                setAssignedToIds((prev) => [...prev, id]);
              }}
            >
              <option value="">--Select Staff Assigned--</option>
              {existingUsers &&
                existingUsers.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.username}
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

export default EditSingleProject;

const statusOptions = [
  { value: "todo" },
  { value: "doing" },
  { value: "done" },
];
