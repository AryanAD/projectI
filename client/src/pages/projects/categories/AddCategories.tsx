import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { ArrowBackRounded } from "@mui/icons-material";
import { CustomCSS } from "../../../components/custom/CustomCSS";

import { useAddProjectCategoryMutation } from "../../../redux/features/projects/projectApiSlice";

const AddCategories = () => {
  const [addProjectCategory, { isLoading }] = useAddProjectCategoryMutation();

  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      toast.error("All fields are required");
      return;
    }

    try {
      const categoryData = {
        name,
      };
      const data = await addProjectCategory(categoryData).unwrap();
      toast.success(`${data.name} Successfully Created`);
      navigate("/project-categories");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register category");
    }
  };

  return (
    <div className={CustomCSS.mainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading="Add Categories" />

        <button
          className="inline-flex items-center gap-2 py-2 px-3 rounded-[6px] shadow-md drop-shadow-md transition-all ease-in duration-100 bg-[#4B49AC] text-white hover:bg-[#7978E9] hover:ring-1 hover:ring-[#4B49AC] font-bold uppercase text-md outline-none tracking-[1px]"
          onClick={() => navigate("/project-categories")}
        >
          <ArrowBackRounded />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={CustomCSS.gridTwo}>
          <div className="flex flex-col mt-5">
            <label className={CustomCSS.label} htmlFor="name">
              Enter Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Category Name"
              className={CustomCSS.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="my-5">
          <button
            className={CustomCSS.submitButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategories;
