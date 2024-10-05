import { useState } from "react";
import { useRegisterMutation } from "../../redux/features/users/userApiSlice";
import { toast } from "react-toastify";

const AddUsers = () => {
  // Redux
  const [register, { isLoading }] = useRegisterMutation();

  // States
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = { username, email, password };

      const res = await register(userData).unwrap();

      toast.success(`${res.username} Successfully Created`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to register user");
    }
  };

  return (
    <div className="flex items-center justify-center w-[80vw] h-[100vh]">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username">Enter Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Enter Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Name"
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
