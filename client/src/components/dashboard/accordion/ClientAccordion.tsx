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
      currentPath === "/client-categories" ||
      currentPath === "/add-client-category" ||
      currentPath === "/manage-client-category" ||
      currentPath.includes("/edit-client-category") ||
      currentPath === "/clients" ||
      currentPath === "/add-clients" ||
      currentPath === "/manage-clients" ||
      currentPath.includes("/edit-client") ||
      currentPath.includes("/clients")
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
            onClick={() => navigate("/client-categories")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/client-categories" ||
                currentPath === "/add-client-category" ||
                currentPath === "/manage-client-category" ||
                currentPath.includes("/edit-client-category")
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath === "/client-categories" ||
                currentPath === "/add-client-category" ||
                currentPath === "/manage-client-category" ||
                currentPath.includes("/edit-client-category")
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/client-categories" ||
                  currentPath === "/add-client-category" ||
                  currentPath === "/manage-client-category" ||
                  currentPath.includes("/edit-client-category")
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath === "/client-categories" ||
                  currentPath === "/add-client-category" ||
                  currentPath === "/manage-client-category" ||
                  currentPath.includes("/edit-client-category")
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <CategoryRounded
                sx={{
                  color:
                    currentPath === "/client-categories" ||
                    currentPath === "/add-client-category" ||
                    currentPath === "/manage-client-category" ||
                    currentPath.includes("/edit-client-category")
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Manage Categories" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/clients")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/clients" ||
                currentPath === "/add-clients" ||
                currentPath === "/manage-clients" ||
                currentPath.includes("/edit-client") ||
                currentPath.includes("/clients")
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath === "/clients" ||
                currentPath === "/add-clients" ||
                currentPath === "/manage-clients" ||
                currentPath.includes("/edit-client") ||
                currentPath.includes("/clients")
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/clients" ||
                  currentPath === "/add-clients" ||
                  currentPath === "/manage-clients" ||
                  currentPath.includes("/edit-client") ||
                  currentPath.includes("/clients")
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath === "/clients" ||
                  currentPath === "/add-clients" ||
                  currentPath === "/manage-clients" ||
                  currentPath.includes("/edit-client") ||
                  currentPath.includes("/clients")
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <GroupsRounded
                sx={{
                  color:
                    currentPath === "/clients" ||
                    currentPath === "/add-clients" ||
                    currentPath === "/manage-clients" ||
                    currentPath.includes("/edit-client") ||
                    currentPath.includes("/clients")
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
