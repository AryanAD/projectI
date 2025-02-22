import { useEffect, useState } from "react";

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
import {
  useDeleteProjectCategory,
  useGetProjectCategories,
} from "../../../api/projects/projects";
import { CustomCSS } from "../../custom/CustomCSS";
import { Category } from "../../../types/projects";

const CategoryTable = () => {
  const [category, setCategory] = useState<Category[] | undefined>(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const { data, isSuccess, error, isLoading } = useGetProjectCategories();
  const deleteProjectCategory = useDeleteProjectCategory();

  const handleOpen = (id: number) => {
    setSelectedCategoryId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    if (selectedCategoryId !== null) {
      try {
        await deleteProjectCategory.mutateAsync(selectedCategoryId);
        toast.success(
          `Successfully deleted category with id: ${selectedCategoryId}`
        );
        handleClose();
      } catch (error: unknown) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete category."
        );
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setCategory(data);
    } else if (error) {
      console.error(error);
    }
  }, [data, error, isSuccess]);

  return (
    <>
      <Table className="mt-8 rounded-t-lg overflow-hidden shadow-lg min-w-[50vw]">
        <TableHead className="bg-[#7978E9]">
          <TableRow>
            <TableCell sx={CustomCSS.tableCell}>ID</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Category Name</TableCell>
            <TableCell sx={CustomCSS.tableCell}>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody className="bg-[#f9f9f9]">
          {isLoading && (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
          {category?.map((data) => (
            <TableRow
              className="transition-transform duration-300 ease-in-out cursor-pointer hover:bg-gray-100"
              key={data.id}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>

              <TableCell>
                <Link to={`/admin/edit-project-category/${data.id}`}>
                  <IconButton sx={CustomCSS.editIconButton}>
                    <EditRounded />
                  </IconButton>
                </Link>

                <IconButton
                  onClick={() => handleOpen(data.id!)}
                  sx={CustomCSS.deleteIconButton}
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
        sx={{ transition: "opacity 0.3s ease-in-out" }}
        onClose={handleClose}
      >
        <Box sx={CustomCSS.deleteModal}>
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
            Are you sure you want to delete this Category? This action cannot be
            undone.
          </Typography>

          <Alert severity="error" sx={CustomCSS.alertStyle}>
            Deleted categories can't be recovered!
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
              disabled={deleteProjectCategory.isPending}
              className={`py-2 px-6 font-semibold rounded text-white transition-all duration-200 ease-in-out ${
                deleteProjectCategory.isPending
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-[#db0f27] hover:bg-[#9A0B1B]"
              }`}
            >
              <DeleteRounded />
              {deleteProjectCategory.isPending
                ? "Deleting..."
                : "Delete Category"}
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CategoryTable;
