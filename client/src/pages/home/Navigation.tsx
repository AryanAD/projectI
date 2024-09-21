// Packages Import
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";
import {
  HomeRounded,
  MenuRounded,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
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

// Project Imports
import ProfilePicture from "/profilePicture.jpg";
import UserAccordion from "../../components/dashboard/accordion/UserAccordion";
import TaskAccordion from "../../components/dashboard/accordion/TaskAccordion";
import ClientAccordion from "../../components/dashboard/accordion/ClientAccordion";
import ProjectAccordion from "../../components/dashboard/accordion/ProjectAccordion";

// Constants
const drawerWidth = 300;
const collapsedDrawerWidth = 70;

const Navigation = () => {
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  // States
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Functions
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    navigate("/login");
    toast.success("Logged Out Successfully!");
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const drawer = (
    <>
      <div className="flex items-center justify-center gap-3 py-2">
        <>
          <img
            src={ProfilePicture}
            alt="Profile Picture"
            className="w-[54px] h-[54px] transition-all ease-in-out"
          />
          {!sidebarCollapsed && (
            <h1 className="font-semibold text-3xl transition-all ease-in-out">
              Saral Admin
            </h1>
          )}
        </>
      </div>

      <Divider />
      <List disablePadding>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate("/")}
            sx={{
              backgroundColor:
                currentPath === "/" || currentPath === "/profile"
                  ? "#5AC064"
                  : "transparent",
              color:
                currentPath === "/" || currentPath === "/profile"
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/" || currentPath === "/profile"
                    ? "#5AC064"
                    : "transparent",
                color:
                  currentPath === "/" || currentPath === "/profile"
                    ? "white"
                    : "black",
              },
              transition: "all 0.5s ease",
            }}
          >
            <ListItemIcon>
              <HomeRounded
                sx={{
                  color:
                    currentPath === "/" || currentPath === "/profile"
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary="Home" />}
          </ListItemButton>
        </ListItem>

        <UserAccordion />
        <ClientAccordion />
        <ProjectAccordion />
        <TaskAccordion />
      </List>
    </>
  );

  return (
    <div className="flex items-center">
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: {
            sm: `calc(100% - ${sidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px)`,
          },
          ml: {
            sm: `${sidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px`,
          },
          bgcolor: "#5AC064",
          height: 70,
          transition: "width 0.5s ease, margin-left 0.5s ease",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuRounded sx={{ color: "white", height: 33, width: 33 }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Sidebar Toggle Button */}
            <IconButton onClick={handleSidebarToggle} sx={{ color: "white" }}>
              {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 600,
                fontSize: {
                  sm: 18,
                  md: 24,
                  lg: 28,
                },
              }}
            >
              Dashboard
            </Typography>

            <Box>
              <Tooltip title="Open Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={ProfilePicture} alt="Profile Picture" />
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
                <Link to={"/profile/profile"}>
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
          width: {
            sm: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
          },
          flexShrink: { sm: 0 },
          transition: "width 0.5s ease",
        }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
              transition: "width 0.5s ease",
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
              transition: "width 0.5s ease",
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
