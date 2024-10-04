import { CustomCSS } from "../../components/custom/CustomCSS";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full bg-gradient-to-tr from-orange-300 to-red-300 blur-md hover:blur-none brightness-75 hover:brightness-100 transition-all duration-1000 ease-in-out">
      <div className="flex flex-col items-center justify-between rounded-md drop-shadow-2xl bg-white min-w-[350px] border-b-2 border-teal-300 rounded-b-lg">
        <div className="bg-sky-500 w-full text-center border-b-[1px] border-black rounded-t-lg py-2">
          <h1 className="text-2xl tracking-widest text-white uppercase font-extrabold">
            Saral Admin
          </h1>
        </div>

        <div className="flex flex-col w-[90%] pt-4 ">
          <label className="text-[#888]" htmlFor="email">
            Enter Email
          </label>
          <input
            className="py-2 border rounded-lg px-6 placeholder:text-zinc-300 focus:outline-emerald-200"
            type="email"
            name="email"
            id="email"
            placeholder="meroemail@saraladmin.com"
          />
        </div>

        <div className="flex flex-col w-[90%] py-4">
          <label className="text-[#888]" htmlFor="password">
            Enter Password
          </label>
          <input
            className="py-2 border rounded-lg px-6 placeholder:text-zinc-300 focus:outline-emerald-200"
            type="password"
            name="password"
            id="password"
            placeholder="StrongPassword"
          />
        </div>

        <button
          className={`${CustomCSS.submitButton} py-3 rounded-sm mb-4`}
          type="submit"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
