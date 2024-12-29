import { useEffect, useState } from "react";
import {
  useDeleteUserByIdMutation,
  useGetAllUsersQuery,
} from "../../redux/features/users/userApiSlice";
import {
  Alert,
  Box,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CustomCSS } from "../custom/CustomCSS";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface Users {
  id?: number;
  username?: string;
  email?: string;
  phone?: string;
  role?: string;
  image?: string;
}

const UsersTable = () => {
  const [userData, setUserData] = useState<Users[] | undefined>(undefined);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const { data, isSuccess, error, isLoading } = useGetAllUsersQuery();
  const [deleteUserById, { isLoading: isDeleting }] =
    useDeleteUserByIdMutation();

  const handleOpen = (id: number) => {
    setSelectedUserId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    if (selectedUserId !== null) {
      try {
        await deleteUserById(selectedUserId).unwrap();
        toast.success(`Successfully deleted user with id: ${selectedUserId}`);
        handleClose();
      } catch (error: unknown) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setUserData(data);
    } else if (error) {
      console.error(error);
    }
  }, [data, error, isSuccess]);

  return (
    <>
      <Table className="mt-8 rounded-t-lg overflow-hidden shadow-lg">
        <TableHead className="bg-[#7978E9]">
          <TableRow>
            <TableCell
              sx={{
                textTransform: "uppercase",
                fontWeight: "bolder",
                letterSpacing: "2px",
                color: "white",
              }}
            >
              ID
            </TableCell>
            <TableCell
              sx={{
                textTransform: "uppercase",
                fontWeight: "bolder",
                letterSpacing: "2px",
                color: "white",
              }}
            >
              Username
            </TableCell>
            <TableCell
              sx={{
                textTransform: "uppercase",
                fontWeight: "bolder",
                letterSpacing: "2px",
                color: "white",
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                textTransform: "uppercase",
                fontWeight: "bolder",
                letterSpacing: "2px",
                color: "white",
              }}
            >
              Phone Number
            </TableCell>
            <TableCell
              sx={{
                textTransform: "uppercase",
                fontWeight: "bolder",
                letterSpacing: "2px",
                color: "white",
              }}
            >
              Role
            </TableCell>
            <TableCell
              sx={{
                textTransform: "uppercase",
                fontWeight: "bolder",
                letterSpacing: "2px",
                color: "white",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody className="bg-[#f9f9f9]">
          {isLoading && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
          {userData?.map((user) => (
            <TableRow
              key={user.id}
              className="transition-transform duration-300 ease-in-out cursor-pointer hover:bg-gray-100"
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Link to={`/admin/users/${user.id}`}>{user.username}</Link>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Link to={`/admin/edit-user/${user.id}`}>
                  <IconButton
                    sx={{
                      color: "#488ac7",
                      "&:hover": {
                        bgcolor: "#488ac7",
                        color: "white",
                      },
                      transition: "all ease-in-out 0.2s",
                    }}
                  >
                    <EditRounded />
                  </IconButton>
                </Link>

                <IconButton
                  onClick={() => handleOpen(user.id)}
                  sx={{
                    color: "#db0f27",
                    "&:hover": {
                      bgcolor: "#db0f27",
                      color: "white",
                    },
                    transition: "all ease-in-out 0.2s",
                  }}
                >
                  <DeleteRounded />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          transition: "opacity 0.3s ease",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #ff000070",
            borderRadius: "12px",
            boxShadow: 24,
            p: 4,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <Typography
            fontWeight={500}
            textTransform={"uppercase"}
            mb={1}
            variant="h5"
            className="text-center"
          >
            Are you sure to delete this user?
          </Typography>

          <Alert sx={{ mb: 2 }} severity="error">
            Deleted users can't be recovered!
          </Alert>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="py-3 text-[#f6f6f6] bg-[#db0f27] font-bold text-md px-6 rounded-[4px] transition-all ease-in duration-200 uppercase outline-none hover:bg-[#9A0B1B] hover:ring-1 hover:ring-[#db0f2790] tracking-[2px] w-full"
          >
            <DeleteRounded />
            {isDeleting ? "Deleting..." : "Delete User"}
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default UsersTable;
