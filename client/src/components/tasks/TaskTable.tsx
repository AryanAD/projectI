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
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { useAllTasks, useDeleteTask } from "../../api/tasks/tasks";

const TasksTable = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: tasks, isLoading, isError } = useAllTasks();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const handleOpen = (id: number) => {
    setSelectedTaskId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    if (selectedTaskId !== null) {
      deleteTask(selectedTaskId, {
        onSuccess: () => {
          toast.success(`Successfully deleted task with ID: ${selectedTaskId}`);
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          handleClose();
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to delete task.");
        },
      });
    }
  };

  const renderAssignedUsers = (users: { id: number; username: string }[]) => {
    if (users.length === 0) {
      return "Unassigned";
    } else if (users.length === 1) {
      return users[0].username;
    } else {
      return `${users[0].username} + ${users.length - 1}`;
    }
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Failed to load tasks.</div>;

  return (
    <>
      <Table className="mt-8 rounded-t-lg overflow-hidden shadow-lg">
        <TableHead className="bg-[#7978E9]">
          <TableRow>
            {[
              "ID",
              "Title",
              "Assigned Users",
              "Project",
              "Client",
              "Status",
              "Created At",
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
          {tasks?.map((task) => (
            <TableRow
              key={task.id}
              className="transition-transform duration-300 ease-in-out cursor-pointer hover:bg-gray-100"
            >
              <TableCell>{task.id}</TableCell>
              <TableCell>
                <Link to={`/admin/tasks/${task.id}`}>{task.title}</Link>
              </TableCell>
              <TableCell>{renderAssignedUsers(task.Users || [])}</TableCell>
              <TableCell>
                <Link to={`/admin/projects/${task.projectId}`}>
                  {task.Project?.name || "N/A"}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/admin/clients/${task.clientId}`}>
                  {task.Client?.name || "N/A"}
                </Link>
              </TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>
                {dayjs(task.createdAt).format("MM/DD/YYYY")}
              </TableCell>
              <TableCell>
                <Link to={`/admin/edit-tasks/${task.id}`}>
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
                  onClick={() => handleOpen(task.id)}
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

      {/* Delete Confirmation Modal */}
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
            Are you sure you want to delete this task? This action cannot be
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
            Deleted tasks can't be recovered!
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

export default TasksTable;
