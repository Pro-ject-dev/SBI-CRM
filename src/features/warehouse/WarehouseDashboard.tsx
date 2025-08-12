import { Package, ShoppingCart, AlertTriangle, TrendingUp, List } from "lucide-react";
import Box from "@mui/material/Box";
import Dashboard from "../dashboard/Dashboard";
import { useGetLowStockAlertsQuery } from "../../app/api/rawMaterialsApi";
import { useGetPurchaseOrdersQuery } from "../../app/api/purchaseOrdersApi";
import { useGetRawMaterialsQuery } from "../../app/api/rawMaterialsApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";


const WarehouseDashboard = () => {
  const { data: alertsData } = useGetLowStockAlertsQuery({});
  const { data: ordersData } = useGetPurchaseOrdersQuery({ status: "pending" });
  const { data: materialsData } = useGetRawMaterialsQuery({});

  const alerts = alertsData?.data || [];
  const pendingOrders = ordersData?.data || [];
  const materials = materialsData?.data || [];

  const totalMaterials = materials.length;
  const lowStockCount = alerts.length;
  const pendingOrdersCount = pendingOrders.length;
  const totalStockValue = materials.reduce((sum: number, material: any) => 
    sum + (material.currentStock * material.unitPrice), 0);

  return (
    <Dashboard title="Warehouse Manager">
      <div className="mb-6 flex justify-start">
        <p className="text-gray-600">
          Welcome to Warehouse Management. Monitor your inventory and orders.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Total Materials",
            value: totalMaterials.toString(),
            change: "+5.2%",
            color: "bg-blue-500",
            icon: Package,
          },
          {
            title: "Low Stock Alerts",
            value: lowStockCount.toString(),
            change: lowStockCount > 0 ? "Attention needed" : "All good",
            color: lowStockCount > 0 ? "bg-red-500" : "bg-green-500",
            icon: AlertTriangle,
          },
          {
            title: "Pending Orders",
            value: pendingOrdersCount.toString(),
            change: "+2 this week",
            color: "bg-orange-500",
            icon: ShoppingCart,
          },
          {
            title: "Stock Value",
            value: `₹${totalStockValue.toLocaleString()}`,
            change: "+12.3%",
            color: "bg-purple-500",
            icon: TrendingUp,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
            <div className="mt-2 text-xs font-medium text-gray-600">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Low Stock Alerts
            </Typography>
            {alerts.length > 0 ? (
              <List>
                {alerts.slice(0, 5).map((alert: any) => (
                  <ListItem key={alert.id} divider>
                    <ListItemText
                      primary={alert.rawMaterial?.name}
                      secondary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Current: {alert.currentStock} {alert.rawMaterial?.unit}
                          </Typography>
                          <Chip
                            label={alert.alertType === "out_of_stock" ? "Out of Stock" : "Low Stock"}
                            color={alert.alertType === "out_of_stock" ? "error" : "warning"}
                            size="small"
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                No low stock alerts at the moment.
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Recent Purchase Orders */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Purchase Orders
            </Typography>
            {pendingOrders.length > 0 ? (
              <List>
                {pendingOrders.slice(0, 5).map((order: any) => (
                  <ListItem key={order.id} divider>
                    <ListItemText
                      primary={`Order #${order.orderNumber}`}
                      secondary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {order.vendor?.name} - ₹{order.totalAmount?.toFixed(2)}
                          </Typography>
                          <Chip
                            label={order.status}
                            color="warning"
                            size="small"
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                No pending purchase orders.
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </Dashboard>
  );
};

export default WarehouseDashboard;