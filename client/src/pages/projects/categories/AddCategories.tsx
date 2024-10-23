import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { ArrowBackRounded } from "@mui/icons-material";
import { useAddClientCategoryMutation } from "../../../redux/features/clients/clientApiSlice";
import { CustomCSS } from "../../../components/custom/CustomCSS";
import CustomHeading from "../../../components/custom/CustomHeading";

const AddCategories = () => {
  const [addClientCategory, { isLoading }] = useAddClientCategoryMutation();

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
      const data = await addClientCategory(categoryData).unwrap();
      toast.success(`${data.name} Successfully Created`);
      navigate("/client-categories");
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
          className={CustomCSS.addButton}
          onClick={() => navigate("/client-categories")}
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
