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
  PostAddRounded,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarCollapseType from "./Interface";

const ProjectAccordion = ({ sidebarCollapsed }: SidebarCollapseType) => {
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
      currentPath === "/add-projects" ||
      currentPath === "/manage-projects"
    ) {
      setOpenProjects(true);
    } else {
      setOpenProjects(false);
    }
  }, [currentPath]);

  return (
    <>
      <ListItemButton onClick={handleInventoryClick}>
        <ListItemIcon>
          <CodeRounded
            sx={{
              transition: "all 0.5s ease",
              marginLeft: sidebarCollapsed ? "10px" : "20px",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Projects" />
        {openProjects ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProjects} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            onClick={() => navigate("/add-projects")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/projects" || currentPath === "/add-projects"
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath === "/projects" || currentPath === "/add-projects"
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/projects" || currentPath === "/add-projects"
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath === "/projects" || currentPath === "/add-projects"
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <PostAddRounded
                sx={{
                  color:
                    currentPath === "/projects" ||
                    currentPath === "/add-projects"
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Add Projects" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/manage-projects")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/projects" ||
                currentPath === "/manage-projects"
                  ? "#4B49AC"
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
                    ? "#4B49AC"
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
    </>
  );
};

export default ProjectAccordion;
