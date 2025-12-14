import {
  Box,
  Typography,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Button,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import {
  Warning,
  Error,
  CheckCircle,
  Inventory,
  Visibility,
  MarkAsUnread,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetConsumableStockAlertsQuery,
  useMarkConsumableStockAlertAsReadMutation,
  useMarkAllConsumableStockAlertsAsReadMutation,
} from "../../app/api/consumableMaterialsApi";

const ConsumableStockAlertsPanel = () => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedAlertType, setSelectedAlertType] = useState<string>("all");

  const { data: alertsData, refetch } = useGetConsumableStockAlertsQuery({});
  const [markAsRead] = useMarkConsumableStockAlertAsReadMutation();
  const [markAllAsRead] = useMarkAllConsumableStockAlertsAsReadMutation();

  const alerts = alertsData?.data || [];
  const unreadAlerts = alerts.filter(alert => !alert.isRead);
  const lowStockAlerts = alerts.filter(alert => alert.alertType === "low_stock");
  const outOfStockAlerts = alerts.filter(alert => alert.alertType === "out_of_stock");

  const filteredAlerts = selectedAlertType === "all"
    ? alerts
    : alerts.filter(alert => alert.alertType === selectedAlertType);

  const handleMarkAsRead = async (alertId: number) => {
    try {
      await markAsRead({ id: alertId.toString() }).unwrap();
      dispatch(addToast({
        message: "Alert marked as read",
        type: "success"
      }));
      refetch();
    } catch (error) {
      dispatch(addToast({
        message: "Failed to mark alert as read",
        type: "error"
      }));
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      dispatch(addToast({
        message: "All alerts marked as read",
        type: "success"
      }));
      refetch();
    } catch (error) {
      dispatch(addToast({
        message: "Failed to mark all alerts as read",
        type: "error"
      }));
    }
  };

  const getAlertIcon = (alertType: string) => {
    switch (alertType) {
      case "out_of_stock":
        return <Error color="error" />;
      case "low_stock":
        return <Warning color="warning" />;
      default:
        return <Inventory color="info" />;
    }
  };

  const getAlertColor = (alertType: string) => {
    switch (alertType) {
      case "out_of_stock":
        return "error";
      case "low_stock":
        return "warning";
      default:
        return "info";
    }
  };

  const getAlertSeverity = (alertType: string): "error" | "warning" | "info" => {
    switch (alertType) {
      case "out_of_stock":
        return "error";
      case "low_stock":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <Box>
      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'error.main', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
              <Typography variant="h4" component="div">
                {outOfStockAlerts.length}
              </Typography>
              <Typography variant="body2">
                Out of Stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
              <Typography variant="h4" component="div">
                {lowStockAlerts.length}
              </Typography>
              <Typography variant="body2">
                Low Stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
              <Typography variant="h4" component="div">
                {unreadAlerts.length}
              </Typography>
              <Typography variant="body2">
                Unread Alerts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        <Chip
          label="All Alerts"
          onClick={() => setSelectedAlertType("all")}
          color={selectedAlertType === "all" ? "primary" : "default"}
          variant={selectedAlertType === "all" ? "filled" : "outlined"}
        />
        <Chip
          label="Out of Stock"
          onClick={() => setSelectedAlertType("out_of_stock")}
          color={selectedAlertType === "out_of_stock" ? "error" : "default"}
          variant={selectedAlertType === "out_of_stock" ? "filled" : "outlined"}
        />
        <Chip
          label="Low Stock"
          onClick={() => setSelectedAlertType("low_stock")}
          color={selectedAlertType === "low_stock" ? "warning" : "default"}
          variant={selectedAlertType === "low_stock" ? "filled" : "outlined"}
        />
      </Box>

      {/* Actions */}
      {unreadAlerts.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            onClick={handleMarkAllAsRead}
            startIcon={<CheckCircle />}
          >
            Mark All as Read
          </Button>
        </Box>
      )}

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <Alert severity="success">
          <Typography variant="body2">
            No stock alerts at this time. All consumable materials are adequately stocked.
          </Typography>
        </Alert>
      ) : (
        <Card>
          <CardContent sx={{ p: 0 }}>
            <List>
              {filteredAlerts.map((alert, index) => (
                <div key={alert.id}>
                  <ListItem
                    sx={{
                      bgcolor: alert.isRead ? 'transparent' : 'action.hover',
                      '&:hover': { bgcolor: 'action.selected' },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getAlertColor(alert.alertType) + '.light' }}>
                        {getAlertIcon(alert.alertType)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight={alert.isRead ? "normal" : "bold"}
                          >
                            {alert.consumableMaterial?.materialName || "Unknown Material"}
                          </Typography>
                          <Chip
                            label={alert.alertType.replace('_', ' ').toUpperCase()}
                            color={getAlertColor(alert.alertType) as any}
                            size="small"
                          />
                          {!alert.isRead && (
                            <Chip
                              label="New"
                              color="primary"
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Current Stock: {alert.currentStock} {alert.consumableMaterial?.unit}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Minimum Required: {alert.minimumStock} {alert.consumableMaterial?.unit}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Category: {alert.consumableMaterial?.category} •
                            Alert created: {new Date(alert.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {!alert.isRead && (
                        <IconButton
                          size="small"
                          onClick={() => handleMarkAsRead(alert.id)}
                          color="primary"
                        >
                          <MarkAsUnread />
                        </IconButton>
                      )}
                      <IconButton size="small" color="info">
                        <Visibility />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {index < filteredAlerts.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ConsumableStockAlertsPanel;
