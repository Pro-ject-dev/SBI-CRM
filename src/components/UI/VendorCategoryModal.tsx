import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from "@mui/material";
import { Close, Add, Delete, Category as CategoryIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetVendorCategoriesQuery,
  useAddVendorCategoryMutation,
  useDeleteVendorCategoryMutation,
} from "../../app/api/vendorsApi";
import type { VendorCategory } from "../../types/warehouse";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 550,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "hidden",
};

interface VendorCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onCategoryAdded?: (categoryName: string) => void;
}

const VendorCategoryModal: React.FC<VendorCategoryModalProps> = ({
  open,
  onClose,
  onCategoryAdded,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<VendorCategory | null>(null);

  const { data, isLoading } = useGetVendorCategoriesQuery();
  const [addVendorCategory, { isLoading: isAdding }] = useAddVendorCategoryMutation();
  const [deleteVendorCategory, { isLoading: isDeleting }] = useDeleteVendorCategoryMutation();

  const categories: VendorCategory[] = data?.data || [];

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      dispatch(
        addToast({ message: "Category name cannot be empty", type: "error" })
      );
      return;
    }

    try {
      const result = await addVendorCategory({ name: newCategoryName.trim() }).unwrap();
      dispatch(
        addToast({
          message: result?.message || "Vendor Category added successfully",
          type: "success",
        })
      );
      if (onCategoryAdded) {
        onCategoryAdded(newCategoryName.trim());
      }
      setNewCategoryName("");
    } catch (error: any) {
      dispatch(
        addToast({
          message: error?.data?.message || "Failed to add vendor category",
          type: "error",
        })
      );
    }
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const result = await deleteVendorCategory({ id: categoryToDelete.id }).unwrap();
      dispatch(
        addToast({
          message: result?.message || "Vendor Category deleted successfully",
          type: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        addToast({
          message: error?.data?.message || "Failed to delete vendor category",
          type: "error",
        })
      );
    } finally {
      setCategoryToDelete(null);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          {/* Header */}
          <Box
            sx={{
              background: (theme) => theme.palette.primary.main,
              color: "primary.contrastText",
              p: 2.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CategoryIcon sx={{ fontSize: 26 }} />
              <Typography variant="h6" fontWeight="600">
                Manage Vendor Categories
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{
                color: "inherit",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Body Content */}
          <Box sx={{ p: 3, maxHeight: "calc(90vh - 140px)", overflowY: "auto" }}>
            {/* Add Category Section */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                mb: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.default",
              }}
            >
              <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1.5 }}>
                Add New Category
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter vendor category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      bgcolor: "background.paper",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={isAdding ? <CircularProgress size={18} color="inherit" /> : <Add />}
                  onClick={handleAddCategory}
                  disabled={isAdding || !newCategoryName.trim()}
                  sx={{
                    borderRadius: 1.5,
                    px: 3,
                    whiteSpace: "nowrap",
                    textTransform: "none",
                    fontWeight: "600",
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Paper>

            {/* Category List Section */}
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                sx={{ mb: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span>Vendor Category List</span>
                <Typography variant="caption" color="text.secondary">
                  Total: {categories.length}
                </Typography>
              </Typography>

              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                  <CircularProgress size={32} />
                </Box>
              ) : categories.length === 0 ? (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    border: "1px dashed",
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No vendor categories found. Add your first category above!
                  </Typography>
                </Paper>
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <List disablePadding>
                    {categories.map((cat, index) => (
                      <React.Fragment key={cat.id}>
                        {index > 0 && <Divider />}
                        <ListItem
                          sx={{
                            py: 1.2,
                            px: 2,
                            "&:hover": {
                              bgcolor: "action.hover",
                            },
                          }}
                        >
                          <CategoryIcon sx={{ color: "text.secondary", mr: 1.5, fontSize: 20 }} />
                          <ListItemText
                            primary={cat.name}
                            primaryTypographyProps={{
                              variant: "body2",
                              fontWeight: 500,
                            }}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete category"
                              color="error"
                              size="small"
                              onClick={() => setCategoryToDelete(cat)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              p: 2,
              px: 3,
              borderTop: 1,
              borderColor: "divider",
              bgcolor: "background.default",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={onClose}
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 1.5,
                px: 3,
                textTransform: "none",
                fontWeight: "600",
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(categoryToDelete)}
        onClose={() => setCategoryToDelete(null)}
      >
        <DialogTitle>Delete Vendor Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete category <strong>"{categoryToDelete?.name}"</strong>? Vendors assigned to this category will not be deleted, but this category option will be removed from the dropdown list.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setCategoryToDelete(null)}
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            size="small"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={16} color="inherit" /> : <Delete />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VendorCategoryModal;
