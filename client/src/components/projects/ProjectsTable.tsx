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
import dayjs from "dayjs";
import { useGetProjects, useDeleteProject } from "../../api/projects/projects";

const ProjectsTable = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const { data: projects, isLoading } = useGetProjects();
  const deleteProject = useDeleteProject();

  const handleOpen = (id: number) => {
    setSelectedProjectId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    if (selectedProjectId !== null) {
      try {
        await deleteProject.mutateAsync(selectedProjectId);
        toast.success(
          `Successfully deleted project with id: ${selectedProjectId}`
        );
        handleClose();
      } catch (err: unknown) {
        toast.error((err as Error).message || "Failed to delete project.");
      }
    }
  };

  // Function to display assigned users
  const renderAssignedUsers = (users: { id: number; username: string }[]) => {
    if (users.length === 0) {
      return "Unassigned";
    } else if (users.length === 1) {
      return users[0].username;
    } else {
      return `${users[0].username} + ${users.length - 1}`;
    }
  };

  if (isLoading) return <div>Loading Projects...</div>;

  return (
    <>
      <Table className="mt-8 rounded-t-lg overflow-hidden shadow-lg">
        <TableHead className="bg-[#7978E9]">
          <TableRow>
            <TableCell sx={{ ...CustomCSS.tableCell, borderRadius: "6px 0 0" }}>
              ID
            </TableCell>
            <TableCell sx={CustomCSS.tableCell}>Project Name</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Status</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Category</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Assigned To</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Deadline</TableCell>
            <TableCell
              sx={{ ...CustomCSS.tableCell, borderRadius: "0 6px 0 0" }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody className="bg-[#f9f9f9]">
          {projects?.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>
                <Link to={`/admin/projects/${project.id}`}>{project.name}</Link>
              </TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.ProjectCategory.name}</TableCell>
              <TableCell>
                <span className="rounded-full border border-sky-100 text-sky-700 shadow-sm bg-sky-100 px-2 py-1">
                  {renderAssignedUsers(project.Users)} {/* Fixed logic */}
                </span>
              </TableCell>
              <TableCell>
                {project.deadline
                  ? dayjs(project.deadline).format("MM/DD/YYYY")
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Link to={`/admin/edit-projects/${project.id}`}>
                  <IconButton
                    sx={{ ...CustomCSS.editIconButton, marginRight: 1 }}
                  >
                    <EditRounded />
                  </IconButton>
                </Link>

                <IconButton
                  onClick={() => handleOpen(project.id)}
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
            Are you sure you want to delete this project?
          </Typography>

          <Alert sx={{ mb: 2 }} severity="error">
            Deleted projects can't be recovered!
          </Alert>

          <button
            onClick={handleDelete}
            disabled={deleteProject.isPending}
            className={`${CustomCSS.deleteButton} inline-flex gap-1`}
          >
            <DeleteRounded />
            {deleteProject.isPending ? "Deleting..." : "Delete Project"}
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectsTable;
