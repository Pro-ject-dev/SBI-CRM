// CustomProductsTable.tsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  styled,
  TextField,
  Typography,
  Box,
  Collapse,
  Button,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Plus as PlusIcon } from "lucide-react";
import { Straighten as SizeIcon } from "@mui/icons-material";
import type { CustomProductData } from "../estimation.types";
import SizeChartPopover from "./SizeChartPopover";

const StyledTable = styled(Table)({
  "& .MuiTableCell-root": { border: "1px solid rgba(224, 224, 224, 1)" },
});

// --- THIS IS THE FIX ---
// Changed from a hardcoded color to a theme-aware color from the palette.
// const StyledTableHead = styled(TableHead)(({ theme }) => ({
//   "& .MuiTableCell-head": {
//     backgroundColor: theme.palette.action.hover,
//     color: theme.palette.text.primary,
//     fontWeight: "bold",
//   },
// }));

const StyledTableHead = styled(TableHead)({
  '& .MuiTableCell-head': {
    backgroundColor: '#f5f5f5', // Provide a static color
    fontWeight: 'bold',
  },
});

interface CustomProductsTableProps {
  data: CustomProductData[];
  onDelete: (id: string) => void;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onSizeChange: (
    id: string,
    newSize: { length: string; width: string; thickness: string }
  ) => void;
  onAddAddOn: (customProductId: string) => void;
  onDeleteAddOn: (customProductId: string, addOnId: string) => void;
  onUpdateAddOnQuantity: (
    customProductId: string,
    addOnId: string,
    quantity: number
  ) => void;
}

const Row: React.FC<{
  row: CustomProductData;
  onDelete: (id: string) => void;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onSizeChange: (
    id: string,
    newSize: { length: string; width: string; thickness: string }
  ) => void;
  onAddAddOn: (customProductId: string) => void;
  onDeleteAddOn: (customProductId: string, addOnId: string) => void;
  onUpdateAddOnQuantity: (
    customProductId: string,
    addOnId: string,
    quantity: number
  ) => void;
}> = ({
  row,
  onDelete,
  onQuantityChange,
  onSizeChange,
  onAddAddOn,
  onDeleteAddOn,
  onUpdateAddOnQuantity,
}) => {
  const [open, setOpen] = useState(false);

  // State for editing the MAIN product
  const [editingQuantity, setEditingQuantity] = useState(false);
  const [quantityValue, setQuantityValue] = useState(row.quantity.toString());
  const [sizeChartAnchorEl, setSizeChartAnchorEl] =
    useState<null | HTMLElement>(null);

  // State for editing ADD-ONS
  const [editingAddOnId, setEditingAddOnId] = useState<string | null>(null);
  const [editAddOnQuantity, setEditAddOnQuantity] = useState("");

  useEffect(() => {
    setQuantityValue(row.quantity.toString());
  }, [row.quantity, row.length, row.width, row.thickness]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const hasAddOns = row.addOnsProducts && row.addOnsProducts.length > 0;

  // --- Main Product Edit Handlers ---
  const handleEditQuantityClick = () => {
    setEditingQuantity(true);
  };

  const handleSaveQuantity = () => {
    const numericQuantity = parseFloat(quantityValue);
    if (!isNaN(numericQuantity) && numericQuantity > 0) {
      onQuantityChange(row.id, numericQuantity);
    } else {
      setQuantityValue(row.quantity.toString());
    }
    setEditingQuantity(false);
  };

  const handleQuantityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuantityValue(e.target.value);
  };

  const handleQuantityKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveQuantity();
    } else if (e.key === "Escape") {
      setQuantityValue(row.quantity.toString());
      setEditingQuantity(false);
    }
  };

  const handleEditSizeClick = (event: React.MouseEvent<HTMLElement>) => {
    setSizeChartAnchorEl(event.currentTarget);
  };

  const handleSizeChartClose = () => {
    setSizeChartAnchorEl(null);
  };

  const handleSetSizeFromPopover = (sizeString: string) => {
    const parts = sizeString.split("x").map((part) => part.trim());
    if (
      parts.length === 3 &&
      parts.every((p) => !isNaN(parseFloat(p)) && parseFloat(p) > 0)
    ) {
      onSizeChange(row.id, {
        length: parts[0],
        width: parts[1],
        thickness: parts[2],
      });
    }
    handleSizeChartClose();
  };

  // --- Add-On Edit Handlers ---
  const handleAddOnEditClick = (addOnId: string, currentQuantity: number) => {
    setEditingAddOnId(addOnId);
    setEditAddOnQuantity(currentQuantity.toString());
  };

  const handleAddOnSave = (addOnId: string) => {
    const numericQuantity = parseFloat(editAddOnQuantity);
    if (!isNaN(numericQuantity) && numericQuantity > 0) {
      onUpdateAddOnQuantity(row.id, addOnId, numericQuantity);
    }
    setEditingAddOnId(null);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ width: "50px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            disabled={!hasAddOns}
          >
            {hasAddOns ? (
              open ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )
            ) : null}
          </IconButton>
        </TableCell>
        <TableCell>{row.productName}</TableCell>
        <TableCell>{row.productCombo}</TableCell>
        <TableCell>{row.productCategory}</TableCell>
        <TableCell>{row.remark}</TableCell>
        <TableCell sx={{ width: "120px" }}>
          {editingQuantity ? (
            <TextField
              size="small"
              value={quantityValue}
              onChange={handleQuantityInputChange}
              onKeyDown={handleQuantityKeyDown}
              onBlur={handleSaveQuantity}
              autoFocus
              type="number"
              inputProps={{ min: "0.01", step: "any" }}
              sx={{ width: "80px" }}
            />
          ) : (
            row.quantity
          )}
        </TableCell>
        <TableCell>{row.size}</TableCell>
        <TableCell>{formatCurrency(row.ratePerKg)}</TableCell>
        <TableCell>{formatCurrency(row.totalAmount)}</TableCell>
        <TableCell sx={{ width: "280px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {editingQuantity ? (
              <Tooltip title="Save Quantity">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleSaveQuantity}
                >
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Edit Quantity">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleEditQuantityClick}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Edit Size">
              <IconButton
                color="secondary"
                size="small"
                onClick={handleEditSizeClick}
              >
                <SizeIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Product">
              <IconButton
                color="error"
                size="small"
                onClick={() => onDelete(row.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Button
              size="small"
              variant="outlined"
              startIcon={<PlusIcon size={14} />}
              onClick={() => onAddAddOn(row.id)}
              sx={{ ml: 1, whiteSpace: "nowrap" }}
            >
              Add-On
            </Button>
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                padding: 2,
                backgroundColor: "rgba(0, 0, 0, 0.02)",
                borderRadius: 1,
              }}
            >
              <Typography variant="h6" gutterBottom component="div">
                Add-Ons for {row.productName}
              </Typography>
              <Table size="small" aria-label="add-ons">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Size (L*W)</TableCell>
                    <TableCell>Rate (per Kg)</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.addOnsProducts?.map((addOnRow) => (
                    <TableRow key={addOnRow.id}>
                      <TableCell>{addOnRow.productName}</TableCell>
                      <TableCell>
                        {editingAddOnId === addOnRow.id ? (
                          <TextField
                            size="small"
                            value={editAddOnQuantity}
                            onChange={(e) =>
                              setEditAddOnQuantity(e.target.value)
                            }
                            onBlur={() => handleAddOnSave(addOnRow.id)}
                            autoFocus
                            type="number"
                            inputProps={{ min: "1" }}
                            sx={{ width: "80px" }}
                          />
                        ) : (
                          addOnRow.quantity
                        )}
                      </TableCell>
                      <TableCell>{addOnRow.remark}</TableCell>
                      <TableCell>{`${addOnRow.length} * ${addOnRow.width}`}</TableCell>
                      <TableCell>
                        {formatCurrency(addOnRow.ratePerKg)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(addOnRow.totalAmount)}
                      </TableCell>
                      <TableCell align="center">
                        {editingAddOnId === addOnRow.id ? (
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleAddOnSave(addOnRow.id)}
                          >
                            <CheckIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() =>
                              handleAddOnEditClick(
                                addOnRow.id,
                                addOnRow.quantity
                              )
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => onDeleteAddOn(row.id, addOnRow.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <SizeChartPopover
        anchorEl={sizeChartAnchorEl}
        onClose={handleSizeChartClose}
        onSetSize={handleSetSizeFromPopover}
        initialLength={row.length}
        initialWidth={row.width}
        initialThickness={row.thickness}
      />
    </React.Fragment>
  );
};

const CustomProductsTable: React.FC<CustomProductsTableProps> = (props) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid rgba(224, 224, 224, 1)",
        borderRadius: "4px",
        mt: 2,
        mb: 2,
      }}
    >
      <StyledTable
        sx={{ minWidth: 650 }}
        aria-label="collapsible custom products table"
      >
        <StyledTableHead>
          <TableRow>
            <TableCell sx={{ width: "50px" }} />
            <TableCell>Product Name</TableCell>
            <TableCell>Combo</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Remarks</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Size (L*W*T)</TableCell>
            <TableCell>Rate/Kg</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {props.data.length === 0 ? (
            <TableRow>
                {/* Fixed the colSpan here from 9 to 10 */}
              <TableCell colSpan={10} align="center">
                No customized products have been added yet.
              </TableCell>
            </TableRow>
          ) : (
            props.data.map((row) => <Row key={row.id} row={row} {...props} />)
          )}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default CustomProductsTable;