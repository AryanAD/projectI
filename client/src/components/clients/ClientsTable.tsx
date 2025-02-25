import {
  Alert,
  Avatar,
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
import { Link } from "react-router-dom";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useState } from "react";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteClient, useGetClients } from "../../api/clients/clients";

const ClientsTable = () => {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: clients, isLoading, isError } = useGetClients();
  const { mutate: deleteClient, isPending: isDeleting } = useDeleteClient();

  const handleOpen = (id: number) => {
    setSelectedClientId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    if (selectedClientId !== null) {
      deleteClient(selectedClientId, {
        onSuccess: () => {
          toast.success(
            `Successfully deleted client with ID: ${selectedClientId}`
          );
          queryClient.invalidateQueries({ queryKey: ["clients"] });
          handleClose();
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to delete client.");
        },
      });
    }
  };

  if (isLoading) return <div>Loading clients...</div>;
  if (isError) return <div>Failed to load clients.</div>;

  return (
    <>
      <Table className="mt-8 rounded-t-lg overflow-hidden shadow-lg">
        <TableHead className="bg-[#7978E9]">
          <TableRow>
            {[
              "ID",
              "Company",
              "Email",
              "Phone Number",
              "Category",
              "End Date",
              "Action",
            ].map((header) => (
              <TableCell
                key={header}
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "bolder",
                  letterSpacing: "2px",
                  color: "white",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody className="bg-[#f9f9f9]">
          {clients?.map((client) => (
            <TableRow
              key={client.id}
              className="transition-transform duration-300 ease-in-out cursor-pointer hover:bg-gray-100"
            >
              <TableCell>{client.id}</TableCell>
              <TableCell>
                <Link
                  to={`/admin/clients/${client.id}`}
                  className="flex items-center gap-2"
                >
                  <Avatar src={client.logo} alt={client.name} />
                  {client.name}
                </Link>
              </TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.ClientCategory.name}</TableCell>
              <TableCell>
                {client.endDate
                  ? dayjs(client.endDate).format("MM/DD/YYYY")
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Link to={`/admin/edit-clients/${client.id}`}>
                  <IconButton
                    sx={{
                      color: "#488ac7",
                      "&:hover": { bgcolor: "#488ac7", color: "white" },
                      transition: "all ease-in-out 0.2s",
                    }}
                  >
                    <EditRounded />
                  </IconButton>
                </Link>
                <IconButton
                  onClick={() => handleOpen(client.id)}
                  sx={{
                    color: "#db0f27",
                    "&:hover": { bgcolor: "#db0f27", color: "white" },
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
        sx={{ transition: "opacity 0.3s ease-in-out" }}
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
            sx={{ mb: 2, lineHeight: 1.6 }}
          >
            Are you sure you want to delete this client? This action cannot be
            undone.
          </Typography>

          <Alert
            severity="error"
            sx={{
              width: "100%",
              fontSize: "0.9rem",
              mb: 2,
              justifyContent: "center",
              "& .MuiAlert-message": { textAlign: "center" },
            }}
          >
            Deleted clients can't be recovered!
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

export default ClientsTable;
