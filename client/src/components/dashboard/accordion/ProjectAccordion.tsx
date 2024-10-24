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
  CategoryRounded,
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
      currentPath === "/projects" ||
      currentPath === "/add-projects" ||
      currentPath === "/manage-projects" ||
      currentPath.includes("/edit-projects") ||
      currentPath === "/project-categories" ||
      currentPath === "/add-project-category" ||
      currentPath === "/manage-project-category" ||
      currentPath.includes("/edit-project-category")
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
            onClick={() => navigate("/project-categories")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/project-categories" ||
                currentPath === "/add-project-category" ||
                currentPath === "/manage-project-category" ||
                currentPath.includes("/edit-project-category")
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath === "/project-categories" ||
                currentPath === "/add-project-category" ||
                currentPath === "/manage-project-category" ||
                currentPath.includes("/edit-project-category")
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/project-categories" ||
                  currentPath === "/add-project-category" ||
                  currentPath === "/manage-project-category" ||
                  currentPath.includes("/edit-project-category")
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath === "/project-categories" ||
                  currentPath === "/add-project-category" ||
                  currentPath === "/manage-project-category" ||
                  currentPath.includes("/edit-project-category")
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <CategoryRounded
                sx={{
                  color:
                    currentPath === "/project-categories" ||
                    currentPath === "/add-project-category" ||
                    currentPath === "/manage-project-category" ||
                    currentPath.includes("/edit-project-category")
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Manage Categories" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/manage-projects")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/projects" ||
                currentPath === "/add-projects" ||
                currentPath === "/manage-projects" ||
                currentPath.includes("/edit-projects")
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath === "/projects" ||
                currentPath === "/add-projects" ||
                currentPath === "/manage-projects" ||
                currentPath.includes("/edit-projects")
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/projects" ||
                  currentPath === "/add-projects" ||
                  currentPath === "/manage-projects" ||
                  currentPath.includes("/edit-projects")
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath === "/projects" ||
                  currentPath === "/add-projects" ||
                  currentPath === "/manage-projects" ||
                  currentPath.includes("/edit-projects")
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
                    currentPath === "/add-projects" ||
                    currentPath === "/manage-projects" ||
                    currentPath.includes("/edit-projects")
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
