import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full"
      >
        <motion.img
          src={userInfo?.image}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.h1
          className="mt-4 text-2xl font-semibold text-gray-800"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {userInfo?.username}
        </motion.h1>
        <motion.p
          className="text-gray-500 text-sm"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {userInfo?.role}
        </motion.p>

        <motion.div
          className="mt-6 space-y-2 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {userInfo?.email}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Phone:</span> {userInfo?.phone}
          </p>
        </motion.div>

        <motion.button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-[#4a4B80] text-white font-medium rounded hover:bg-[#4A4bAC] transition-all"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;
