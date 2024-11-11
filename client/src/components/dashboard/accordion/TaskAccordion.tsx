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
  TaskAltRounded,
  AddTaskRounded,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarCollapseType from "./Interface";

const TaskAccordion = ({ sidebarCollapsed }: SidebarCollapseType) => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // States
  const [openTasks, setOpenTasks] = useState(true);

  // Functions
  const handleInventoryClick = () => {
    setOpenTasks(!openTasks);
  };

  useEffect(() => {
    if (currentPath.includes("/tasks")) {
      setOpenTasks(true);
    } else {
      setOpenTasks(false);
    }
  }, [currentPath]);

  return (
    <>
      <ListItemButton onClick={handleInventoryClick}>
        <ListItemIcon>
          <TaskAltRounded
            sx={{
              transition: "all 0.5s ease",
              marginLeft: sidebarCollapsed ? "10px" : "20px",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
        {openTasks ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        className="transition-all ease-in duration-1000"
        in={openTasks}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          <ListItemButton
            onClick={() => navigate("/tasks")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/tasks" ? "#4B49AC" : "transparent",
              color: currentPath === "/tasks" ? "white" : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/tasks" ? "#4B49AC" : "transparent",
                color: currentPath === "/tasks" ? "white" : "black",
              },
            }}
          >
            <ListItemIcon>
              <AddTaskRounded
                sx={{
                  color: currentPath === "/tasks" ? "white" : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Manage Tasks" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
};

export default TaskAccordion;
