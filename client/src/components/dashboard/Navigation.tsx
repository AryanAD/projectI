// Packages Import
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
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
import ProfilePicture from "../../assets/profilePicture.jpg";
import UserAccordion from "./accordion/UserAccordion";
import TaskAccordion from "./accordion/TaskAccordion";
import ClientAccordion from "./accordion/ClientAccordion";
import ProjectAccordion from "./accordion/ProjectAccordion";

// Constants
const drawerWidth = 300;
const collapsedDrawerWidth = 70;

const Navigation = () => {
  // Hooks
  const navigate = useNavigate();
  // const dispatch = useDispatch();
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
    // dispatch(here)
    navigate("/login");
    toast.success("Logged Out Successfully!");
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const drawer = (
    <div className="h-full">
      <div className="flex items-center justify-center gap-3 py-2">
        <>
          <img
            src={ProfilePicture}
            alt="Profile Picture"
            className="w-[49px] h-[49px] transition-all ease-in duration-300"
          />
          {!sidebarCollapsed && (
            <h1 className="font-semibold text-[#4B49AC] text-3xl transition-all ease-in duration-300">
              Saral Admin
            </h1>
          )}
        </>
      </div>

      <List
        sx={{
          height: "92vh",
          overflow: "hidden",
          borderRight: "2px solid #f5f5f5",
        }}
        disablePadding
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate("/")}
            sx={{
              backgroundColor:
                currentPath === "/" || currentPath === "/profile"
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath === "/" || currentPath === "/profile"
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/" || currentPath === "/profile"
                    ? "#4B49AC"
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
    </div>
  );

  return (
    <>
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
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          bgcolor: "white",
          transition: "all 0.5s ease",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuRounded sx={{ color: "#4B49AC", height: 33, width: 33 }} />
          </IconButton>
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
                fontSize: {
                  xs: 24,
                  md: 28,
                  lg: 32,
                },
                color: "#4B49AC",
                transition: "all 0.5s ease",
              }}
            >
              Saral Admin
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
              border: "none",
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
    </>
  );
};

export default Navigation;
