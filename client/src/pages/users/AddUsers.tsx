import React, { useState } from "react";
import {
  useRegisterMutation,
  useUploadUserImageMutation,
} from "../../redux/features/users/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Container } from "@mui/material";
import CustomHeading from "../../components/custom/CustomHeading";
import { CustomCSS } from "../../components/custom/CustomCSS";

interface UploadImageResponse {
  message: string;
  image: string;
}

const AddUsers = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const [uploadUserImage] = useUploadUserImageMutation();

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res: UploadImageResponse =
          await uploadUserImage(formData).unwrap();
        toast.success(res.message);
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

    try {
      const userData = new FormData();
      userData.append("username", username);
      userData.append("email", email);
      userData.append("password", password);
      if (imageUrl) {
        userData.append("image", imageUrl);
      }

      const data = await register(userData).unwrap();
      toast.success(`${data.username} Successfully Created`);
      navigate("/manage-users");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register user");
    }
  };

  return (
    <Container className={CustomCSS.cardBG}>
      <CustomHeading heading={"Add Users"} />

      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="User Profile"
                className={CustomCSS.displayUploadedImage}
              />
            </div>
          )}

          <div className={`w-full my-8 ${imageUrl ? "hidden" : ""}`}>
            <label className={CustomCSS.imageLabel}>
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-6 w-full">
            <div className="flex flex-col">
              <label className={CustomCSS.label} htmlFor="username">
                Enter Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter Your Username"
                className={CustomCSS.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className={CustomCSS.label} htmlFor="password">
                Enter Password
              </label>
              <input
                className={CustomCSS.input}
                type="password"
                placeholder="Enter Your Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col col-span-full">
              <label className={CustomCSS.label} htmlFor="email">
                Enter Email
              </label>
              <input
                className={CustomCSS.input}
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
    </Container>
  );
};

export default AddUsers;
