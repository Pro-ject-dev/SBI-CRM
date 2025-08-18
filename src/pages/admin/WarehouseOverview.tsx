import { useNavigate } from "react-router-dom";
import { Inventory, People, ShoppingCart, Assignment, FactCheck } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const WarehouseOverview = () => {
  const navigate = useNavigate();

  const warehouseModules = [
    {
      title: "Raw Materials",
      description: "Manage inventory of raw materials",
      icon: Inventory,
      path: "/warehouse/raw-materials",
      color: "primary",
    },
    {
      title: "Vendors",
      description: "Manage vendor information and relationships",
      icon: People,
      path: "/warehouse/vendors",
      color: "secondary",
    },
    {
      title: "Purchase Orders",
      description: "Create and manage purchase orders",
      icon: ShoppingCart,
      path: "/warehouse/purchase-orders",
      color: "success",
    },
    {
      title: "PO Approval",
      description: "Review and approve purchase orders",
      icon: FactCheck,
      path: "/admin/purchase-orders",
      color: "info",
    },
    {
      title: "Stock Assignment",
      description: "Assign materials to orders",
      icon: Assignment,
      path: "/warehouse/stock-assignment",
      color: "warning",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          p: 2,
          mb: 3,
          color: "white",
          textAlign: "center",
          borderRadius: "16px",
          background: "linear-gradient(to right, #94a3b8, #334155, #0f172a)",
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Warehouse Management
        </Typography>
        <Typography variant="subtitle1">
          Comprehensive warehouse and inventory management system
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {warehouseModules.map((module, index) => (
          <Grid xs={12} sm={6} md={6} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "50%",
                      bgcolor: `${module.color}.light`,
                      color: `${module.color}.main`,
                    }}
                  >
                    <module.icon sx={{ fontSize: 40 }} />
                  </Box>
                </Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  {module.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {module.description}
                </Typography>
                <Button
                  variant="contained"
                  color={module.color as any}
                  onClick={() => navigate(module.path)}
                  sx={{ mt: 2 }}
                >
                  Access Module
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WarehouseOverview;