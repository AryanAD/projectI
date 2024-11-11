import { useNavigate } from "react-router";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { PersonAddAltRounded } from "@mui/icons-material";

const Tasks = () => {
  const navigate = useNavigate();

  return (
    <div className={CustomCSS.indexMainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading={"Manage Tasks"} />

        <button
          className={CustomCSS.addButton}
          onClick={() => navigate("/add-projects")}
        >
          <PersonAddAltRounded />
          Add Tasks
        </button>
      </div>
    </div>
  );
};

export default Tasks;
