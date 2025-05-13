import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  // State for User Menu
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    console.log("Signing out...");
    handleCloseUserMenu();
  };

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
        {" "}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          Admin Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {" "}
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
              Boolean(anchorElUser) ? "user-menu-appbar" : undefined
            }
            aria-haspopup="true"
          >
            {/* Avatar */}
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#2563eb",
                fontSize: "1rem",
                mr: 1.5,
              }}
            >
              {" "}
              <PersonIcon fontSize="small" />
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
                {" "}
                Alex Johnson
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", lineHeight: 1.2 }}
              >
                {" "}
                Admin
              </Typography>
            </Box>
            <KeyboardArrowDownIcon sx={{ color: "grey.500" }} />{" "}
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
                width: 192,
                mt: 1.5,
                borderRadius: 2,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <MenuItem onClick={handleSignOut} sx={{ py: 1.25, px: 2 }}>
              {" "}
              <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />{" "}
              <Typography variant="body2">Sign out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
