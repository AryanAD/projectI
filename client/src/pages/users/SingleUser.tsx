import { useNavigate, useParams } from "react-router";
import { useGetUserByIdQuery } from "../../redux/features/users/userApiSlice";
import { ArrowBackRounded } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import CustomChip from "../../components/custom/CustomChip";
import { motion } from "framer-motion";

const SingleUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const userId = parseInt(id || "", 10);
  const { data: userData, isLoading, error } = useGetUserByIdQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !userData) {
    return <div>Error loading user data or user not found.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[100vh-70px] px-6 pt-8 mt-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-w-[50vw] max-w-6xl border rounded-2xl shadow-md drop-shadow-sm bg-white p-6 space-y-6"
      >
        <div className="flex justify-between items-center">
          <motion.h1
            className="text-[#4A4BAC] font-extrabold text-3xl sm:text-4xl uppercase tracking-widest"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            User Details
          </motion.h1>

          <motion.button
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white text-[#4A4BAC] hover:bg-indigo-200 font-bold uppercase text-lg shadow-sm drop-shadow-md transition duration-300"
            onClick={() => navigate("/admin/users")}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowBackRounded />
            Back
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-6 lg:space-y-0 lg:space-x-6">
          <motion.div
            className="w-[30%]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-lg mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={userData?.image}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          <div className="w-[55%]">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center justify-between">
                <motion.h2
                  className="font-semibold text-2xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {userData?.username}
                </motion.h2>

                <CustomChip text={userData?.role} role={userData?.role} />
              </div>

              <div className="space-y-3">
                <motion.p
                  className="text-gray-700"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="font-semibold">Email:</span>{" "}
                  {userData?.email}
                </motion.p>

                <motion.p
                  className="text-gray-700"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="font-semibold">Phone:</span>{" "}
                  {userData?.phone || "N/A"}
                </motion.p>

                <motion.p
                  className="text-gray-700"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="font-semibold">Created At:</span>{" "}
                  {userData?.createdAt &&
                    new Date(userData?.createdAt).toLocaleDateString()}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SingleUser;
