import { Container } from "@mui/material";
import CustomHeading from "../../components/custom/CustomHeading";
import { CustomCSS } from "../../components/custom/CustomCSS";
import { useNavigate } from "react-router";
import UsersTable from "./UsersTable";

const Users = () => {
  const navigate = useNavigate();
  return (
    <Container className={CustomCSS.cardBG}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading={"Manage Users"} />

        <button
          className={CustomCSS.addButton}
          onClick={() => navigate("/add-users")}
        >
          Add Users
        </button>
      </div>

      <UsersTable />
    </Container>
  );
};

export default Users;
