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

const TaskAccordion = () => {
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
    if (currentPath.includes("/tasks") || currentPath === "/manage-tasks") {
      setOpenTasks(true);
    } else {
      setOpenTasks(false);
    }
  }, [currentPath]);

  return (
    <div>
      <ListItemButton onClick={handleInventoryClick}>
        <ListItemIcon>
          <TaskAltRounded />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
        {openTasks ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openTasks} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            onClick={() => navigate("/manage-tasks")}
            sx={{
              pl: 4,
              backgroundColor:
                currentPath === "/tasks" || currentPath === "/manage-tasks"
                  ? "#5AC064"
                  : "transparent",
              color:
                currentPath === "/tasks" || currentPath === "/manage-tasks"
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/tasks" || currentPath === "/manage-tasks"
                    ? "#5AC064"
                    : "transparent",
                color:
                  currentPath === "/tasks" || currentPath === "/manage-tasks"
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <AddTaskRounded
                sx={{
                  color:
                    currentPath === "/tasks" || currentPath === "/manage-tasks"
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Manage Tasks" />
          </ListItemButton>
        </List>
      </Collapse>
    </div>
  );
};

export default TaskAccordion;
