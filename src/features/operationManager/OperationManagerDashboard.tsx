import {
  Package,
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  Info,
} from "lucide-react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dashboard from "../dashboard/Dashboard";
import { useGetAllOrdersQuery } from "../../app/api/orderManagementApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { OrderManagementDataDto } from "../../types/orderManagement";

const ORDER_STATUS_MAP: { [key: string]: string } = {
  "0": "New",
  "1": "Waiting for Raw Material",
  "2": "Material Issued & Work Ongoing",
  "3": "Completed",
  "4": "Delayed",
};

const ORDER_STATUS_COLORS: { [key: string]: string } = {
  New: "#2196f3",
  "Waiting for Raw Material": "#ff9800",
  "Material Issued & Work Ongoing": "#9c27b0",
  Completed: "#4caf50",
  Delayed: "#f44336",
};

const CHIP_COLORS: { [key: string]: any } = {
  New: "info",
  "Waiting for Raw Material": "warning",
  "Material Issued & Work Ongoing": "secondary",
  Completed: "success",
  Delayed: "error",
};

const OperationManagerDashboard = () => {
  const { data: ordersData } = useGetAllOrdersQuery({});

  const orders: OrderManagementDataDto[] = (ordersData as any) || [];

  const totalOrders = orders.length;
  const newOrders = orders.filter((o) => o.orderStatus === "0").length;
  const delayedOrders = orders.filter((o) => o.orderStatus === "4").length;
  const completedOrders = orders.filter((o) => o.orderStatus === "3").length;
  const ongoingOrders = orders.filter((o) => o.orderStatus === "2").length;
  const waitingMaterialOrders = orders.filter((o) => o.orderStatus === "1").length;

  const orderStatusData = Object.keys(ORDER_STATUS_MAP).map((statusKey) => ({
    name: ORDER_STATUS_MAP[statusKey],
    value: orders.filter((o) => o.orderStatus === statusKey).length,
  }));

  const delayedOrdersData = orders.filter((o) => o.orderStatus === "4");
  const recentOrders = orders.slice(0, 10);

  const statsCards = [
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      color: "#2196f3",
      bgColor: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
      icon: Package,
    },
    {
      title: "New Orders",
      value: newOrders.toString(),
      color: "#4caf50",
      bgColor: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
      icon: ShoppingCart,
    },
    {
      title: "Delayed Orders",
      value: delayedOrders.toString(),
      color: "#f44336",
      bgColor: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
      icon: AlertTriangle,
    },
    {
      title: "Completed Orders",
      value: completedOrders.toString(),
      color: "#9c27b0",
      bgColor: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",
      icon: TrendingUp,
    },
  ];

  const delayedOrderColumns: GridColDef[] = [
    { 
      field: "id", 
      headerName: "Order ID", 
      width: 100,
      // renderCell: (params: any) => (
      //   <Typography variant="body2" fontWeight="medium">
      //     #{params.value}
      //   </Typography>
      // ),
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 200,
      flex: 1,
      minWidth: 150,
      valueGetter: (value: any, row: any) => row.leads?.name || "N/A",
      // renderCell: (params: any) => (
      //   <Typography variant="body2" fontWeight="medium">
      //     {params.value}
      //   </Typography>
      // ),
    },
    { 
      field: "date", 
      headerName: "Order Date", 
      width: 150,
       valueGetter: (value: any, row: any) => row.date || "N/A",
     
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params: any) => (
        <Chip
          label="Delayed"
          color="error"
          size="small"
          variant="filled"
          icon={<AlertTriangle size={16} />}
        />
      ),
    },
  ];

  const recentOrderColumns: GridColDef[] = [
    { 
      field: "id", 
      headerName: "Order ID", 
      width: 100,
      // renderCell: (params: any) => (
      //   <Typography variant="body2" fontWeight="medium">
      //     #{params.value}
      //   </Typography>
      // ),
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 180,
      flex: 1,
      minWidth: 120,
      valueGetter: (value: any, row: any) => row.leads?.name || "N/A",
      // renderCell: (params: any) => (
      //   <Typography variant="body2" fontWeight="medium">
      //     {params.value}
      //   </Typography>
      // ),
    },
    { 
      field: "date", 
      headerName: "Order Date", 
      width: 120,
      // renderCell: (params: any) => (
      //   <Typography variant="body2">
      //     {new Date(params.value).toLocaleDateString()}
      //   </Typography>
      // ),
    },
    {
      field: "orderStatus",
      headerName: "Status",
      width: 200,
      renderCell: (params: any) => {
        const statusText = ORDER_STATUS_MAP[params.value] || "Unknown";
        const chipColor = CHIP_COLORS[statusText] || "default";
        
        const getStatusIcon = (status: string) => {
          switch (status) {
            case "New": return <ShoppingCart size={16} />;
            case "Waiting for Raw Material": return <Clock size={16} />;
            case "Material Issued & Work Ongoing": return <Package size={16} />;
            case "Completed": return <CheckCircle size={16} />;
            case "Delayed": return <AlertTriangle size={16} />;
            default: return <Info size={16} />;
          }
        };

        return (
          <Chip
            label={statusText}
            color={chipColor}
            size="small"
            variant="filled"
            icon={getStatusIcon(statusText)}
          />
        );
      },
    },
  ];

  return (
    <Dashboard title="Operation Manager">
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Welcome to Operation Management. Monitor your orders and production status efficiently.
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

      {/* Charts and Tables Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Order Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orderStatusData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }} 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
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
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ORDER_STATUS_COLORS[entry.name]} />
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
                Order Status Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ORDER_STATUS_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AlertTriangle size={20} color="#f44336" style={{ marginRight: 8 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Delayed Orders ({delayedOrders})
                </Typography>
              </Box>
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={delayedOrdersData}
                  columns={delayedOrderColumns}
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Package size={20} color="#2196f3" style={{ marginRight: 8 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Orders
                </Typography>
              </Box>
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={recentOrders}
                  columns={recentOrderColumns}
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

      {/* Additional Stats Cards Row */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Clock size={48} color="#ff9800" style={{ marginBottom: 16 }} />
              <Typography variant="h4" component="div" fontWeight="bold" color="#ff9800">
                {waitingMaterialOrders}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Waiting for Raw Material
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Package size={48} color="#9c27b0" style={{ marginBottom: 16 }} />
              <Typography variant="h4" component="div" fontWeight="bold" color="#9c27b0">
                {ongoingOrders}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Work in Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default OperationManagerDashboard;
