import { useNavigate } from "react-router";
import { CustomCSS } from "../../../components/custom/CustomCSS";
import CustomHeading from "../../../components/custom/CustomHeading";
import { PersonAddAltRounded } from "@mui/icons-material";
import CategoryTable from "../../../components/clients/categories/CategoryTable";

const ClientCategories = () => {
  const navigate = useNavigate();
  return (
    <div className={CustomCSS.indexMainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading={"Manage Categories"} />

        <button
          className={CustomCSS.addButton}
          onClick={() => navigate("/add-client-category")}
        >
          <PersonAddAltRounded />
          Add Categories
        </button>
      </div>

      <CategoryTable />
    </div>
  );
};

export default ClientCategories;