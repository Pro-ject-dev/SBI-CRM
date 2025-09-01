import {
  Package,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  List,
} from "lucide-react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dashboard from "../dashboard/Dashboard";
import { useGetLowStockAlertsQuery } from "../../app/api/rawMaterialsApi";
import { useGetPurchaseOrdersQuery } from "../../app/api/purchaseOrdersApi";
import { useGetRawMaterialsQuery } from "../../app/api/rawMaterialsApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const WarehouseDashboard = () => {
  const { data: alertsData } = useGetLowStockAlertsQuery();
  const { data: ordersData } = useGetPurchaseOrdersQuery({});
  const { data: materialsData } = useGetRawMaterialsQuery();

  const STATUS_COLORS = {
    Approved: '#4caf50',
    Pending: '#ff9800',
    Rejected: '#f44336',
    Completed: '#2196f3',
  };

  const alerts = alertsData?.data || [];
  const orders = ordersData || [];
  const materials = materialsData?.data || [];

  const totalMaterials = materials.length;
  const lowStockCount = alerts.length;
  const pendingOrdersCount = orders.filter(
    (order: any) => order.orderStatus === "Pending"
  ).length;
  const totalStockValue = materials.reduce(
    (sum: number, material: any) =>
      sum + material.currentStock * material.unitPrice,
    0
  );

  const purchaseOrderStatusData = orders.reduce((acc: any, order: any) => {
    const status = order.orderStatus;
    const existingStatus = acc.find((item: any) => item.name === status);
    if (existingStatus) {
      existingStatus.value += 1;
    } else {
      acc.push({ name: status, value: 1 });
    }
    return acc;
  }, []);

  const top5LowStock = alerts
    .slice()
    .sort((a: any, b: any) => a.currentStock - b.currentStock)
    .slice(0, 5);

  const statsCards = [
    {
      title: "Total Materials",
      value: totalMaterials.toString(),
      color: "#2196f3",
      bgColor: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
      icon: Package,
    },
    {
      title: "Low Stock Alerts",
      value: lowStockCount.toString(),
      color: lowStockCount > 0 ? "#f44336" : "#4caf50",
      bgColor: lowStockCount > 0 
        ? "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)"
        : "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
      icon: AlertTriangle,
    },
    {
      title: "Pending Orders",
      value: pendingOrdersCount.toString(),
      color: "#ff9800",
      bgColor: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)",
      icon: ShoppingCart,
    },
    {
      title: "Stock Value",
      value: `₹${totalStockValue.toLocaleString()}`,
      color: "#9c27b0",
      bgColor: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
      icon: TrendingUp,
    },
  ];

  const alertColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Material",
      width: 200,
      flex: 1,
      minWidth: 150,
    },
    {
      field: "currentStock",
      headerName: "Current Stock",
      width: 150,
      renderCell: (params: any) => (
        <Typography variant="body2">
          {params.row.currentStock} / {params.row.unit}
        </Typography>
      ),
    },
    {
      field: "alertType",
      headerName: "Alert Type",
      width: 150,
      renderCell: (params: any) => (
        <Chip
          label={
            params.row.alertType === "out_of_stock"
              ? "Out of Stock"
              : "Low Stock"
          }
          color={
            params.row.alertType === "out_of_stock" ? "error" : "warning"
          }
          size="small"
          variant="outlined"
        />
      ),
    },
  ];

  const orderColumns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 90 },
    {
      field: "VendorName",
      headerName: "Supplier",
      width: 180,
      flex: 1,
      minWidth: 120,
      valueGetter: (value: any, row: any) => row.vendor || "N/A",
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 120,
      renderCell: (params: any) => (
        <Typography variant="body2">
          {new Date(params.row.requestedDate).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: "totalAmount",
      headerName: "Amount",
      width: 120,
      renderCell: (params: any) => (
        <Typography variant="body2" fontWeight="medium">
          ₹{params.row.totalAmount?.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "orderStatus",
      headerName: "Status",
      width: 120,
      renderCell: (params: any) => {
        const status = params.row.orderStatus;
        const colorMap: any = {
          Approved: "success",
          Pending: "warning", 
          Rejected: "error",
          Completed: "info",
        };
        return (
          <Chip
            label={status}
            color={colorMap[status] || "default"}
            size="small"
            variant="filled"
          />
        );
      },
    },
  ];

  return (
    <Dashboard title="Warehouse Manager">
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Welcome to Warehouse Management. Monitor your inventory and orders efficiently.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              elevation={4}
              sx={{
                background: stat.bgColor,
                color: 'white',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ opacity: 0.9, mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      backgroundColor: 'rgba(255,255,255,0.2)', 
                      p: 2, 
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <stat.icon size={28} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Purchase Order Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={purchaseOrderStatusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value" barSize={50} radius={[4, 4, 0, 0]}>
                    {purchaseOrderStatusData.map((entry: any, index: number) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || '#8884d8'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Top 5 Low Stock Items
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={top5LowStock} 
                  layout="vertical" 
                  margin={{ top: 20, right: 40, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={120} 
                    tick={{ fontSize: 11 }} 
                  />
                  <Tooltip 
                    formatter={(value: any, name: any, props: any) => 
                      [`${value} ${props.payload.unit || 'units'}`, "Current Stock"]
                    }
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="currentStock" fill="#ff4444" barSize={30} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Data Tables Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} xl={6}>
          <Card elevation={3}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Low Stock Alerts
              </Typography>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={alerts}
                  columns={alertColumns}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                  sx={{
                    '& .MuiDataGrid-root': {
                      border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                      borderBottom: '1px solid #f0f0f0',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#f8f9fa',
                      borderBottom: '2px solid #e0e0e0',
                      fontWeight: 600,
                    },
                    '& .MuiDataGrid-virtualScroller': {
                      backgroundColor: '#fff',
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} xl={6}>
          <Card elevation={3}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Recent Purchase Orders
              </Typography>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={orders.slice(0, 10)}
                  columns={orderColumns}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                  getRowId={(row) => row.id}
                  sx={{
                    '& .MuiDataGrid-root': {
                      border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                      borderBottom: '1px solid #f0f0f0',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#f8f9fa',
                      borderBottom: '2px solid #e0e0e0',
                      fontWeight: 600,
                    },
                    '& .MuiDataGrid-virtualScroller': {
                      backgroundColor: '#fff',
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default WarehouseDashboard;
