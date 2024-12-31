import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { PersonAddAltRounded } from "@mui/icons-material";
import CategoryTable from "../../../components/clients/categories/CategoryTable";

const ClientCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start min-h-[100vh-70px] px-6 pt-8 mt-[70px]">
      <motion.div
        className="flex justify-between items-center w-full max-w-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[#4A4BAC] font-extrabold text-4xl uppercase tracking-widest">
          Manage Categories
        </h1>

        <motion.button
          className="py-2 px-6 rounded-full bg-[#4A4BAC] text-white hover:bg-indigo-700 font-semibold text-lg inline-flex gap-2  items-center transition-all duration-200"
          onClick={() => navigate("/admin/add-client-category")}
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <PersonAddAltRounded />
          Add Categories
        </motion.button>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CategoryTable />
      </motion.div>
    </div>
  );
};

export default ClientCategories;
