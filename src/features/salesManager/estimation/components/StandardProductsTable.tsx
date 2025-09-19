// StandardProductsTable.tsx
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField,
  styled, Box, Collapse, Typography, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Plus as PlusIcon } from 'lucide-react';
import type { StandardFormData } from '../estimation.types';

// Styled Components
const StyledTable = styled(Table)({'& .MuiTableCell-root': {border: '1px solid rgba(224, 224, 224, 1)',},});

// --- THIS IS THE FIX ---
// We now use the theme object to get a background color that adapts to the mode.
// const StyledTableHead = styled(TableHead)(({ theme }) => ({
//   '& .MuiTableCell-head': {
//     backgroundColor: theme.palette.action.hover, // Use a theme-aware color
//     color: theme.palette.text.primary, // Ensure text color also adapts
//     fontWeight: 'bold',
//   },
// }));

// AFTER (Use the sx prop for simple styling instead)
const StyledTableHead = styled(TableHead)({
  '& .MuiTableCell-head': {
    backgroundColor: '#f5f5f5', // Provide a static color
    fontWeight: 'bold',
  },
});


// Props for the entire table component
interface StandardProductTableProps {
  data: StandardFormData[];
  onDelete: (id: string) => void;
  onQuantityChange: (id: string, quantity: string) => void;
  onAddAddOn: (standardProductId: string) => void;
  onDeleteAddOn: (standardProductId: string, addOnId: string) => void;
  onUpdateAddOnQuantity: (standardProductId: string, addOnId: string, quantity: number) => void;
}

// A new Row component to manage the state of each standard product and its collapsible add-ons
const Row: React.FC<{
    row: StandardFormData;
    onDelete: (id: string) => void;
    onQuantityChange: (id: string, quantity: string) => void;
    onAddAddOn: (standardProductId: string) => void;
    onDeleteAddOn: (standardProductId: string, addOnId:string) => void;
    onUpdateAddOnQuantity: (standardProductId: string, addOnId: string, quantity: number) => void;
}> = ({ row, onDelete, onQuantityChange, onAddAddOn, onDeleteAddOn, onUpdateAddOnQuantity }) => {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editQuantity, setEditQuantity] = useState('');
    const [editingAddOnId, setEditingAddOnId] = useState<string | null>(null);
    const [editAddOnQuantity, setEditAddOnQuantity] = useState('');

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

    // Handlers for Standard Product Quantity
    const handleEditClick = (id: string, currentQuantity: string) => {
        setEditingId(id);
        setEditQuantity(currentQuantity);
    };
    const handleSave = (id: string) => {
        onQuantityChange(id, editQuantity);
        setEditingId(null);
    };

    // Handlers for Add-On Product Quantity
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

    const hasAddOns = row.addOnsProducts && row.addOnsProducts.length > 0;

    return (
        <React.Fragment>
            {/* Main Row for the Standard Product */}
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} disabled={!hasAddOns}>
                        {hasAddOns ? (open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />) : null}
                    </IconButton>
                </TableCell>
                <TableCell>{row.productCombo}</TableCell>
                <TableCell>{row.productCategory}</TableCell>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{row.remark}</TableCell>
                <TableCell>{formatCurrency(row.ratePerQuantity)}</TableCell>
                <TableCell>
                    {editingId === row.id ? (
                        <TextField size="small" value={editQuantity} onChange={(e) => setEditQuantity(e.target.value)} onBlur={() => handleSave(row.id)} autoFocus type="number" inputProps={{ min: "1" }} sx={{width: '80px'}}/>
                    ) : ( row.quantity )}
                </TableCell>
                <TableCell>{formatCurrency(row.totalAmount)}</TableCell>
                <TableCell>
                    {editingId === row.id ? (
                        <IconButton color="primary" onClick={() => handleSave(row.id)}><CheckIcon /></IconButton>
                    ) : (
                        <IconButton color="primary" onClick={() => handleEditClick(row.id, row.quantity)}><EditIcon /></IconButton>
                    )}
                    <IconButton color="error" onClick={() => onDelete(row.id)}><DeleteIcon /></IconButton>
                    <Button size="small" variant="outlined" startIcon={<PlusIcon size={14}/>} onClick={() => onAddAddOn(row.id)} sx={{ml:1, whiteSpace: 'nowrap'}}>
                        Add-On
                    </Button>
                </TableCell>
            </TableRow>
            
            {/* Collapsible Row for Add-Ons */}
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, padding: 2, backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Add-Ons for {row.productName}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Remarks</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Size (L*W*T)</TableCell>
                                        <TableCell>Rate (per Kg)</TableCell>
                                        <TableCell>Total Amount</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.addOnsProducts?.map((addOnRow) => (
                                        <TableRow key={addOnRow.id}>
                                            <TableCell>{addOnRow.productName}</TableCell>
                                            <TableCell>{addOnRow.remark}</TableCell>
                                            <TableCell>
                                                {editingAddOnId === addOnRow.id ? (
                                                    <TextField size="small" value={editAddOnQuantity} onChange={(e) => setEditAddOnQuantity(e.target.value)} onBlur={() => handleAddOnSave(addOnRow.id)} autoFocus type="number" inputProps={{ min: "1" }} sx={{width: '80px'}}/>
                                                ) : ( addOnRow.quantity )}
                                            </TableCell>
                                            <TableCell>{addOnRow.size}</TableCell>
                                            <TableCell>{addOnRow.ratePerKg.toFixed(2)}</TableCell>
                                            <TableCell>{addOnRow.totalAmount.toFixed(2)}</TableCell>
                                            <TableCell align="center">
                                                {editingAddOnId === addOnRow.id ? (
                                                     <IconButton color="primary" size="small" onClick={() => handleAddOnSave(addOnRow.id)}><CheckIcon /></IconButton>
                                                ) : (
                                                    <IconButton color="primary" size="small" onClick={() => handleAddOnEditClick(addOnRow.id, addOnRow.quantity)}><EditIcon fontSize='small' /></IconButton>
                                                )}
                                                <IconButton color="error" size="small" onClick={() => onDeleteAddOn(row.id, addOnRow.id)}><DeleteIcon fontSize='small' /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};


const StandardProductsTable: React.FC<StandardProductTableProps> = (props) => {
    return (
        <TableContainer component={Paper} sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px', mt: 2, mb: 2 }}>
            <StyledTable sx={{ minWidth: 650 }} aria-label="collapsible standard products table">
                <StyledTableHead>
                    <TableRow>
                        <TableCell sx={{width: '50px'}} />
                        <TableCell>Product Combo</TableCell>
                        <TableCell>Product Category</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Remarks</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total Amount</TableCell>
                        <TableCell sx={{ width: '220px' }}>Actions</TableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {props.data.length === 0 ? (
                        <TableRow><TableCell colSpan={9} align="center">No standard products have been added yet.</TableCell></TableRow>
                    ) : (
                        props.data.map((row) => (
                            <Row key={row.id} row={row} {...props} />
                        ))
                    )}
                </TableBody>
            </StyledTable>
        </TableContainer>
    );
};

export default StandardProductsTable;