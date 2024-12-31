import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { PersonAddAltRounded } from "@mui/icons-material";
import ProjectsTable from "../../components/projects/ProjectsTable";

const Projects = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start min-h-[100vh-70px] px-6 pt-8 mt-[70px]">
      <motion.div
        className="flex justify-between items-center w-full max-w-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[#4A4BAC] font-extrabold text-2xl uppercase tracking-widest">
          Manage Projects
        </h1>

        <motion.button
          className="py-2 px-6 rounded-full bg-[#4A4BAC] text-white hover:bg-indigo-700 font-semibold text-lg inline-flex gap-2  items-center transition-all duration-200"
          onClick={() => navigate("/admin/add-users")}
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <PersonAddAltRounded />
          Add Projects
        </motion.button>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ProjectsTable />
      </motion.div>
    </div>
  );

  // return (
  //   <div className="flex items-center justify-center min-h-screen min-w-[100vw-300px] flex-col">
  //     <div className="inline-flex justify-between w-full">
  //       <h1 className="font-extrabold underline text-[#7D80FA] text-2xl uppercase">
  //         Manage Projects
  //       </h1>

  //       <button
  //         className="inline-flex items-center gap-2 py-2 px-3 rounded-[6px] shadow-md drop-shadow-md transition-all ease-in duration-100 bg-[#4B49AC] text-white hover:bg-[#7978E9] hover:ring-1 hover:ring-[#4B49AC] font-bold uppercase text-md outline-none tracking-[1px]"
  //         onClick={() => navigate("/add-projects")}
  //       >
  //         <PersonAddAltRounded />
  //         Add Projects
  //       </button>
  //     </div>

  //     <ProjectsTable />
  //   </div>
  // );
};

export default Projects;
