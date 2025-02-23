import { useState, MouseEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HomeRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
  MenuRounded,
} from "@mui/icons-material";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Avatar,
  Box,
  CssBaseline,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme, CSSObject } from "@mui/material/styles";
import { motion } from "framer-motion";

// Project Imports
import saLogo from "../../assets/saLogo.png";
import profilePicture from "../../assets/profilePicture.jpg";
import UserAccordion from "./accordion/UserAccordion";
import TaskAccordion from "./accordion/TaskAccordion";
import ClientAccordion from "./accordion/ClientAccordion";
import ProjectAccordion from "./accordion/ProjectAccordion";
import { useLogout } from "../../api/users/users";

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.background.default,
  border: "none",
  boxShadow: "0 0 35px 0 rgba(0,0,0,0.05)",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.background.default,
  borderRight: `1px solid ${theme.palette.divider}`,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  width: `calc(100% - ${theme.spacing(7)} - 1px)`,
  height: "65px",
  backgroundColor: "#4B49AC",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
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

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mutate: logoutUser } = useLogout();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (!token || !userRole) {
      navigate("/login", { replace: true });
    }
    if (userRole === "staff") {
      navigate("/staff", { replace: true });
    }
  }, [token, userRole, navigate]);

  const [open, setOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully!");
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error.message || "Logout failed. Please try again.");
      },
    });
  };

  if (!token || !userRole) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ color: "white" }}
            >
              <MenuRounded />
            </IconButton>
            <Typography
              variant="h6"
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: { xs: 20, sm: 24, md: 28 },
              }}
            >
              Saral Admin
            </Typography>
          </Box>

          <Box>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                <Avatar
                  src={profilePicture}
                  alt="Profile Picture"
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              sx={{ mt: 1 }}
            >
              {userRole === "admin" ? (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/profile");
                  }}
                >
                  <Typography>Profile</Typography>
                </MenuItem>
              ) : null}
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleLogout();
                }}
              >
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src={saLogo}
            alt="Saral Admin Logo"
            style={{ width: 40, height: 40 }}
          />
          {open && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#4B49AC",
                opacity: open ? 1 : 0,
                transition: "opacity 0.2s",
              }}
            >
              Saral Admin
            </Typography>
          )}
          {isMobile && (
            <IconButton onClick={handleDrawerToggle}>
              {open ? <ChevronLeftRounded /> : <ChevronRightRounded />}
            </IconButton>
          )}
        </Box>

        <List component="nav" sx={{ px: 1 }}>
          <StyledListItemButton
            onClick={
              userRole === "staff"
                ? () => navigate("/staff")
                : () => navigate("/")
            }
            selected={
              location.pathname.includes("staff") || location.pathname === "/"
            }
          >
            <ListItemIcon>
              <HomeRounded
                sx={{
                  color:
                    location.pathname === "/" ||
                    location.pathname.includes("staff")
                      ? "#4B49AC"
                      : "inherit",
                }}
              />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Home"
                primaryTypographyProps={{
                  fontWeight:
                    location.pathname === "/" ||
                    location.pathname.includes("staff")
                      ? 600
                      : 400,
                }}
              />
            )}
          </StyledListItemButton>

          {userRole === "admin" && <UserAccordion sidebarCollapsed={!open} />}
          {userRole === "admin" && <ClientAccordion sidebarCollapsed={!open} />}
          {userRole === "admin" && (
            <ProjectAccordion sidebarCollapsed={!open} />
          )}
          {userRole === "admin" && <TaskAccordion sidebarCollapsed={!open} />}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Navigation;
