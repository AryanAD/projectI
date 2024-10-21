import { ArrowBackRounded } from "@mui/icons-material";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetClientCategoriesQuery,
  useGetClientsQuery,
  useUpdateClientMutation,
  useUploadClientLogoMutation,
} from "../../redux/features/clients/clientApiSlice";
interface UploadImageResponse {
  message: string;
  image: string;
}

const EditSingleClient = () => {
  const [updateClient, { isLoading }] = useUpdateClientMutation();
  const [uploadUserImage] = useUploadClientLogoMutation();
  const { data: previousClientData } = useGetClientsQuery();
  const { data: existingCategories } = useGetClientCategoriesQuery();

  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [clientCategoryId, setClientCategoryId] = useState<number>();
  const [details, setDetails] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [existingCategoryName, setExistingCategoryName] = useState<string>("");

  const navigate = useNavigate();

  const { id } = useParams();
  const clientId = parseInt(id);

  useEffect(() => {
    if (previousClientData && id) {
      const previousClient = previousClientData.find(
        (element) => element.id === clientId
      );
      const formatDate = (dateString: string) => {
        return new Date(dateString).toISOString().slice(0, 16); // Format to yyyy-MM-ddThh:mm
      };
      if (previousClient) {
        setFirstName(previousClient?.name.split(" ")[0] || "");
        setLastName(previousClient?.name.split(" ")[1] || "");
        setEmail(previousClient.email || "");
        setDetails(previousClient.details || "");
        setPhone(previousClient.phone || "");
        setPriority(previousClient.priority || "");
        setStartDate(formatDate(previousClient.startDate || ""));
        setEndDate(formatDate(previousClient.endDate || ""));
        setLocation(previousClient.location || "");
        setLogoUrl(previousClient.logo || null);
        setClientCategoryId(previousClient.categoryId);
        setExistingCategoryName(previousClient.ClientCategory.name || "");
      }
    }
  }, [previousClientData, id, clientId]);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res: UploadImageResponse =
          await uploadUserImage(formData).unwrap();
        setLogo(file);
        setLogoUrl(res.image);
      } catch (error: unknown) {
        const err = error as { data?: { message?: string }; error?: string };
        console.error(err);
        toast.error(err?.data?.message || err?.error || "Upload failed");
      }
    }
  };
  const getFullName = () => {
    return firstName + " " + lastName;
  };

  const name = getFullName();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedClientData = {
        name,
        details,
        phone,
        email,
        location,
        priority: priority.toLowerCase(),
        startDate,
        endDate,
        ...(logoUrl && { logo: logoUrl }),
        clientCategoryId,
      };
      const data = await updateClient({
        id: clientId,
        data: updatedClientData,
      }).unwrap();
      toast.success(`${data.name} Successfully Updated`);
      navigate("/clients");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update client");
    }
  };

  return (
    <div className={CustomCSS.mainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading="Edit Client" />

        <button
          className={CustomCSS.addButton}
          onClick={() => navigate("/clients")}
        >
          <ArrowBackRounded />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {logoUrl && (
          <div className="text-center">
            <img
              src={logoUrl}
              alt="Client Profile"
              className={CustomCSS.displayUploadedImage}
            />
          </div>
        )}

        <div className={`w-full my-8 `}>
          <label className={CustomCSS.updateImageLabel}>
            {logo ? logo.name : "Update Image"}
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
            <label className={CustomCSS.label} htmlFor="firstName">
              Enter First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter Client First name"
              className={CustomCSS.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className={CustomCSS.label} htmlFor="lastName">
              Enter Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Client Last name"
              className={CustomCSS.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              placeholder="Enter Client Email"
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
              placeholder="Enter Client Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className={CustomCSS.label} htmlFor="location">
              Enter Location
            </label>
            <input
              className={CustomCSS.input}
              type="text"
              id="location"
              placeholder="Enter Client Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className={CustomCSS.label} htmlFor="endDate">
              Select Contract End Date
            </label>
            <input
              className={CustomCSS.input}
              type="datetime-local"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className={CustomCSS.label} htmlFor="priority">
              Select Priority
            </label>
            <select
              className={`${CustomCSS.select} bg-white`}
              id="priority"
              value={priority || ""}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">--Select Client Priority--</option>
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className={CustomCSS.label} htmlFor="category">
              Select Category
            </label>
            <select
              className={`${CustomCSS.select} bg-white`}
              id="category"
              value={clientCategoryId || ""}
              onChange={(e) => {
                setClientCategoryId(parseInt(e.target.value));
              }}
            >
              <option value={""}>--Select Client Category--</option>
              {existingCategories &&
                existingCategories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col col-span-full">
            <label className={CustomCSS.label} htmlFor="clientDetails">
              Enter Client Details
            </label>
            <textarea
              id="clientDetails"
              value={details}
              className={CustomCSS.input}
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
              placeholder="Enter Client Details Here..."
            ></textarea>
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

export default EditSingleClient;

const priorityOptions = [
  { value: "Very High" },
  { value: "High" },
  { value: "Normal" },
];
