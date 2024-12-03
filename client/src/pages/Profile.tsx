import { useNavigate } from "react-router";
import { CustomCSS } from "../components/custom/CustomCSS";
import CustomHeading from "../components/custom/CustomHeading";
import { HomeRounded } from "@mui/icons-material";
import { useGetProfileQuery } from "../redux/features/users/userApiSlice";

const Profile = () => {
  const { data } = useGetProfileQuery();
  console.log(data);
  const navigate = useNavigate();
  return (
    <div className={CustomCSS.mainDiv}>
      <div className="inline-flex justify-between w-full">
        <CustomHeading heading={"Profile"} />

        <button className={CustomCSS.addButton} onClick={() => navigate("/")}>
          <HomeRounded />
          Home
        </button>
      </div>

      <div className="flex flex-col"></div>
    </div>
  );
};

export default Profile;
