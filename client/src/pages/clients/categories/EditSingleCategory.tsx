import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowBackRounded } from "@mui/icons-material";
import {
  useGetClientCategories,
  useUpdateClientCategory,
} from "../../../api/clients/clients";

const EditSingleCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState<string>("");

  // Fetch existing category data
  const { data: clientCategories } = useGetClientCategories();

  // Mutation hook for updating categories
  const updateCategoryMutation = useUpdateClientCategory();

  // Set initial value when data is fetched
  useEffect(() => {
    if (clientCategories && id) {
      const category = clientCategories.find(
        (cat: { id: number }) => cat.id === parseInt(id, 10)
      );
      if (category) setName(category.name);
    }
  }, [clientCategories, id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    updateCategoryMutation.mutate(
      { id: parseInt(id ?? "0", 10), name },
      {
        onSuccess: (data) => {
          toast.success(`Category "${data.name}" updated successfully`);
          navigate("/admin/client-categories");
        },
        onError: () => {
          toast.error("Failed to update category");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[100vh-70px] px-6 pt-8 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col w-[50vw] max-w-3xl mx-auto p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-extrabold text-[#4A4BAC] uppercase tracking-wide"
          >
            Update Category
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white text-[#4A4BAC] hover:bg-indigo-200 font-bold uppercase text-lg shadow-md transition duration-300"
            onClick={() => navigate("/admin/client-categories")}
          >
            <ArrowBackRounded />
            Back
          </motion.button>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col"
          >
            <label
              htmlFor="name"
              className="mb-2 text-sm font-bold text-[#4A4BAC] uppercase tracking-wide"
            >
              Enter Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 border rounded-md shadow-sm placeholder-gray-400 border-[#7978E9] focus:outline-none focus:ring-2 focus:ring-[#98BDFF] focus:border-transparent transition-all"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="my-6 text-center"
          >
            <button
              type="submit"
              disabled={updateCategoryMutation.isPending}
              className="py-2 px-6 rounded-full bg-[#4A4BAC] text-white hover:bg-indigo-700 font-semibold text-lg w-full transition-all duration-200"
            >
              {updateCategoryMutation.isPending ? "Updating..." : "Update"}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default EditSingleCategory;
