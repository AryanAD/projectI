import { Container } from "@mui/material";
import { useNavigate } from "react-router";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { PersonAddAltRounded } from "@mui/icons-material";
import ClientsTable from "../../components/clients/ClientsTable";

const Clients = () => {
  const navigate = useNavigate();
  return (
    <Container className={CustomCSS.indexMainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading={"Manage Clients"} />

        <button
          className={CustomCSS.addButton}
          onClick={() => navigate("/add-clients")}
        >
          <PersonAddAltRounded />
          Add Clients
        </button>
      </div>

      <ClientsTable />
    </Container>
  );
};

export default Clients;
