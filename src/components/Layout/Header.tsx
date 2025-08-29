import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logout } from "../../app/slices/authSlice";
import type { RootState } from "../../app/store";
import type { UserRole } from "../../types/auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get auth data from Redux store
  const { userName, role } = useSelector((state: RootState) => state.auth);
  
  // State for User Menu
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    // Clear auth data from Redux
    dispatch(logout());
    
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("api_endpoint");
    
    // Close menu
    handleCloseUserMenu();
    
    // Navigate to login page
    navigate("/login");
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    // TODO: Navigate to profile page when implemented
    console.log("Navigate to profile");
  };

  const handleSettings = () => {
    handleCloseUserMenu();
    // TODO: Navigate to settings page when implemented
    console.log("Navigate to settings");
  };

  // Get dynamic title based on user role
  const getDashboardTitle = (role: UserRole | null): string => {
    switch (role) {
      case "admin":
        return "Admin Dashboard";
      case "sales_manager":
        return "Sales Manager Dashboard";
      case "warehouse_manager":
        return "Warehouse Dashboard";
      case "operation_manager":
        return "Operation Manager Dashboard";
      default:
        return "Dashboard";
    }
  };

  // Get user initials for avatar
  const getUserInitials = (name: string | null): string => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role display name
  const getRoleDisplayName = (role: UserRole | null): string => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "sales_manager":
        return "Sales Manager";
      case "warehouse_manager":
        return "Warehouse Manager";
      case "operation_manager":
        return "Operation Manager";
      default:
        return "User";
    }
  };

  // If no user is authenticated, don't render header
  if (!userName || !role) {
    return null;
  }

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: "white",
        color: "#1f2937",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {getDashboardTitle(role)}
        </Typography>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            onClick={handleOpenUserMenu}
            sx={{
              p: 0.5,
              borderRadius: 2,
              textTransform: "none",
              color: "inherit",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
            aria-controls={
              anchorElUser ? "user-menu-appbar" : undefined
            }
            aria-haspopup="true"
          >
            {/* Avatar */}
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: (theme) => theme.palette.primary.main,
                fontSize: "1rem",
                mr: 1.5,
              }}
            >
              {getUserInitials(userName)}
            </Avatar>
            
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                textAlign: "left",
                mr: 0.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, lineHeight: 1.2 }}
              >
                {userName}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", lineHeight: 1.2 }}
              >
                {getRoleDisplayName(role)}
              </Typography>
            </Box>
            
            <KeyboardArrowDownIcon sx={{ color: "grey.500" }} />
          </Button>
          
          <Menu
            id="user-menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            MenuListProps={{
              "aria-labelledby": "user-button",
            }}
            sx={{
              "& .MuiPaper-root": {
                width: 220,
                mt: 1.5,
                borderRadius: 2,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            {/* User Info Section */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "600" }}>
                {userName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {getRoleDisplayName(role)}
              </Typography>
            </Box>
            
            {/* Menu Items */}
            <MenuItem onClick={handleProfile} sx={{ py: 1.25, px: 2 }}>
              <AccountCircleIcon fontSize="small" sx={{ mr: 1.5, color: "text.secondary" }} />
              <Typography variant="body2">Profile</Typography>
            </MenuItem>
            
            <MenuItem onClick={handleSettings} sx={{ py: 1.25, px: 2 }}>
              <SettingsIcon fontSize="small" sx={{ mr: 1.5, color: "text.secondary" }} />
              <Typography variant="body2">Settings</Typography>
            </MenuItem>
            
            <Divider />
            
            <MenuItem onClick={handleSignOut} sx={{ py: 1.25, px: 2, color: "error.main" }}>
              <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
              <Typography variant="body2">Sign out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
