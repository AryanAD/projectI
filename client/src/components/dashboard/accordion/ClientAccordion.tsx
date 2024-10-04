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
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const ClientAccordion = () => {
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
    if (currentPath.includes("/clients") || currentPath === "/manage-clients") {
      setOpenClients(true);
    } else {
      setOpenClients(false);
    }
  }, [currentPath]);

  return (
    <div>
      <ListItemButton onClick={handleInventoryClick}>
        <ListItemIcon>
          <EmojiPeopleRounded />
        </ListItemIcon>
        <ListItemText primary="Clients" />
        {openClients ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openClients} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            onClick={() => navigate("/manage-clients")}
            sx={{
              pl: 4,
              backgroundColor:
                currentPath === "/clients" || currentPath === "/manage-clients"
                  ? "#5AC064"
                  : "transparent",
              color:
                currentPath === "/clients" || currentPath === "/manage-clients"
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/clients" ||
                  currentPath === "/manage-clients"
                    ? "#5AC064"
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
    </div>
  );
};

export default ClientAccordion;
