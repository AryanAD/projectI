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
  EmojiPeopleRounded,
  GroupsRounded,
  CategoryRounded,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarCollapseType from "./Interface";

const ClientAccordion = ({ sidebarCollapsed }: SidebarCollapseType) => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // States
  const [openClients, setOpenClients] = useState(true);

  // Functions
  const handleInventoryClick = () => {
    setOpenClients(!openClients);
  };

  useEffect(() => {
    if (
      currentPath === "/admin/client-categories" ||
      currentPath === "/admin/add-client-category" ||
      currentPath === "/admin/manage-client-category" ||
      currentPath.includes("/admin/edit-client-category") ||
      currentPath === "/admin/clients" ||
      currentPath === "/admin/add-clients" ||
      currentPath === "/admin/manage-clients" ||
      currentPath.includes("/admin/edit-clients") ||
      currentPath.includes("/admin/clients")
    ) {
      setOpenClients(true);
    } else {
      setOpenClients(false);
    }
  }, [currentPath]);

  return (
    <>
      <ListItemButton onClick={handleInventoryClick}>
        <ListItemIcon>
          <EmojiPeopleRounded
            sx={{
              transition: "all 0.5s ease",
              marginLeft: sidebarCollapsed ? "10px" : "20px",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Clients" />
        {openClients ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openClients} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            onClick={() => navigate("/admin/client-categories")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/admin/client-categories" ||
                currentPath === "/admin/add-client-category" ||
                currentPath === "/admin/manage-client-category" ||
                currentPath.includes("/admin/edit-client-category")
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath === "/admin/client-categories" ||
                currentPath === "/admin/add-client-category" ||
                currentPath === "/admin/manage-client-category" ||
                currentPath.includes("/admin/edit-client-category")
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/admin/client-categories" ||
                  currentPath === "/admin/add-client-category" ||
                  currentPath === "/admin/manage-client-category" ||
                  currentPath.includes("/admin/edit-client-category")
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath === "/admin/client-categories" ||
                  currentPath === "/admin/add-client-category" ||
                  currentPath === "/admin/manage-client-category" ||
                  currentPath.includes("/admin/edit-client-category")
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <CategoryRounded
                sx={{
                  color:
                    currentPath === "/admin/client-categories" ||
                    currentPath === "/admin/add-client-category" ||
                    currentPath === "/admin/manage-client-category" ||
                    currentPath.includes("/admin/edit-client-category")
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Manage Categories" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/admin/clients")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/admin/clients" ||
                currentPath === "/admin/add-clients" ||
                currentPath === "/admin/manage-clients" ||
                currentPath.includes("/admin/edit-clients") ||
                currentPath.includes("/admin/clients")
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath === "/admin/clients" ||
                currentPath === "/admin/add-clients" ||
                currentPath === "/admin/manage-clients" ||
                currentPath.includes("/admin/edit-clients") ||
                currentPath.includes("/admin/clients")
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/admin/clients" ||
                  currentPath === "/admin/add-clients" ||
                  currentPath === "/admin/manage-clients" ||
                  currentPath.includes("/admin/edit-clients") ||
                  currentPath.includes("/admin/clients")
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath === "/admin/clients" ||
                  currentPath === "/admin/add-clients" ||
                  currentPath === "/admin/manage-clients" ||
                  currentPath.includes("/admin/edit-clients") ||
                  currentPath.includes("/admin/clients")
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <GroupsRounded
                sx={{
                  color:
                    currentPath === "/admin/clients" ||
                    currentPath === "/admin/add-clients" ||
                    currentPath === "/admin/manage-clients" ||
                    currentPath.includes("/admin/edit-clients") ||
                    currentPath.includes("/admin/clients")
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Manage Clients" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

export default ClientAccordion;
