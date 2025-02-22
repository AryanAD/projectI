import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { useGetProjectById } from "../../api/projects/projects";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  FileText,
  SquareCode,
} from "lucide-react";
import CustomLoader from "../../components/custom/CustomLoader";

const SingleProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = parseInt(id || "", 10);
  const { data: projectData, isLoading } = useGetProjectById(projectId);

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

  if (!projectData || isLoading) return <CustomLoader />;

  const statusStyle =
    statusColors[projectData.status as keyof typeof statusColors] ||
    statusColors.todo;

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-[#4B49AC] p-6">
            <div className="flex justify-between items-center">
              <motion.h1
                variants={itemVariants}
                className="text-2xl font-bold text-white tracking-wide"
              >
                Project Details
              </motion.h1>
              <motion.button
                onClick={() => navigate("/admin/projects")}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft size={16} />
                Back
              </motion.button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Project Title and Category */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-gray-800"
              >
                {projectData.name}
              </motion.h2>
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full"
              >
                <SquareCode size={16} />
                {projectData.ProjectCategory?.name}
              </motion.div>
            </div>

            {/* Project Description */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 p-6 rounded-xl space-y-2"
            >
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FileText size={18} />
                <span className="font-medium">Project Description</span>
              </div>
              <p className="text-gray-600">{projectData.details}</p>
            </motion.div>

            {/* Project Status */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`flex items-center gap-3 p-4 ${statusStyle.bg} rounded-lg`}
                >
                  <Clock className={statusStyle.icon} />
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className={`font-medium capitalize ${statusStyle.text}`}>
                      {projectData.status}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="text-[#4B49AC]" />
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-medium">
                      {new Date(projectData.deadline).toLocaleDateString(
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
              </div>

              {/* Team Members */}
              <motion.div
                variants={itemVariants}
                className="p-4 bg-gray-50 rounded-lg space-y-3"
              >
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={18} />
                  <span className="font-medium">Team Members</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {projectData.Users?.map((user) => (
                    <span
                      key={user.id}
                      className="px-3 py-1 bg-white rounded-full text-gray-700 text-sm shadow-sm"
                    >
                      {user.username}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Creation Date */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <Calendar className="text-[#4B49AC]" />
                <div>
                  <p className="text-sm text-gray-600">Created On</p>
                  <p className="font-medium">
                    {projectData &&
                      new Date(projectData?.createdAt || "").toLocaleDateString(
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
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SingleProject;

const statusColors = {
  todo: {
    bg: "bg-red-100",
    text: "text-red-700",
    icon: "text-red-500",
  },
  doing: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    icon: "text-yellow-500",
  },
  done: {
    bg: "bg-green-100",
    text: "text-green-700",
    icon: "text-green-500",
  },
};
