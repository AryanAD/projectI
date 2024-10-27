import { useNavigate, useParams } from "react-router";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { ArrowBackRounded } from "@mui/icons-material";
import { Avatar, Divider, Typography } from "@mui/material";
import CustomChip from "../../components/custom/CustomChip";
import { useGetProjectByIdQuery } from "../../redux/features/projects/projectApiSlice";

const SingleProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const projectId = parseInt(id || "", 10);
  const {
    data: projectData,
    isLoading,
    error,
  } = useGetProjectByIdQuery(projectId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !projectData) {
    return <div>Error loading project data or project not found.</div>;
  }

  return (
    <div className={`${CustomCSS.mainDiv} pb-5`}>
      <div className="inline-flex justify-between">
        <CustomHeading heading="Project Details" />

        <button
          onClick={() => navigate("/projects")}
          className={CustomCSS.addButton}
        >
          <ArrowBackRounded />
          Back
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-around w-full">
        <div className="w-[90%] flex flex-col justify-around gap-3">
          <div className="inline-flex items-center justify-between w-full">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              {projectData?.name}
            </Typography>

            <CustomChip
              text={projectData?.ProjectCategory?.name}
              role={"client"}
            />
          </div>

          <Typography variant="h6" fontWeight={300}>
            {projectData?.details}
          </Typography>
          <Divider />

          <Typography variant="h6" fontWeight={400}>
            <span className="font-semibold">Status:</span> {projectData?.status}
          </Typography>

          <Typography variant="h6" fontWeight={400}>
            <span className="font-semibold">Deadline:</span>{" "}
            {projectData?.deadline.toString().slice(0, 10)}
          </Typography>

          <Typography variant="h6" fontWeight={400}>
            <span className="font-semibold">Assigned To:</span>{" "}
            {projectData?.Users[0].username}
          </Typography>

          <Typography variant="h6" fontWeight={400}>
            <span className="font-semibold">Created At:</span>{" "}
            {projectData.createdAt &&
              projectData?.createdAt.toString().slice(0, 10)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
