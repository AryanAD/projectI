import { useNavigate } from "react-router";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { PersonAddAltRounded } from "@mui/icons-material";
import ProjectsTable from "../../components/projects/ProjectsTable";

const Projects = () => {
  const navigate = useNavigate();

  return (
    <div className={CustomCSS.indexMainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading={"Manage Projects"} />

        <button
          className={CustomCSS.addButton}
          onClick={() => navigate("/add-projects")}
        >
          <PersonAddAltRounded />
          Add Projects
        </button>
      </div>

      <ProjectsTable />
    </div>
  );
};

export default Projects;
