import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { ArrowBackRounded } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useRegister, useUploadUserImage } from "../../api/users/users"; // Import TanStack Query hooks
import { RegisterOrUpdatePayload } from "../../types/users";

const AddUsers = () => {
  // TanStack Query mutations
  const { mutate: register, isPending: isRegistering } = useRegister();
  const { mutate: uploadUserImage } = useUploadUserImage();

  // State for form inputs
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  // Handle image upload
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      setIsUploading(true);

      try {
        uploadUserImage(formData, {
          onSuccess: (res) => {
            setImage(file);
            setImageUrl(res.image);
          },
          onError: (error) => {
            toast.error(error.message || "Image upload failed");
          },
          onSettled: () => {
            setIsUploading(false);
          },
        });
      } catch (error) {
        console.error(error);
        toast.error("Image upload failed");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const role = "staff";

    if (!username || !email || !phone || !password || !role || !image) {
      toast.error("All fields are required");
      return;
    }

    const userData: RegisterOrUpdatePayload = {
      username,
      email,
      phone: phone,
      role,
      password,
      ...(imageUrl && { image: imageUrl }),
    };

    register(userData, {
      onSuccess: (data) => {
        toast.success(`${data.username} successfully created`);
        navigate("/admin/users");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to register user");
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-65px)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between w-[60%] items-center mb-8"
      >
        <h1 className="text-[#4A4BAC] font-extrabold text-2xl uppercase tracking-widest">
          Add Users
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
        className="w-[60%] bg-white p-8 rounded-lg shadow-xl space-y-6"
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

        <div className={`w-full my-8 ${imageUrl ? "" : ""}`}>
          <label className="border-2 border-dashed border-indigo-300 p-6 block w-full text-center rounded-lg cursor-pointer font-semibold text-[#4A4BAC90] hover:bg-indigo-50 hover:border-indigo-400 transition duration-200">
            {!isUploading && (image ? image.name : "Upload Image")}

            {isUploading && (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-6 w-6 text-[#4A4BAC]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
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
                <span className="ml-2 text-[#4A4BAC] font-semibold">
                  Uploading image...
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
              disabled={isUploading}
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
              htmlFor="password"
            >
              Enter Password
            </label>
            <input
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              type="password"
              placeholder="Enter Your Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            disabled={isRegistering}
          >
            {isRegistering ? (
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
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddUsers;
