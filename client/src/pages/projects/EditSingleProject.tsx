import { ArrowBackRounded } from "@mui/icons-material";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetProjectByIdQuery,
  useGetProjectCategoriesQuery,
  useUpdateProjectMutation,
} from "../../redux/features/projects/projectApiSlice";
import { useGetAllUsersQuery } from "../../redux/features/users/userApiSlice";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 3;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const EditSingleProject = () => {
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const { id } = useParams();
  const projectId = parseInt(id);

  const { data: previousProjectData } = useGetProjectByIdQuery(projectId);
  const { data: existingCategories } = useGetProjectCategoriesQuery();
  const { data: existingUsers } = useGetAllUsersQuery();

  const [name, setName] = useState<string>("");
  const [projectCategoryId, setProjectCategoryId] = useState<number | null>(
    null
  );
  const [assignedToIds, setAssignedToIds] = useState<number[]>([]);
  const [details, setDetails] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (previousProjectData) {
      setName(previousProjectData.name || "");
      setDetails(previousProjectData.details || "");
      setStatus(previousProjectData.status || "");
      setDeadline(previousProjectData.startDate || "");
      setProjectCategoryId(previousProjectData.projectCategoryId || null);
      setAssignedToIds(previousProjectData.Users.map((user) => user.id) || []);
    }
  }, [previousProjectData]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProjectCategoryId(parseInt(e.target.value));
  };

  const handleAssignedToChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;
    setAssignedToIds(
      typeof value === "string" ? value.split(",").map(Number) : value
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedProjectData = {
        name,
        details,
        status: status.toLowerCase(),
        projectCategoryId,
        assignedToIds,
        deadline,
      };
      const data = await updateProject({
        id: projectId,
        data: updatedProjectData,
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
              onChange={handleStatusChange}
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
              onChange={handleCategoryChange}
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
            <Select
              multiple
              className={`${CustomCSS.select} bg-white`}
              id="assignedTo"
              value={assignedToIds}
              onChange={handleAssignedToChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) =>
                selected
                  .map(
                    (id) =>
                      existingUsers?.find((user) => user.id === id)?.username
                  )
                  .join(", ")
              }
              MenuProps={MenuProps}
            >
              {existingUsers &&
                existingUsers.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    <Checkbox checked={assignedToIds.includes(option.id)} />
                    <ListItemText primary={option.username} />
                  </MenuItem>
                ))}
            </Select>
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
            {isLoading ? "Updating..." : "Update"}
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
