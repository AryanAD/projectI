import { ArrowBackRounded } from "@mui/icons-material";
import { CustomCSS } from "../../components/custom/CustomCSS";
import { motion } from "framer-motion";
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

  const handleLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      navigate("/admin/clients");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update client");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start px-6 pt-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between w-full items-center mb-8"
      >
        <h1 className="text-[#4A4BAC] font-extrabold text-2xl uppercase tracking-widest">
          Edit Clients
        </h1>
        <button
          className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white text-[#4A4BAC] hover:bg-indigo-200 font-bold uppercase text-lg shadow-md transition duration-300"
          onClick={() => navigate("/admin/clients")}
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
        className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl space-y-6"
      >
        {logoUrl && (
          <div className="text-center mb-6">
            <img
              src={logoUrl}
              alt="Client Logo"
              className="block mx-auto max-h-[400px] rounded-lg shadow-md transition-transform transform hover:scale-105"
            />
          </div>
        )}

        <div className={`w-full my-8 ${logoUrl ? "hidden" : ""}`}>
          <label className="border-2 border-dashed border-indigo-300 p-6 block w-full text-center rounded-lg cursor-pointer font-semibold text-[#4A4BAC90] hover:bg-indigo-50 hover:border-indigo-400 transition duration-200">
            {logo ? logo.name : "Upload logo"}
            <input
              type="file"
              accept="image/*"
              onChange={handleLogo}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="firstname"
            >
              Enter First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter Client First name"
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="lastname"
            >
              Enter Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Client Last name"
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              placeholder="Enter Client Email"
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
              placeholder="Enter Client Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="location"
            >
              Enter Location
            </label>
            <input
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              type="text"
              id="location"
              placeholder="Enter Client Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="endDate"
            >
              Enter Contract End Date
            </label>
            <input
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="priority"
            >
              Select Priority
            </label>
            <select
              className="py-3 rounded-lg px-6 border w-full bg-white border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              id="priority"
              value={priority}
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
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="category"
            >
              Select Category
            </label>
            <select
              className="py-3 rounded-lg px-6 border w-full bg-white border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              id="category"
              value={clientCategoryId || ""}
              onChange={(e) => {
                setClientCategoryId(parseInt(e.target.value));
              }}
            >
              <option value="">--Select Client Category--</option>
              {existingCategories &&
                existingCategories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col col-span-full">
            <label
              className="block text-sm font-bold text-[#4A4BAC90] mb-2"
              htmlFor="clientDetails"
            >
              Enter Client Details
            </label>
            <textarea
              id="clientDetails"
              value={details}
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
              placeholder="Enter Client Details Here..."
            ></textarea>
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

export default EditSingleClient;

const priorityOptions = [
  { value: "Very High" },
  { value: "High" },
  { value: "Normal" },
];
