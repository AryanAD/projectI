import { ArrowBackRounded } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllUsersQuery,
  useUpdateUserByIdMutation,
  useUploadUserImageMutation,
} from "../../redux/features/users/userApiSlice";

interface UploadImageResponse {
  message: string;
  image: string;
}

const EditSingleUser = () => {
  const [updateUserById, { isLoading }] = useUpdateUserByIdMutation();
  const [uploadUserImage] = useUploadUserImageMutation();
  const { data: previousUserData } = useGetAllUsersQuery();

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (previousUserData && id) {
      const previousUser = previousUserData.find(
        (element) => element.id === parseInt(id)
      );
      if (previousUser) {
        setUsername(previousUser.username || "");
        setEmail(previousUser.email || "");
        setPhone(previousUser.phone || "");
        setRole(previousUser.role || "");
        setImageUrl(previousUser.image || null);
      }
    }
  }, [previousUserData, id]);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res: UploadImageResponse =
          await uploadUserImage(formData).unwrap();
        setImage(file);
        setImageUrl(res.image);
      } catch (error: unknown) {
        const err = error as { data?: { message?: string }; error?: string };
        console.error(err);
        toast.error(err?.data?.message || err?.error || "Upload failed");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const role = "staff";

    try {
      const updatedUserData = {
        username,
        email,
        phone,
        role,
        ...(imageUrl && { image: imageUrl }),
      };
      const data = await updateUserById({
        id: parseInt(id),
        data: updatedUserData,
      }).unwrap();
      toast.success(`${data.username} Successfully Updated`);
      navigate("/admin/users");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[100vh-70px] h-full px-6 pt-8 mt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between w-full items-center mb-8"
      >
        <h1 className="text-[#4A4BAC] font-extrabold text-4xl uppercase tracking-widest">
          Edit User
        </h1>
        <button
          className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white text-[#4A4BAC] hover:bg-indigo-200 font-bold uppercase text-lg shadow-md transition duration-300"
          onClick={() => navigate("/admin/users")}
        >
          <ArrowBackRounded />
          Back
        </button>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl space-y-6"
      >
        {imageUrl && (
          <div className="text-center mb-6">
            <img
              src={imageUrl}
              alt="User Profile"
              className="block mx-auto max-h-[400px] rounded-lg shadow-md transition-transform transform hover:scale-105"
            />
          </div>
        )}

        <div className={`w-full my-8 ${imageUrl ? "hidden" : ""}`}>
          <label className="border-2 border-dashed border-indigo-300 p-6 block w-full text-center rounded-lg cursor-pointer font-semibold text-[#4A4BAC90] hover:bg-indigo-50 hover:border-indigo-400 transition duration-200">
            {image ? image.name : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="username"
            >
              Enter Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Your Username"
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="role"
            >
              Enter Role
            </label>
            <input
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              type="text"
              id="role"
              placeholder="Enter User Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="email"
            >
              Enter Email
            </label>
            <input
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              type="email"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="phone"
            >
              Enter Phone Number
            </label>
            <input
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              type="number"
              id="phone"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="my-6 text-center">
          <button
            className="py-2 px-6 rounded-full bg-[#4A4BAC] text-white hover:bg-indigo-700 font-semibold text-lg w-full transition-all duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V2a10 10 0 00-10 10h2z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default EditSingleUser;
