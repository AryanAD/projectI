import { useNavigate, useParams } from "react-router";
import { useGetUserByIdQuery } from "../../redux/features/users/userApiSlice";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { ArrowBackRounded } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import CustomChip from "../../components/custom/CustomChip";

const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: userData } = useGetUserByIdQuery(id);

  console.log(userData);

  return (
    <div className={CustomCSS.mainDiv}>
      <div className="inline-flex justify-between">
        <CustomHeading heading="User Details" />

        <button
          onClick={() => navigate("/users")}
          className={CustomCSS.addButton}
        >
          <ArrowBackRounded />
          Back
        </button>
      </div>

      <div className="flex items-center justify-around w-full">
        <div className="w-[35%]">
          <Avatar
            src={userData?.image}
            sx={{
              width: 400,
              height: 400,
              margin: "2rem 0",
              boxShadow: "0 4px 50px 2px rgba(0,0,0,0.34)",
            }}
          />
        </div>

        <div className="w-[55%] flex flex-col items-center justify-around">
          <div className="w-[90%]">
            <div className="inline-flex items-center justify-between w-full">
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 500,
                  textTransform: "uppercase",
                  textDecoration: "underline",
                }}
              >
                {userData?.username}
              </Typography>

              <CustomChip text={userData?.role} role={userData?.role} />
            </div>

            <Typography variant="h5">Email: {userData?.email}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
