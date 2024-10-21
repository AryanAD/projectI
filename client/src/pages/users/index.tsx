import CustomHeading from "../../components/custom/CustomHeading";
import { CustomCSS } from "../../components/custom/CustomCSS";
import { useNavigate } from "react-router";
import UsersTable from "../../components/users/UsersTable";
import { PersonAddAltRounded } from "@mui/icons-material";

const Users = () => {
  const navigate = useNavigate();
  return (
    <div className={CustomCSS.indexMainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading={"Manage Users"} />

        <button
          className={CustomCSS.addButton}
          onClick={() => navigate("/add-users")}
        >
          <PersonAddAltRounded />
          Add Users
        </button>
      </div>

      <UsersTable />
    </div>
  );
};

export default Users;
