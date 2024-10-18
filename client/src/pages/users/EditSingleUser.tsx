import { ArrowBackRounded } from "@mui/icons-material";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
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
      toast.success(`${data.username} Successfully Created`);
      navigate("/users");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register user");
    }
  };

  return (
    <div className={CustomCSS.mainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading="Add Users" />

        <button
          className={CustomCSS.addButton}
          onClick={() => navigate("/users")}
        >
          <ArrowBackRounded />
          Back
        </button>
      </div>

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

        <div className={`w-full my-8 `}>
          <label className={CustomCSS.updateImageLabel}>
            {image ? image.name : "Update Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        <div className={CustomCSS.gridTwo}>
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
            <label className={CustomCSS.label} htmlFor="role">
              Enter role
            </label>
            <input
              className={CustomCSS.input}
              type="role"
              placeholder="Enter Your role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
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

          <div className="flex flex-col">
            <label className={CustomCSS.label} htmlFor="phone">
              Enter Phone Number
            </label>
            <input
              className={CustomCSS.input}
              type="number"
              id="phone"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="my-5">
          <button
            className={CustomCSS.submitButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSingleUser;
