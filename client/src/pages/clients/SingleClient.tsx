import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { useGetClientById } from "../../api/clients/clients";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Boxes,
  Building,
} from "lucide-react";
import CustomLoader from "../../components/custom/CustomLoader";

const SingleClient = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const clientId = parseInt(id || "", 10);
  const { data: clientData, isLoading } = useGetClientById(clientId);

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
  if (!clientData || isLoading) return <CustomLoader />;

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
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
                Client Details
              </motion.h1>
              <motion.button
                onClick={() => navigate("/admin/clients")}
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
              {/* Logo Section */}
              <motion.div
                variants={itemVariants}
                className="lg:w-1/3 flex flex-col items-center"
              >
                <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-gray-100">
                  {clientData.logo ? (
                    <img
                      src={clientData.logo}
                      alt={clientData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Boxes size={64} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="mt-4 space-y-2 text-center">
                  <motion.div
                    variants={itemVariants}
                    className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium inline-flex items-center gap-2"
                  >
                    <Building size={16} />
                    {clientData.ClientCategory?.name}
                  </motion.div>
                </div>
              </motion.div>

              {/* Client Details Section */}
              <motion.div
                variants={itemVariants}
                className="lg:w-2/3 space-y-6"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-2xl font-bold text-gray-800"
                >
                  {clientData.name}
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-gray-600 bg-gray-50 p-4 rounded-lg"
                >
                  {clientData.details}
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Mail className="text-[#4A4BAC]" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{clientData.email}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Phone className="text-[#4A4BAC]" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{clientData.phone || "N/A"}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MapPin className="text-[#4A4BAC]" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{clientData.location}</p>
                    </div>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors col-span-full"
                  >
                    <Calendar className="text-[#4A4BAC]" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Contract Duration</p>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">
                          {new Date(clientData.startDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <span className="text-gray-400 mx-2">to</span>
                        <p className="font-medium">
                          {new Date(clientData.endDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
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

export default SingleClient;
