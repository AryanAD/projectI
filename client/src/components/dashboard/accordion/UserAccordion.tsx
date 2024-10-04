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

const UserAccordion = () => {
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
    if (currentPath.includes("/users") || currentPath === "/manage-users") {
      setOpenUsers(true);
    } else {
      setOpenUsers(false);
    }
  }, [currentPath]);

  return (
    <div>
      <ListItemButton onClick={handleInventoryClick}>
        <ListItemIcon>
          <PersonRounded />
        </ListItemIcon>
        <ListItemText primary="Users" />
        {openUsers ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openUsers} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            onClick={() => navigate("/manage-users")}
            sx={{
              pl: 4,
              backgroundColor:
                currentPath === "/users" || currentPath === "/manage-users"
                  ? "#5AC064"
                  : "transparent",
              color:
                currentPath === "/users" || currentPath === "/manage-users"
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/users" || currentPath === "/manage-users"
                    ? "#5AC064"
                    : "transparent",
                color:
                  currentPath === "/users" || currentPath === "/manage-users"
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <PeopleRounded
                sx={{
                  color:
                    currentPath === "/users" || currentPath === "/manage-users"
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>
        </List>
      </Collapse>
    </div>
  );
};

export default UserAccordion;
