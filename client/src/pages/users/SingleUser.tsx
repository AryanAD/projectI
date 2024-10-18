import { useNavigate, useParams } from "react-router";
import { useGetUserByIdQuery } from "../../redux/features/users/userApiSlice";
import { CustomCSS } from "../../components/custom/CustomCSS";
import CustomHeading from "../../components/custom/CustomHeading";
import { ArrowBackRounded } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import CustomChip from "../../components/custom/CustomChip";

const SingleUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const userId = parseInt(id || "", 10);
  const { data: userData, isLoading, error } = useGetUserByIdQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !userData) {
    return <div>Error loading user data or user not found.</div>;
  }

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

      <div className="flex items-center justify-around w-full flex-wrap">
        <div className="lg:w-[35%] w-full">
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

        <div className="lg:w-[55%] w-full flex justify-center">
          <div className="w-[90%] flex flex-col justify-around gap-5">
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

            <Typography variant="h5">
              <span className="font-semibold">Email:</span> {userData?.email}
            </Typography>

            <Typography variant="h5">
              <span className="font-semibold">Phone:</span>{" "}
              {userData?.phone || "N/A"}
            </Typography>

            <Typography variant="h5">
              <span className="font-semibold">Created At:</span>{" "}
              {userData?.createdAt &&
                userData?.createdAt.toString().slice(0, 10)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
