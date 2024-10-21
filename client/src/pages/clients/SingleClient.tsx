import { useNavigate, useParams } from "react-router";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { ArrowBackRounded } from "@mui/icons-material";
import { Avatar, capitalize, Divider, Typography } from "@mui/material";
import CustomChip from "../../components/custom/CustomChip";
import { useGetClientByIdQuery } from "../../redux/features/clients/clientApiSlice";

const SingleClient = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const clientId = parseInt(id || "", 10);
  const {
    data: clientData,
    isLoading,
    error,
  } = useGetClientByIdQuery(clientId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !clientData) {
    return <div>Error loading user data or user not found.</div>;
  }

  return (
    <div className={`${CustomCSS.mainDiv} pb-5`}>
      <div className="inline-flex justify-between">
        <CustomHeading heading="Client Details" />

        <button
          onClick={() => navigate("/clients")}
          className={CustomCSS.addButton}
        >
          <ArrowBackRounded />
          Back
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-around w-full">
        <div className="lg:w-[35%] w-full">
          <Avatar
            src={clientData?.logo}
            sx={{
              width: 350,
              height: 350,
              margin: "2rem 0",
              boxShadow: "0 4px 50px 2px rgba(0,0,0,0.34)",
            }}
          />
        </div>

        <div className="lg:w-[55%] w-full flex justify-center">
          <div className="w-[90%] flex flex-col justify-around gap-3">
            <div className="inline-flex items-center justify-between w-full">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 500,
                  textTransform: "uppercase",
                }}
              >
                {clientData?.name}
              </Typography>

              <CustomChip
                text={clientData?.ClientCategory?.name}
                role={"client"}
              />
            </div>

            <Typography variant="h6" fontWeight={300}>
              {clientData?.details}
            </Typography>
            <Divider />

            <Typography variant="h6" fontWeight={400}>
              <span className="font-semibold">Email:</span> {clientData?.email}
            </Typography>

            <Typography variant="h6" fontWeight={400}>
              <span className="font-semibold">Phone:</span>{" "}
              {clientData?.phone || "N/A"}
            </Typography>

            <Typography variant="h6" fontWeight={400}>
              <span className="font-semibold">Location:</span>{" "}
              {clientData?.location}
            </Typography>

            <Typography variant="h6" fontWeight={400}>
              <span className="font-semibold">Contract Start:</span>{" "}
              {clientData?.startDate.toString().slice(0, 10)}
            </Typography>

            <Typography variant="h6" fontWeight={400}>
              <span className="font-semibold">Contract End:</span>{" "}
              {clientData?.endDate.toString().slice(0, 10)}
            </Typography>
          </div>
        </div>
      </div>
      <CustomChip
        role=""
        priority={clientData?.priority}
        text={clientData?.priority + " Priority"}
      />
    </div>
  );
};

export default SingleClient;
