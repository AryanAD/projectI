import { Link } from "react-router-dom";
import ErrorImage from "../../../public/errorImage.svg";
import { HomeRounded } from "@mui/icons-material";
const ErrorDisplay = () => {
  return (
    <div className="flex justify-center grow items-center flex-col h-[100vh] ">
      <img
        src={ErrorImage}
        alt="ERROR 404 NOT FOUND"
        className="bg-cover bg-no-repeat bg-cent    er w-[600px]"
      />
      <h1 className="mt-[-80px] font-extrabold uppercase text-5xl">
        <span className="text-sky-500">Page </span>
        <span className="text-amber-600">Not </span>
        <span className="text-teal-300">Found</span>
      </h1>
      <p className="mt-4 font-medium text-lg ">
        Explore our Homepage in the meantime...
      </p>
      <Link to={"/"}>
        <button className="outline outline-1 outline-blue-300 py-1 px-3 flex items-center justify-center gap-1 text-xl font-bold uppercase mt-8 rounded-md text-white animate-bounce transition-all">
          <HomeRounded />
          Homepage
        </button>
      </Link>
    </div>
  );
};

export default ErrorDisplay;
