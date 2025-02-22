import { useState } from "react";
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
  useDeleteClientCategory,
  useGetClientCategories,
} from "../../../api/clients/clients";
import { Category } from "../../../types/clients";

const CategoryTable = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const { data: categories, isLoading, isError } = useGetClientCategories();
  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteClientCategory();

  const handleOpen = (id: number) => {
    setSelectedCategoryId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    if (selectedCategoryId !== null) {
      deleteCategory(selectedCategoryId, {
        onSuccess: () => {
          toast.success("Successfully deleted category.");
          handleClose();
        },
        onError: (error: unknown) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to delete category."
          );
        },
      });
    }
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Error loading categories.</div>;

  return (
    <>
      <Table className="mt-8 rounded-t-lg overflow-hidden shadow-lg min-w-[50vw]">
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
              Category Name
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
          {categories?.map((category: Category) => (
            <TableRow key={category.id} className="hover:bg-gray-100">
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Link to={`/admin/edit-client-category/${category.id}`}>
                  <IconButton
                    sx={{
                      color: "#488ac7",
                      transition: "all ease-in-out 0.2s",
                    }}
                  >
                    <EditRounded />
                  </IconButton>
                </Link>
                <IconButton
                  onClick={() => handleOpen(category.id)}
                  sx={{ color: "#db0f27", transition: "all ease-in-out 0.2s" }}
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
            align="center"
          >
            Confirm Deletion
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Are you sure you want to delete this category? This action cannot be
            undone.
          </Typography>
          <Alert severity="error" sx={{ width: "100%", fontSize: "0.9rem" }}>
            Deleted categories can't be recovered!
          </Alert>
          <div className="flex gap-4 justify-center w-full">
            <button
              onClick={handleClose}
              className="py-2 px-6 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`py-2 px-6 rounded text-white ${isDeleting ? "bg-red-400 cursor-not-allowed" : "bg-[#db0f27] hover:bg-[#9A0B1B]"}`}
            >
              {isDeleting ? "Deleting..." : "Delete Category"}
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CategoryTable;
