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
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            textTransform="uppercase"
            color="text.primary"
            align="center"
            className="tracking-wider"
          >
            Confirm Deletion
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{
              mb: 2,
              lineHeight: 1.6,
            }}
          >
            Are you sure you want to delete this user? This action cannot be
            undone.
          </Typography>

          <Alert
            severity="error"
            sx={{
              width: "100%",
              fontSize: "0.9rem",
              mb: 2,
              justifyContent: "center",
              "& .MuiAlert-message": {
                textAlign: "center",
              },
            }}
          >
            Deleted users can't be recovered!
          </Alert>

          <div className="flex gap-4 justify-center w-full">
            <button
              onClick={handleClose}
              className="py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded hover:bg-gray-300 transition-all duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`py-2 px-6 font-semibold rounded text-white transition-all duration-200 ease-in-out ${
                isDeleting
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-[#db0f27] hover:bg-[#9A0B1B]"
              }`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UsersTable;
