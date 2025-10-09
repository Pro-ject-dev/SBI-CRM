import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  Chip,
  TextField,
  TablePagination,
  InputAdornment,
} from '@mui/material';
import { Visibility as ViewIcon, Search as SearchIcon } from '@mui/icons-material';
import type { OrderData } from '../../../app/slices/ordersSlice'; // Import type from slice
 // Import type from slice

interface OrdersTableProps {
  orders: OrderData[];
  onView: (id: number) => void;
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  page: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const formatDateString = (dateStr: string | null): string => {
  if (!dateStr) { return 'N/A'; }
  // Assuming dateStr is in 'DD-MM-YYYY' or 'YYYY-MM-DD' format.
  // The API response seems to give 'YYYY-MM-DD' for date, deadlineStart, deadlineEnd.
  // Let's ensure it's parsed correctly to avoid issues.
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
      // If direct parsing fails, try to reformat if it's 'DD-MM-YYYY'
      const parts = dateStr.split('-');
      if (parts.length === 3 && parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
          const reorderedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
          if (!isNaN(reorderedDate.getTime())) {
              return reorderedDate.toLocaleDateString('en-GB');
          }
      }
      return 'Invalid Date';
  }
  return date.toLocaleDateString('en-GB');
};

const getStatusProps = (status: string): { label: string; color: "success" | "primary" | "warning" | "error" | "info" | "default" } => {
  switch (status) {
    case '0': return { label: 'New', color: 'primary' };
    case '1': return { label: 'Pending', color: 'default' };
    case '2': return { label: 'Available', color: 'info' };
    case '3': return { label: 'Ongoing', color: 'warning' };
    case '-1': return { label: 'Delayed', color: 'error' };
    case '4': return { label: 'Delivered', color: 'success' };
    default: return { label: 'Unknown', color: 'default' };
  }
};

const formatCurrency = (amount: string | number) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '₹ 0.00';
  return num.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
};

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  onView,
  searchQuery,
  onSearchChange,
  page,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search by Order ID or Customer Name..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer>
        <Table stickyHeader aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Total Products</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Payable</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => {
                const status = getStatusProps(order.orderStatus);
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={order.id} >
                        <TableCell component="th" scope="row">
                          <Typography variant="body2" fontWeight="bold">{order.orderID}</Typography> {/* Changed to order.orderID */}
                        </TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{formatDateString(order.date)}</TableCell>
                        <TableCell align="center">{order.totalProducts}</TableCell>
                        <TableCell>
                          <Chip label={status.label} color={status.color} size="small" />
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                                {formatCurrency(order.grandTotal)}
                            </Typography>
                        </TableCell>
                        <TableCell>{formatDateString(order.startDate)}</TableCell>
                        <TableCell>{formatDateString(order.endDate)}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => onView(order.id)} color="default" size="small" aria-label="view order">
                              <ViewIcon />
                          </IconButton>
                        </TableCell>
                    </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography color="text.secondary" p={4}>No orders found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>


      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

export default OrdersTable;