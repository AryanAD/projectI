import React, { useState } from "react";
import {
  useRegisterMutation,
  useUploadUserImageMutation,
} from "../../redux/features/users/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

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
    <div className="flex items-center justify-center w-[80vw] h-[100vh]">
      <form onSubmit={handleSubmit}>
        {imageUrl && (
          <div className="text-center">
            <img
              src={imageUrl}
              alt="User Profile"
              className="block mx-auto max-h-[200px] max-w-[200px] rounded-mb mb-5"
            />
          </div>
        )}

        <div className={`mb-3 ${imageUrl ? "hidden" : ""}`}>
          <label className="">
            {image ? image.name : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label htmlFor="username">Enter Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Enter Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AddUsers;
