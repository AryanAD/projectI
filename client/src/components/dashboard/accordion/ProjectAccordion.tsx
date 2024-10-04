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
  CodeRounded,
  DvrRounded,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const ProjectAccordion = () => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // States
  const [openProjects, setOpenProjects] = useState(true);

  // Functions
  const handleInventoryClick = () => {
    setOpenProjects(!openProjects);
  };

  useEffect(() => {
    if (
      currentPath.includes("/projects") ||
      currentPath === "/manage-projects"
    ) {
      setOpenProjects(true);
    } else {
      setOpenProjects(false);
    }
  }, [currentPath]);

  return (
    <div>
      <ListItemButton onClick={handleInventoryClick}>
        <ListItemIcon>
          <CodeRounded />
        </ListItemIcon>
        <ListItemText primary="Projects" />
        {openProjects ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProjects} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            onClick={() => navigate("/manage-projects")}
            sx={{
              pl: 4,
              backgroundColor:
                currentPath === "/projects" ||
                currentPath === "/manage-projects"
                  ? "#5AC064"
                  : "transparent",
              color:
                currentPath === "/projects" ||
                currentPath === "/manage-projects"
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/projects" ||
                  currentPath === "/manage-projects"
                    ? "#5AC064"
                    : "transparent",
                color:
                  currentPath === "/projects" ||
                  currentPath === "/manage-projects"
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <DvrRounded
                sx={{
                  color:
                    currentPath === "/projects" ||
                    currentPath === "/manage-projects"
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Manage Projects" />
          </ListItemButton>
        </List>
      </Collapse>
    </div>
  );
};

export default ProjectAccordion;
