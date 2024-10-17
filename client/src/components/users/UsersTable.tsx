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
  role?: string;
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
      <Table className="mt-8">
        <TableHead className="bg-[#7978E9]">
          <TableRow>
            <TableCell sx={{ ...CustomCSS.tableCell, borderRadius: "6px 0 0" }}>
              ID
            </TableCell>
            <TableCell sx={CustomCSS.tableCell}>Username</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Email</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Role</TableCell>
            <TableCell
              sx={{ ...CustomCSS.tableCell, borderRadius: "0 6px 0 0" }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading && <TableRow>Loading...</TableRow>}
          {userData?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <Link to={`/users/${user.id}`}>
                <TableCell>{user.username}</TableCell>
              </Link>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Link to={`/edit-user/${user.id}`}>
                  <IconButton
                    sx={{ ...CustomCSS.editIconButton, marginRight: 1 }}
                  >
                    <EditRounded />
                  </IconButton>
                </Link>

                <IconButton
                  onClick={() => {
                    handleOpen(user.id);
                  }}
                  sx={CustomCSS.deleteIconButton}
                >
                  <DeleteRounded />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={open} onClose={handleClose}>
        <Box sx={CustomCSS.deleteModal}>
          <Typography
            fontWeight={500}
            textTransform={"uppercase"}
            mb={1}
            variant="h5"
          >
            Are you sure to delete this user?
          </Typography>

          <Alert sx={{ mb: 2 }} severity="error">
            Deleted users can't be recovered!
          </Alert>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`${CustomCSS.deleteButton} inline-flex gap-1`}
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
