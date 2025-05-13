import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  useTheme,
  type CSSObject,
  type Theme,
} from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import { useState } from "react";
import type { SideBar } from "../../types/sideBar";
import { ChevronLeft, HelpOutline, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sideMenuItems }: { sideMenuItems: SideBar[] }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawerWidth = 256;
  const collapsedDrawerWidth = 80;

  const handlePageChange = (item: SideBar) => {
    setActivePage(item.id);
    navigate(item.path);
  };

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#1e293b",
    color: "#cbd5e1",
    borderRight: "none",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `${collapsedDrawerWidth}px`,
    backgroundColor: "#1e293b",
    color: "#cbd5e1",
    borderRight: "none",
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2),
    minHeight: "64px",
    borderBottom: "1px solid #334155",
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: "bold",
            color: "white",
            opacity: open ? 1 : 0,
            transition: theme.transitions.create("opacity", {
              duration: theme.transitions.duration.shortest,
            }),
          }}
        >
          Enterprise CRM
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: "#94a3b8",
            "&:hover": {
              backgroundColor: "#334155",
              color: "white",
            },
            marginLeft: !open ? "auto" : "0",
            marginRight: !open ? "auto" : "0",
          }}
        >
          {open ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </DrawerHeader>

      <List sx={{ paddingY: theme.spacing(2), flexGrow: 1 }}>
        {" "}
        {sideMenuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={activePage === item.id}
              onClick={() => handlePageChange(item)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                mx: 1.5,
                borderRadius: theme.shape.borderRadius,
                color: "#cbd5e1",
                "&:hover": {
                  backgroundColor: "#334155",
                  color: "white",
                },
                "&.Mui-selected": {
                  backgroundColor: "#2563eb",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1d4ed8",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "inherit",
                }}
              >
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  opacity: open ? 1 : 0,
                  color: "inherit",
                  "& .MuiTypography-root": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ padding: theme.spacing(2), borderTop: "1px solid #334155" }}>
        {" "}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              borderRadius: theme.shape.borderRadius,
              color: "#cbd5e1",
              "&:hover": {
                backgroundColor: "transparent",
                color: "white",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "inherit",
              }}
            >
              <HelpOutline />
            </ListItemIcon>
            <ListItemText
              primary="Help & Support"
              sx={{
                opacity: open ? 1 : 0,
                color: "inherit",
                "& .MuiTypography-root": {
                  fontSize: "0.875rem",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
