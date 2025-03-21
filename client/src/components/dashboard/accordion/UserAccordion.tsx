import { useEffect, useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  PersonRounded,
  PeopleRounded,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarCollapseType from "./Interface";

const UserAccordion = ({ sidebarCollapsed }: SidebarCollapseType) => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // States
  const [openUsers, setOpenUsers] = useState(true);

  // Functions
  const handleInventoryClick = () => {
    setOpenUsers(!openUsers);
  };

  useEffect(() => {
    if (
      currentPath.includes("/admin/edit-user") ||
      currentPath.includes("/admin/users") ||
      currentPath === "/admin/add-users"
    ) {
      setOpenUsers(true);
    } else {
      setOpenUsers(false);
    }
  }, [currentPath]);

  return (
    <>
      <ListItemButton onClick={handleInventoryClick}>
        <ListItemIcon>
          <PersonRounded
            sx={{
              transition: "all 0.5s ease",
              marginLeft: sidebarCollapsed ? "10px" : "20px",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Users" />
        {openUsers ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openUsers} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            onClick={() => navigate("/admin/users")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath.includes("/admin/edit-user") ||
                currentPath.includes("/admin/users") ||
                currentPath === "/admin/add-users"
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath.includes("/admin/edit-user") ||
                currentPath.includes("/admin/users") ||
                currentPath === "/admin/add-users"
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath.includes("/admin/edit-user") ||
                  currentPath.includes("/admin/users") ||
                  currentPath === "/admin/add-users"
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath.includes("/admin/edit-user") ||
                  currentPath.includes("/admin/users") ||
                  currentPath === "/admin/add-users"
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <PeopleRounded
                sx={{
                  color:
                    currentPath.includes("/admin/edit-user") ||
                    currentPath.includes("/admin/users") ||
                    currentPath === "/admin/add-users"
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

export default UserAccordion;
