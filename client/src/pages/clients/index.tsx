import { useNavigate } from "react-router";
import { CustomCSS } from "../../components/custom/CustomCSS";

import { PersonAddAltRounded } from "@mui/icons-material";
import ClientsTable from "../../components/clients/ClientsTable";

const Clients = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen min-w-[100vw-300px] flex-col">
      <div className="inline-flex justify-between w-full">
        <h1 className="font-extrabold underline text-[#7D80FA] text-3xl uppercase">
          Manage Clients
        </h1>

        <button
          className="inline-flex items-center gap-2 py-2 px-3 rounded-[6px] shadow-md drop-shadow-md transition-all ease-in duration-100 bg-[#4B49AC] text-white hover:bg-[#7978E9] hover:ring-1 hover:ring-[#4B49AC] font-bold uppercase text-md outline-none tracking-[1px]"
          onClick={() => navigate("/add-clients")}
        >
          <PersonAddAltRounded />
          Add Clients
        </button>
      </div>

      <ClientsTable />
    </div>
  );
};

export default Clients;
