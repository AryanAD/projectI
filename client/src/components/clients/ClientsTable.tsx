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
import { Link } from "react-router-dom";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  useDeleteClientMutation,
  useGetClientsQuery,
} from "../../redux/features/clients/clientApiSlice";
import dayjs from "dayjs"; // Use dayjs or date-fns for date formatting

// interface Client {
//   id: number; // Required property
//   name: string;
//   email: string;
//   phone: string;
//   location: string;
//   priority: "normal" | "high" | "very high";
//   startDate: string; // Use string for easier handling
//   endDate: string; // Use string for easier handling
// }

const ClientsTable = () => {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const { data: clients, isSuccess, error, isLoading } = useGetClientsQuery();
  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();

  const handleOpen = (id: number) => {
    setSelectedClientId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    if (selectedClientId !== null) {
      try {
        await deleteClient(selectedClientId).unwrap();
        toast.success(
          `Successfully deleted client with id: ${selectedClientId}`
        );
        handleClose();
      } catch (error: unknown) {
        toast.error(error.message || "Failed to delete client.");
      }
    }
  };

  if (isLoading) return <div>Loading clients...</div>;

  return (
    <>
      <Table className="mt-8">
        <TableHead className="bg-[#7978E9]">
          <TableRow>
            <TableCell sx={{ ...CustomCSS.tableCell, borderRadius: "6px 0 0" }}>
              ID
            </TableCell>
            <TableCell sx={CustomCSS.tableCell}>Company Name</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Email</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Phone Number</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Location</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Priority</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Start Date</TableCell>
            <TableCell sx={CustomCSS.tableCell}>End Date</TableCell>
            <TableCell
              sx={{ ...CustomCSS.tableCell, borderRadius: "0 6px 0 0" }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {clients?.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <Link to={`/clients/${client.id}`}>
                <TableCell>{client.name}</TableCell>
              </Link>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.location}</TableCell>
              <TableCell>{client.priority}</TableCell>
              <TableCell>
                {client.startDate
                  ? dayjs(client.startDate).format("MM/DD/YYYY")
                  : "N/A"}
              </TableCell>
              <TableCell>
                {client.endDate
                  ? dayjs(client.endDate).format("MM/DD/YYYY")
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Link to={`/edit-client/${client.id}`}>
                  <IconButton
                    sx={{ ...CustomCSS.editIconButton, marginRight: 1 }}
                  >
                    <EditRounded />
                  </IconButton>
                </Link>

                <IconButton
                  onClick={() => handleOpen(client.id)}
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
            Are you sure you want to delete this client?
          </Typography>

          <Alert sx={{ mb: 2 }} severity="error">
            Deleted clients can't be recovered!
          </Alert>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`${CustomCSS.deleteButton} inline-flex gap-1`}
          >
            <DeleteRounded />
            {isDeleting ? "Deleting..." : "Delete Client"}
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default ClientsTable;
