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
  GroupAddRounded,
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
      currentPath.includes("/clients") ||
      currentPath === "/add-clients" ||
      currentPath === "/manage-clients"
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
            onClick={() => navigate("/add-clients")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/clients" || currentPath === "/add-clients"
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath === "/clients" || currentPath === "/add-clients"
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/clients" || currentPath === "/add-clients"
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath === "/clients" || currentPath === "/add-clients"
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <GroupAddRounded
                sx={{
                  color:
                    currentPath === "/clients" || currentPath === "/add-clients"
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Add Clients" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/manage-clients")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/clients" || currentPath === "/manage-clients"
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath === "/clients" || currentPath === "/manage-clients"
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/clients" ||
                  currentPath === "/manage-clients"
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath === "/clients" ||
                  currentPath === "/manage-clients"
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
                    currentPath === "/manage-clients"
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
