// // Packages Import
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// import { Outlet, useLocation, useNavigate } from "react-router";
// import {
//   HomeRounded,
//   MenuRounded,
//   ChevronLeft,
//   ChevronRight,
// } from "@mui/icons-material";
// import {
//   AppBar,
//   Avatar,
//   Box,
//   CssBaseline,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Menu,
//   MenuItem,
//   Toolbar,
//   Tooltip,
//   Typography,
// } from "@mui/material";

// // Project Imports
// import saLogo from "../../assets/saLogo.png";
// import profilePicture from "../../assets/profilePicture.jpg";
// import UserAccordion from "./accordion/UserAccordion";
// import TaskAccordion from "./accordion/TaskAccordion";
// import ClientAccordion from "./accordion/ClientAccordion";
// import ProjectAccordion from "./accordion/ProjectAccordion";
// import { logout } from "../../redux/features/auth/authSlice";
// import { useLogoutUserMutation } from "../../redux/features/users/userApiSlice";
// import { useDispatch } from "react-redux";

// // Constants
// const drawerWidth = 300;
// const collapsedDrawerWidth = 70;

// const Navigation = () => {
//   // Hooks
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [logoutUser] = useLogoutUserMutation();

//   const location = useLocation();
//   const currentPath = location.pathname;

//   // States
//   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Functions
//   const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(e.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await logoutUser().unwrap();
//       dispatch(logout());
//       navigate("/login");
//       toast.success("Logged Out Successfully");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSidebarToggle = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   const drawer = (
//     <div className="h-full">
//       <div className="flex items-center justify-center gap-3 py-2">
//         <>
//           <img
//             src={saLogo}
//             alt="Profile Picture"
//             className="w-[49px] h-[49px] transition-all ease-in duration-300"
//           />
//           {!sidebarCollapsed && (
//             <h1 className="font-semibold text-[#4B49AC] text-3xl transition-all ease-in duration-300">
//               Saral Admin
//             </h1>
//           )}
//         </>
//       </div>

//       <List
//         sx={{
//           height: "92vh",
//           overflow: "hidden",
//           borderRight: "2px solid #f5f5f5",
//         }}
//         disablePadding
//       >
//         <ListItem disablePadding>
//           <ListItemButton
//             onClick={() => navigate("/")}
//             sx={{
//               backgroundColor: currentPath === "/" ? "#4B49AC" : "transparent",
//               color: currentPath === "/" ? "white" : "black",
//               "&:hover": {
//                 backgroundColor:
//                   currentPath === "/" ? "#4B49AC" : "transparent",
//                 color: currentPath === "/" ? "white" : "black",
//               },
//               transition: "all 0.5s ease",
//             }}
//           >
//             <ListItemIcon>
//               <HomeRounded
//                 sx={{
//                   color: currentPath === "/" ? "white" : "",
//                   transition: "all 0.5s ease",
//                   marginLeft: sidebarCollapsed ? "10px" : "20px",
//                 }}
//               />
//             </ListItemIcon>
//             {!sidebarCollapsed && <ListItemText primary="Home" />}
//           </ListItemButton>
//         </ListItem>

//         <UserAccordion sidebarCollapsed={sidebarCollapsed} />
//         <ClientAccordion sidebarCollapsed={sidebarCollapsed} />
//         <ProjectAccordion sidebarCollapsed={sidebarCollapsed} />
//         <TaskAccordion sidebarCollapsed={sidebarCollapsed} />
//       </List>
//     </div>
//   );

//   // commit

//   return (
//     <>
//       <CssBaseline />

//       <AppBar
//         position="fixed"
//         sx={{
//           width: {
//             sm: `calc(100% - ${sidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px)`,
//           },
//           ml: {
//             sm: `${sidebarCollapsed ? collapsedDrawerWidth : drawerWidth}px`,
//           },
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//           bgcolor: "white",
//           transition: "all 0.5s ease",
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuRounded sx={{ color: "#4B49AC", height: 33, width: 33 }} />
//           </IconButton>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "100%",
//             }}
//           >
//             <IconButton
//               onClick={handleSidebarToggle}
//               sx={{
//                 display: { xs: "none", sm: "inline-flex" },
//                 color: "#4B49AC",
//               }}
//             >
//               {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
//             </IconButton>

//             <Typography
//               variant="h6"
//               noWrap
//               component="div"
//               sx={{
//                 fontWeight: 600,
//                 fontSize: {
//                   xs: 24,
//                   md: 28,
//                   lg: 32,
//                 },
//                 color: "#4B49AC",
//                 transition: "all 0.5s ease",
//               }}
//             >
//               Saral Admin
//             </Typography>
//             <Box>
//               <Tooltip title="Open Settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar src={profilePicture} alt="Profile Picture" />
//                 </IconButton>
//               </Tooltip>
//               <Menu
//                 keepMounted
//                 id="menu-appbar"
//                 sx={{ mt: "45px" }}
//                 anchorEl={anchorElUser}
//                 open={Boolean(anchorElUser)}
//                 onClose={handleCloseUserMenu}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//               >
//                 <Link to={"/profile"}>
//                   <MenuItem onClick={handleCloseUserMenu}>
//                     <Typography textAlign={"center"}>Profile</Typography>
//                   </MenuItem>
//                 </Link>
//                 <MenuItem
//                   onClick={() => {
//                     handleCloseUserMenu();
//                     handleLogout();
//                   }}
//                 >
//                   <Typography textAlign={"center"}>Log Out</Typography>
//                 </MenuItem>
//               </Menu>
//             </Box>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Box
//         component={"nav"}
//         sx={{
//           width: {
//             sm: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
//           },
//           flexShrink: { sm: 0 },
//           transition: "width 0.5s ease",
//         }}
//         aria-label="mailbox folders"
//       >
//         {/* Mobile Drawer */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
//               transition: "width 0.5s ease",
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         {/* Desktop Drawer */}
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               border: "none",
//               width: sidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
//               transition: "width 0.5s ease",
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Outlet />
//     </>
//   );
// };

// export default Navigation;

import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Outlet, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../../redux/features/users/userApiSlice";
import Logo from "../../assets/saLogo.png";
import profilePicture from "../../assets/profilePicture.jpg";
import {
  Home,
  Menu,
  ChevronLeft,
  ChevronRight,
  Settings,
  Logout,
} from "@mui/icons-material";
import UserAccordion from "./accordion/UserAccordion";
import ClientAccordion from "./accordion/ClientAccordion";
import ProjectAccordion from "./accordion/ProjectAccordion";
import TaskAccordion from "./accordion/TaskAccordion";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center gap-3 p-4 border-b border-gray-100">
        <img
          src={Logo}
          alt="Logo"
          className="w-12 h-12 transition-all duration-300 rounded-lg"
        />
        {!isSidebarCollapsed && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-indigo-600"
          >
            Saral Admin
          </motion.h1>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto">
        <div className="px-3 py-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all
              ${currentPath === "/" ? "bg-[#4B49AB] text-white" : "hover:bg-gray-100"}`}
            onClick={() => navigate("/")}
          >
            <Home className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="ml-3">Dashboard</span>}
          </motion.div>

          {/* Accordion sections - maintaining your existing structure */}
          {!isSidebarCollapsed && (
            <>
              <UserAccordion sidebarCollapsed={isSidebarCollapsed} />
              <ClientAccordion sidebarCollapsed={isSidebarCollapsed} />
              <ProjectAccordion sidebarCollapsed={isSidebarCollapsed} />
              <TaskAccordion sidebarCollapsed={isSidebarCollapsed} />
            </>
          )}
        </div>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarCollapsed ? "5rem" : "20rem" }}
        className="fixed inset-y-0 left-0 z-50 hidden bg-white border-r border-gray-200 lg:block"
      >
        <SidebarContent />
      </motion.aside>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav className="relative flex flex-col h-full max-w-xs bg-white w-80">
              <SidebarContent />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`lg:ml-${isSidebarCollapsed ? "20" : "80"} transition-all duration-300`}
      >
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 lg:left-[${isSidebarCollapsed ? '5rem' : '20rem'}] z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg lg:hidden hover:bg-gray-100"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden p-2 rounded-lg lg:block hover:bg-gray-100"
              >
                {isSidebarCollapsed ? (
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                ) : (
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
                  >
                    <Link to="/profile">
                      <motion.div
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile</span>
                      </motion.div>
                    </Link>
                    <motion.div
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <Logout className="w-4 h-4" />
                      <span>Log Out</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-4 pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Navigation;
