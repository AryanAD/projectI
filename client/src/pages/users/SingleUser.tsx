import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { useGetUserById } from "../../api/users/users";
import { ArrowLeft, Mail, Phone, Calendar, User } from "lucide-react";
import CustomLoader from "../../components/custom/CustomLoader";

const roleColors = {
  admin: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    icon: "text-purple-500",
  },
  staff: { bg: "bg-blue-100", text: "text-blue-700", icon: "text-blue-500" },
  user: { bg: "bg-green-100", text: "text-green-700", icon: "text-green-500" },
};

const SingleUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = parseInt(id || "", 10);
  const { data: userData, isLoading } = useGetUserById(userId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
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

  if (!userData || isLoading) return <CustomLoader />;

  const roleStyle =
    roleColors[userData.role as keyof typeof roleColors] || roleColors.user;

  return (
    <div className="min-h-screen p-4 lg:mt-8 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className=" max-w-3xl mx-auto"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-[#4A4BAC] p-6">
            <div className="flex justify-between items-center">
              <motion.h1
                variants={itemVariants}
                className="text-2xl font-bold text-white tracking-wide"
              >
                User Details
              </motion.h1>
              <motion.button
                onClick={() => navigate("/admin/users")}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft size={16} />
                Back
              </motion.button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Image Section */}
              <motion.div
                variants={itemVariants}
                className="lg:w-1/3 flex flex-col items-center"
              >
                <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-gray-100">
                  {userData.image ? (
                    <img
                      src={userData.image}
                      alt={userData.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <User size={64} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <motion.div
                  variants={itemVariants}
                  className={`mt-4 px-4 py-2 rounded-full ${roleStyle.bg} ${roleStyle.text} font-medium`}
                >
                  {userData.role.charAt(0).toUpperCase() +
                    userData.role.slice(1)}
                </motion.div>
              </motion.div>

              {/* User Details Section */}
              <motion.div
                variants={itemVariants}
                className="lg:w-2/3 space-y-6"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-2xl font-bold text-gray-800"
                >
                  {userData.username}
                </motion.h2>

                <div className="space-y-4">
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Mail className="text-[#4A4BAC]" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Phone className="text-[#4A4BAC]" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{userData.phone || "N/A"}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Calendar className="text-[#4A4BAC]" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">
                        {userData.createdAt &&
                          new Date(userData.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SingleUser;
