import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ArrowBackRounded } from "@mui/icons-material";
import {
  useAddClient,
  useGetClientCategories,
  useUploadClientLogo,
} from "../../api/clients/clients";

const AddClients = () => {
  const addClientMutation = useAddClient();
  const { data: existingCategories } = useGetClientCategories();
  const { mutate: uploadClientLogo } = useUploadClientLogo();

  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [clientCategoryId, setClientCategoryId] = useState<number>();
  const [details, setDetails] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const navigate = useNavigate();

  const handleLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setIsUploading(true);

      try {
        uploadClientLogo(formData, {
          onSuccess: (res) => {
            setLogo(file);
            setLogoUrl(res.image);
          },
          onError: (error) => {
            toast.error(error.message || "Logo upload failed");
          },
          onSettled: () => {
            setIsUploading(false);
          },
        });
      } catch (error) {
        console.error(error);
        toast.error("Logo upload failed");
      }
    }
  };

  const getFullName = () => `${firstName} ${lastName}`;

  const getFormattedDate = () => {
    const date = new Date();
    return date.toISOString().slice(0, 16);
  };

  const name = getFullName();
  const startDate = getFormattedDate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !name ||
      !logo ||
      !details ||
      !email ||
      !phone ||
      !priority ||
      !location ||
      !clientCategoryId ||
      !startDate ||
      !endDate
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const clientData = {
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

      const data = await addClientMutation.mutateAsync(clientData);
      toast.success(`${data.name} Successfully Created`);
      navigate("/admin/clients");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register client");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between w-[60%] items-center mb-8"
      >
        <h1 className="text-[#4A4BAC] font-extrabold text-2xl uppercase tracking-widest">
          Add Clients
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
        className="w-[60%] bg-white p-8 rounded-lg shadow-xl space-y-6"
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

        <div className={`w-full my-8 ${logoUrl ? "block" : ""}`}>
          <label className="border-2 border-dashed border-indigo-300 p-6 block w-full text-center rounded-lg cursor-pointer font-semibold text-[#4A4BAC90] hover:bg-indigo-50 hover:border-indigo-400 transition duration-200">
            {!isUploading && (logo ? logo.name : "Upload Logo")}

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
                  Uploading logo...
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleLogo}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <InputField
            label="First Name"
            value={firstName}
            onChange={setFirstName}
          />
          <InputField
            label="Last Name"
            value={lastName}
            onChange={setLastName}
          />
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <InputField
            label="Phone"
            type="number"
            value={phone}
            onChange={setPhone}
          />
          <InputField
            label="Location"
            value={location}
            onChange={setLocation}
          />
          <InputField
            label="End Date"
            type="date"
            value={endDate}
            onChange={setEndDate}
          />

          <SelectField
            label="Priority"
            value={priority}
            onChange={setPriority}
            options={priorityOptions}
          />

          <SelectField
            label="Category"
            value={clientCategoryId?.toString() || ""}
            onChange={(value) => setClientCategoryId(Number(value))}
            options={
              existingCategories?.map((cat) => ({
                value: cat.id,
                label: cat.name,
              })) || []
            }
          />

          <div className="flex flex-col col-span-full">
            <label className="block text-sm font-bold text-[#4A4BAC90] mb-2">
              Client Details
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
              rows={5}
              placeholder="Enter Client Details Here..."
            ></textarea>
          </div>
        </div>

        <div className="my-6 text-center">
          <button
            className="py-2 px-6 rounded-full bg-[#4A4BAC] text-white hover:bg-indigo-700 font-semibold text-lg w-full transition-all duration-200"
            type="submit"
            disabled={addClientMutation.isPending}
          >
            {addClientMutation.isPending ? "Registering..." : "Register"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddClients;

const priorityOptions = [
  { value: "Very High", label: "Very High" },
  { value: "High", label: "High" },
  { value: "Normal", label: "Normal" },
];

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
}: InputFieldProps) => (
  <div className="flex flex-col">
    <label className="block text-sm font-bold text-[#4A4BAC90] mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="py-3 rounded-lg px-6 border w-full border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
      placeholder={`Enter ${label}`}
    />
  </div>
);

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string | number; label: string }[];
}

const SelectField = ({ label, value, onChange, options }: SelectFieldProps) => (
  <div className="flex flex-col">
    <label className="block text-sm font-bold text-[#4A4BAC90] mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="py-3 rounded-lg px-6 border w-full bg-white border-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
    >
      <option value="">--Select {label}--</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
