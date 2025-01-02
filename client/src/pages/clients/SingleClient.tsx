import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowBackRounded } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
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
    <div className="flex items-center justify-center px-6 pt-16 lg:pt-8 mt-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-w-[50vw] max-w-6xl border rounded-2xl shadow-md drop-shadow-sm bg-white p-6 space-y-6"
      >
        <div className="flex justify-between items-center">
          <motion.h1
            className="text-[#4A4BAC] font-extrabold text-2xl sm:text-2xl uppercase tracking-widest"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Client Details
          </motion.h1>

          <motion.button
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white text-[#4A4BAC] hover:bg-indigo-200 font-bold uppercase text-lg shadow-sm drop-shadow-md transition duration-300"
            onClick={() => navigate("/admin/clients")}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowBackRounded />
            Back
          </motion.button>
        </div>

        <div className="flex w-full flex-col flex-wrap lg:flex-row items-center justify-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-6">
          <motion.div
            className="w-full lg:w-[35%] inline-flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-[300px] h-[300px] rounded-full overflow-hidden shadow-lg mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={clientData?.logo}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

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
                <span className="font-semibold">Email:</span>{" "}
                {clientData?.email}
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
      </motion.div>
    </div>
  );
};

export default SingleClient;
