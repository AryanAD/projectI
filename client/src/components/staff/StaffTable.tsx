import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Box,
  CircularProgress,
  Modal,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useStaffTasks, useUpdateTaskStatus } from "../../api/staff/staffs";

const StaffTasksTable = () => {
  const { data: tasks, isLoading, isError } = useStaffTasks();
  const updateTaskStatus = useUpdateTaskStatus();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "success";
      case "doing":
        return "primary";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const getAvailableStatuses = (currentStatus: string) => {
    switch (currentStatus) {
      case "todo":
        return ["doing"];
      case "doing":
        return ["done"];
      case "done":
        return [];
      default:
        return [];
    }
  };

  const handleStatusChangeClick = (taskId: number, newStatus: string) => {
    setSelectedTask(taskId);
    setSelectedStatus(newStatus);
    setConfirmationOpen(true);
    setEditingId(null);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedTask || !selectedStatus) return;

    try {
      await updateTaskStatus.mutateAsync({
        id: selectedTask,
        status: selectedStatus,
      });
      toast.success("Task status updated successfully");
      setConfirmationOpen(false);
      setSelectedTask(null);
      setSelectedStatus("");
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <Box color="error.main">Failed to load tasks.</Box>;

  return (
    <>
      <Table className="mt-8 rounded-t-lg overflow-hidden shadow-lg">
        <TableHead sx={{ bgcolor: "#7978E9" }}>
          <TableRow>
            {[
              "ID",
              "Title",
              "Description",
              "Status",
              "Due Date",
              "Priority",
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

        <TableBody sx={{ bgcolor: "#f9f9f9" }}>
          {tasks?.map((task) => (
            <TableRow
              key={task.id}
              sx={{
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                  transition: "background-color 0.2s ease",
                },
              }}
            >
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                {editingId === task.id ? (
                  <Select
                    size="small"
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChangeClick(task.id, e.target.value)
                    }
                    sx={{ minWidth: 120 }}
                  >
                    {getAvailableStatuses(task.status).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                      label={
                        task.status.charAt(0).toUpperCase() +
                        task.status.slice(1)
                      }
                      color={getStatusColor(task.status)}
                      size="small"
                    />
                    {getAvailableStatuses(task.status).length > 0 && (
                      <IconButton
                        size="small"
                        onClick={() => setEditingId(task.id)}
                        sx={{
                          color: "#488ac7",
                          "&:hover": { bgcolor: "rgba(72, 138, 199, 0.1)" },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                )}
              </TableCell>
              <TableCell>{dayjs(task.dueDate).format("MM/DD/YYYY")}</TableCell>
              <TableCell>
                <Chip
                  label={
                    task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)
                  }
                  color={getPriorityColor(task.priority)}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Modal */}
      <Modal
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        aria-labelledby="status-confirmation-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Confirm Status Change
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Are you sure you want to change the status to{" "}
            <strong>{selectedStatus}</strong>? This action cannot be undone.
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            Once changed, you won't be able to revert the status!
          </Alert>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button
              onClick={() => setConfirmationOpen(false)}
              variant="outlined"
              color="inherit"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmStatusChange}
              variant="contained"
              color="primary"
              disabled={updateTaskStatus.isPending}
            >
              {updateTaskStatus.isPending ? "Updating..." : "Confirm Change"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default StaffTasksTable;
