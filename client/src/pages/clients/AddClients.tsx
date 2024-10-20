import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { ArrowBackRounded } from "@mui/icons-material";
import {
  useAddClientMutation,
  useUploadClientLogoMutation,
} from "../../redux/features/clients/clientApiSlice";

interface UploadLogoResponse {
  message: string;
  logo: string;
}

const AddClients = () => {
  const [addClient, { isLoading }] = useAddClientMutation();
  const [uploadClientLogo] = useUploadClientLogoMutation();

  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
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
      formData.append("logo", file);

      try {
        const res: UploadLogoResponse =
          await uploadClientLogo(formData).unwrap();
        setLogo(file);
        setLogoUrl(res.logo);
      } catch (error: unknown) {
        const err = error as { data?: { message?: string }; error?: string };
        console.error(err);
        toast.error(err?.data?.message || err?.error || "Upload failed");
      }
    }
  };

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
      !endDate
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const clientData = {
        name,
        details,
        phone: parseInt(phone),
        email,
        location,
        priority,
        endDate,
        ...(logoUrl && { logo: logoUrl }),
      };
      const data = await addClient(clientData).unwrap();
      toast.success(`${data.name} Successfully Created`);
      navigate("/clients");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register client");
    }
  };

  return (
    <div className={CustomCSS.mainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading="Add Clients" />

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
              alt="User Profile"
              className={CustomCSS.displayUploadedImage}
            />
          </div>
        )}

        <div className={`w-full my-8 ${logoUrl ? "hidden" : ""}`}>
          <label className={CustomCSS.imageLabel}>
            {logo ? logo.name : "Upload logo"}
            <input
              type="file"
              accept="logo/*"
              onChange={handleLogo}
              className="hidden"
            />
          </label>
        </div>

        <div className={CustomCSS.gridTwo}>
          <div className="flex flex-col">
            <label className={CustomCSS.label} htmlFor="name">
              Enter name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Client name"
              className={CustomCSS.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label className={CustomCSS.label} htmlFor="priority">
              Select Priority
            </label>
            <select
              className={CustomCSS.input}
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">--Select Client Priority--</option>
              {priorityOptions.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.value}
                </option>
              ))}
            </select>
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
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClients;

const priorityOptions = [
  { value: "very high" },
  { value: "high" },
  { value: "normal" },
];
