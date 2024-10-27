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
import {
  useDeleteProjectMutation,
  useGetProjectQuery,
} from "../../redux/features/projects/projectApiSlice";

const ProjectsTable = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const { data: projects, isSuccess, error, isLoading } = useGetProjectQuery();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const handleOpen = (id: number) => {
    setSelectedProjectId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    if (selectedProjectId !== null) {
      try {
        await deleteProject(selectedProjectId).unwrap();
        if (isSuccess) {
          toast.success(
            `Successfully deleted project with id: ${selectedProjectId}`
          );
        } else {
          toast.error(`Error: ${error}`);
        }
        handleClose();
      } catch (err: unknown) {
        toast.error(err.message || "Failed to delete project.");
      }
    }
  };

  if (isLoading) return <div>Loading Projects...</div>;

  return (
    <>
      <Table className="mt-8">
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

        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>
                <Link
                  to={`/projects/${project.id}`}
                  className="hover:underline"
                >
                  {project.name}
                </Link>
              </TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.ProjectCategory.name}</TableCell>
              <TableCell>
                {project.Users.length === 0
                  ? project.Users[0].username
                  : project.Users[0].username + project.Users.length - 1}
              </TableCell>
              <TableCell>
                {project.deadline
                  ? dayjs(project.deadline).format("MM/DD/YYYY")
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Link to={`/edit-project/${project.id}`}>
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
            disabled={isDeleting}
            className={`${CustomCSS.deleteButton} inline-flex gap-1`}
          >
            <DeleteRounded />
            {isDeleting ? "Deleting..." : "Delete Projects"}
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectsTable;
