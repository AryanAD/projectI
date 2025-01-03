// Packages Import
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Outlet, useLocation, useNavigate } from "react-router";
import { HomeRounded, ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

// Project Imports
import saLogo from "../../assets/saLogo.png";
import profilePicture from "../../assets/profilePicture.jpg";
import UserAccordion from "./accordion/UserAccordion";
import TaskAccordion from "./accordion/TaskAccordion";
import ClientAccordion from "./accordion/ClientAccordion";
import ProjectAccordion from "./accordion/ProjectAccordion";
import { logout } from "../../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../../redux/features/users/userApiSlice";
import { useDispatch } from "react-redux";

// Constants
const drawerWidth = 300;
const collapsedDrawerWidth = 70;

const Navigation = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const location = useLocation();
  const currentPath = location.pathname;

  // States
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Functions
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const drawer = (
    <motion.div
      className="h-full"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-3 py-2">
        <img
          src={saLogo}
          alt="Profile Picture"
          className="w-[49px] h-[49px] transition-all ease-in duration-300"
        />
        {!sidebarCollapsed && (
          <h1 className="font-semibold text-[#4B49AC] text-2xl transition-all ease-in duration-300">
            Saral Admin
          </h1>
        )}
      </div>

      <List
        sx={{
          height: "calc(100vh - 64px)",
          overflow: "hidden",
          borderRight: "2px solid #f5f5f5",
        }}
        disablePadding
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: currentPath === "/" ? "#4B49AC" : "transparent",
              color: currentPath === "/" ? "white" : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/" ? "#4B49AC" : "transparent",
                color: currentPath === "/" ? "white" : "black",
              },
              transition: "all 0.5s ease",
            }}
          >
            <ListItemIcon>
              <HomeRounded
                sx={{
                  color: currentPath === "/" ? "white" : "black",
                  transition: "all 0.5s ease",
                  marginLeft: sidebarCollapsed ? "10px" : "20px",
                }}
              />
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Home" />}
          </ListItemButton>
        </ListItem>

        <UserAccordion sidebarCollapsed={sidebarCollapsed} />
        <ClientAccordion sidebarCollapsed={sidebarCollapsed} />
        <ProjectAccordion sidebarCollapsed={sidebarCollapsed} />
        <TaskAccordion sidebarCollapsed={sidebarCollapsed} />
      </List>
    </motion.div>
  );

  return (
    <div className="flex min-h-screen h-full py-12">
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${sidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px)`,
          ml: `${sidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px`,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          bgcolor: "white",
          transition: "all 0.5s ease",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton
              onClick={handleSidebarToggle}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                color: "#4B49AC",
              }}
            >
              {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 600,
                fontSize: { xs: 24, md: 28, lg: 32 },
                color: "#4B49AC",
                transition: "all 0.5s ease",
              }}
            >
              Saral Admin
            </Typography>
            <Box>
              <Tooltip title="Open Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={profilePicture} alt="Profile Picture" />
                </IconButton>
              </Tooltip>
              <Menu
                keepMounted
                id="menu-appbar"
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Link to={"/admin/profile"}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign={"center"}>Profile</Typography>
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    handleLogout();
                  }}
                >
                  <Typography textAlign={"center"}>Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component={"nav"}
        sx={{
          width: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
          flexShrink: 0,
          transition: "width 0.5s ease",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              border: "none",
              width: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
              transition: "width 0.5s ease",
              overflow: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Outlet />
    </div>
  );
};

export default Navigation;
