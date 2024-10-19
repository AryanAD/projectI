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
  useDeleteClientCategoryMutation,
  useGetClientCategoriesQuery,
} from "../../../redux/features/clients/clientApiSlice";
import { CustomCSS } from "../../custom/CustomCSS";

interface Categories {
  id?: number;
  name?: string;
}

const CategoryTable = () => {
  const [category, setCategory] = useState<Categories[] | undefined>(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const { data, isSuccess, error, isLoading } = useGetClientCategoriesQuery();
  console.log(data);

  const [deleteClientCategory, { isLoading: isDeleting }] =
    useDeleteClientCategoryMutation();

  const handleOpen = (id: number) => {
    setSelectedCategoryId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    if (selectedCategoryId !== null) {
      try {
        await deleteClientCategory(selectedCategoryId).unwrap();
        toast.success(
          `Successfully deleted category with id: ${selectedCategoryId}`
        );
        handleClose();
      } catch (error: unknown) {
        toast.error(error.message);
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
      <Table className="mt-8">
        <TableHead className="bg-[#7978E9]">
          <TableRow>
            <TableCell sx={{ ...CustomCSS.tableCell, borderRadius: "6px 0 0" }}>
              ID
            </TableCell>
            <TableCell sx={CustomCSS.tableCell}>Category Name</TableCell>
            <TableCell
              sx={{ ...CustomCSS.tableCell, borderRadius: "0 6px 0 0" }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading && <TableRow>Loading...</TableRow>}
          {category?.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>

              <TableCell>
                <Link to={`/edit-client-category/${data.id}`}>
                  <IconButton
                    sx={{ ...CustomCSS.editIconButton, marginRight: 1 }}
                  >
                    <EditRounded />
                  </IconButton>
                </Link>

                <IconButton
                  onClick={() => handleOpen(data.id)}
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
            Are you sure to delete this category?
          </Typography>

          <Alert sx={{ mb: 2 }} severity="error">
            Deleted categories can't be recovered!
          </Alert>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`${CustomCSS.deleteButton} inline-flex gap-1`}
          >
            <DeleteRounded />
            {isDeleting ? "Deleting..." : "Delete Category"}
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default CategoryTable;
