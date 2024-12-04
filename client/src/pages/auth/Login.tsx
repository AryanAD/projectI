// import { useState } from "react";
// import { CustomCSS } from "../../components/custom/CustomCSS";
// import { useGetAllUsersQuery } from "../../redux/features/users/userApiSlice";
// import { useNavigate } from "react-router";

// const Login = () => {
//   const { data } = useGetAllUsersQuery();
//   const navigate = useNavigate();
//   console.log(data);

//   const [email, setEmail] = useState<string>("test@test.test");
//   const [password, setPassword] = useState<string>("test");

//   const handleSubmit = () => {
//     const admin = data?.filter((user) => user.role === "admin");
//     const staff = data?.filter((user) => user.role === "staff");

//     console.log(email);
//     console.log(staff);
//     console.log(admin);
//     console.log(admin[0].email);
//     console.log(admin[0].password);

//     if (admin[0].email === email && admin[0].password === password) {
//       console.log("admin");
//       navigate("/home");
//     } else if (staff.some((s) => s.email === email)) {
//       console.log("staff");
//       navigate("/hello");
//     } else {
//       console.log("Not Found");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-[100vh] w-full bg-gradient-to-tr from-orange-300 to-red-300 blur-md hover:blur-none brightness-75 hover:brightness-100 transition-all duration-1000 ease-in-out">
//       <div className="flex flex-col items-center justify-between rounded-md drop-shadow-2xl bg-white min-w-[350px] border-b-2 border-teal-300 rounded-b-lg">
//         <div className="bg-sky-500 w-full text-center border-b-[1px] border-black rounded-t-lg py-2">
//           <h1 className="text-2xl tracking-widest text-white uppercase font-extrabold">
//             Saral Admin
//           </h1>
//         </div>

//         <div className="flex flex-col w-[90%] pt-4 ">
//           <label className="text-[#888]" htmlFor="email">
//             Enter Email
//           </label>
//           <input
//             className="py-2 border rounded-lg px-6 placeholder:text-zinc-300 focus:outline-emerald-200"
//             type="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             id="email"
//             placeholder="meroemail@saraladmin.com"
//           />
//         </div>

//         <div className="flex flex-col w-[90%] py-4">
//           <label className="text-[#888]" htmlFor="password">
//             Enter Password
//           </label>
//           <input
//             className="py-2 border rounded-lg px-6 placeholder:text-zinc-300 focus:outline-emerald-200"
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             id="password"
//             placeholder="StrongPassword"
//           />
//         </div>

//         <button
//           className={`${CustomCSS.submitButton} py-3 rounded-sm mb-4`}
//           type="submit"
//           onClick={handleSubmit}
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/users/userApiSlice";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await login({ email, password }).unwrap();
      toast.success(`Welcome back, ${user.username}!`);

      // Navigate to different pages based on user role
      if (user.role === "admin") {
        navigate("/");
      } else if (user.role === "staff") {
        navigate("/staff");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid login credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-orange-300 to-red-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border rounded-md focus:outline-teal-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border rounded-md focus:outline-teal-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-2 text-white bg-teal-500 rounded-md transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-600"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
