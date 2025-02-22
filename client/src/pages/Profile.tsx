import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useGetProfile } from "../api/users/users";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { UserCircle, Mail, Phone, Calendar, ArrowLeft } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { data: userInfo, isError, error } = useGetProfile();

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Failed to fetch profile data.");
    }
  }, [isError, error]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-xl shadow-lg"
        >
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-500 font-medium mb-4">
            Error: {error?.message}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-[#4B49AC] text-white font-medium rounded-lg hover:bg-[#4A4bAC] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <div className="bg-[#4B49AC] p-6 text-white">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              {userInfo?.image ? (
                <motion.img
                  src={userInfo.image}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                />
              ) : (
                <motion.div
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-white/10 flex items-center justify-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  <UserCircle size={40} className="text-white" />
                </motion.div>
              )}
              <div>
                <motion.h1
                  variants={itemVariants}
                  className="text-2xl font-bold"
                >
                  {userInfo?.username}
                </motion.h1>
                <motion.p variants={itemVariants} className="text-white/80">
                  {userInfo?.role}
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-6">
            <motion.div
              variants={itemVariants}
              className="gap-4 grid grid-cols-2"
            >
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Mail className="text-[#4B49AC]" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{userInfo?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Phone className="text-[#4B49AC]" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{userInfo?.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Calendar className="text-[#4B49AC]" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">
                    {userInfo?.createdAt &&
                      new Date(userInfo?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-center pt-4"
            >
              <motion.button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-[#4B49AC] text-white font-medium rounded-lg hover:bg-[#4A4bAC] transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft size={16} />
                Back to Home
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
