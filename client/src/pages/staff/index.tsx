import { motion } from "framer-motion";
import StaffTable from "../../components/staff/StaffTable";

const Staffs = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-[100vh-70px] px-6 pt-8 mt-[70px]">
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <StaffTable />
      </motion.div>
    </div>
  );
};

export default Staffs;
