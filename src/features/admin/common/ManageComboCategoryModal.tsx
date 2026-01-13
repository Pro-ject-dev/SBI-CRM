import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
    Typography,
    Divider,
} from "@mui/material";
import { AutocompleteInput } from "../../../components/UI/AutoCompleteInput";
import type { OptionProps } from "../../../types/selectBox";

interface ManageComboCategoryModalProps {
    open: boolean;
    onClose: () => void;
    comboOptions: OptionProps[];
    categoryOptions: OptionProps[];
    onDeleteCombo: (id: string) => Promise<void>;
    onDeleteCategory: (id: string) => Promise<void>;
}

const ManageComboCategoryModal: React.FC<ManageComboCategoryModalProps> = ({
    open,
    onClose,
    comboOptions,
    categoryOptions,
    onDeleteCombo,
    onDeleteCategory,
}) => {
    const [selectedCombo, setSelectedCombo] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteType, setDeleteType] = useState<"combo" | "category" | null>(null);

    const handleDeleteClick = (type: "combo" | "category") => {
        setDeleteType(type);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (deleteType === "combo" && selectedCombo) {
            await onDeleteCombo(selectedCombo);
            setSelectedCombo("");
        } else if (deleteType === "category" && selectedCategory) {
            await onDeleteCategory(selectedCategory);
            setSelectedCategory("");
        }
        setConfirmOpen(false);
        setDeleteType(null);
    };

    const handleClose = () => {
        setSelectedCombo("");
        setSelectedCategory("");
        onClose();
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Manage Combos & Categories</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Delete Combo</Typography>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <AutocompleteInput
                                    id="manage-combo"
                                    name="manage-combo"
                                    label="Select Combo"
                                    value={selectedCombo}
                                    options={comboOptions}
                                    onChange={(_key, value) => {
                                        setSelectedCombo(String(value));
                                    }}
                                    placeholder="Search for a Combo"
                                />
                            </Box>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDeleteClick("combo")}
                                disabled={!selectedCombo}
                                sx={{ height: 56, minWidth: 100 }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    <Box>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Delete Category</Typography>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <AutocompleteInput
                                    id="manage-category"
                                    name="manage-category"
                                    label="Select Category"
                                    value={selectedCategory}
                                    options={categoryOptions}
                                    onChange={(_key, value) => {
                                        setSelectedCategory(String(value));
                                    }}
                                    placeholder="Search for a Category"
                                />
                            </Box>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDeleteClick("category")}
                                disabled={!selectedCategory}
                                sx={{ height: 56, minWidth: 100 }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this {deleteType === "combo" ? "Combo" : "Category"}? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ManageComboCategoryModal;
