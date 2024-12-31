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
import { Link } from "react-router-dom";
import { DeleteRounded, EditRounded } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  useDeleteClientMutation,
  useGetClientsQuery,
} from "../../redux/features/clients/clientApiSlice";
import dayjs from "dayjs";
// interface Client {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   location: string;
//   priority: "normal" | "high" | "very high";
//   startDate: string;
//   endDate: string;
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
        if (isSuccess) {
          toast.success(
            `Successfully deleted client with id: ${selectedClientId}`
          );
        } else {
          toast.error(`Error: ${error}`);
        }
        handleClose();
      } catch (err: unknown) {
        toast.error(err.message || "Failed to delete client.");
      }
    }
  };

  if (isLoading) return <div>Loading clients...</div>;

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
              Company Name
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
              Priority
            </TableCell>
            <TableCell
              sx={{
                textTransform: "uppercase",
                fontWeight: "bolder",
                letterSpacing: "2px",
                color: "white",
              }}
            >
              End Date
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
              <TableCell colSpan={9} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
          {clients?.map((client) => (
            <TableRow
              className="transition-transform duration-300 ease-in-out cursor-pointer hover:bg-gray-100"
              key={client.id}
            >
              <TableCell>{client.id}</TableCell>
              <TableCell>
                <Link to={`/admin/clients/${client.id}`}>{client.name}</Link>
              </TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.priority}</TableCell>
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
                  onClick={() => handleOpen(client.id)}
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
              "& .MuiAlert-message": {
                textAlign: "center",
              },
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
