import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

import { ArrowBackRounded } from "@mui/icons-material";
import { CustomCSS } from "../../../components/custom/CustomCSS";
import CustomHeading from "../../../components/custom/CustomHeading";
import {
  useGetProjectCategoriesQuery,
  useUpdateProjectCategoriesMutation,
} from "../../../redux/features/projects/projectApiSlice";

const EditSingleCategory = () => {
  const [updateProjectCategory, { isLoading }] =
    useUpdateProjectCategoriesMutation();
  const { data: previousCategoryData } = useGetProjectCategoriesQuery();

  const [name, setName] = useState<string>("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (previousCategoryData && id) {
      const previousCategory = previousCategoryData.find(
        (element) => element.id === parseInt(id)
      );
      if (previousCategory) {
        setName(previousCategory.name || "");
      }
    }
  }, [previousCategoryData, id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      toast.error("All fields are required");
      return;
    }

    try {
      const data = await updateProjectCategory({
        id: parseInt(id),
        name,
      }).unwrap();
      toast.success(`${data.name} Successfully Updated`);
      navigate("/project-categories");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category");
    }
  };

  return (
    <div className={CustomCSS.mainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading="Edit Category" />

        <button
          className={CustomCSS.addButton}
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

export default EditSingleCategory;
