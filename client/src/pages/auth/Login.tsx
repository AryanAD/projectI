// import React, { useEffect, useState } from "react";
// import { CustomCSS } from "../../components/custom/CustomCSS";
// import {
//   useGetAllUsersQuery,
//   useLoginMutation,
// } from "../../redux/features/users/userApiSlice";
// import { useLocation, useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import CustomLoader from "../../components/custom/CustomLoader";
// import { setCredentials } from "../../redux/features/auth/authApiSlice";

// const Login = () => {
//   const { data } = useGetAllUsersQuery();
//   const [login, { isLoading }] = useLoginMutation();
//   const { userInfo } = useSelector((state: string) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get("redirect") || "/";

//   const [email, setEmail] = useState<string>("test@test.test");
//   const [password, setPassword] = useState<string>("test");

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await login({ email, password }).unwrap();
//       dispatch(setCredentials({ ...res }));
//       navigate(redirect);
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
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

//         <form onSubmit={handleSubmit} className="container w-[40rem]">
//           <div className="flex flex-col w-[90%] pt-4 ">
//             <label className="text-[#888]" htmlFor="email">
//               Enter Email
//             </label>
//             <input
//               className="py-2 border rounded-lg px-6 placeholder:text-zinc-300 focus:outline-emerald-200"
//               type="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               id="email"
//               placeholder="meroemail@saraladmin.com"
//             />
//           </div>

//           <div className="flex flex-col w-[90%] py-4">
//             <label className="text-[#888]" htmlFor="password">
//               Enter Password
//             </label>
//             <input
//               className="py-2 border rounded-lg px-6 placeholder:text-zinc-300 focus:outline-emerald-200"
//               type="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               id="password"
//               placeholder="StrongPassword"
//             />
//           </div>

//           <button
//             disabled={isLoading}
//             className={`${CustomCSS.submitButton} py-3 rounded-sm mb-4`}
//             type="submit"
//           >
//             {isLoading ? "Logging in..." : "Log in"}
//           </button>
//           {isLoading && <CustomLoader />}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React from "react";

const Login = () => {
  return <div>Login</div>;
};

export default Login;
