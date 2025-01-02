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
      currentPath.includes("/admin/projects") ||
      currentPath === "/admin/add-projects" ||
      currentPath === "/admin/manage-projects" ||
      currentPath.includes("/admin/edit-projects") ||
      currentPath === "/admin/project-categories" ||
      currentPath === "/admin/add-project-category" ||
      currentPath === "/admin/manage-project-category" ||
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
            onClick={() => navigate("/admin/project-categories")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath === "/admin/project-categories" ||
                currentPath === "/admin/add-project-category" ||
                currentPath === "/admin/manage-project-category" ||
                currentPath.includes("/admin/edit-project-category")
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath === "/admin/project-categories" ||
                currentPath === "/admin/add-project-category" ||
                currentPath === "/admin/manage-project-category" ||
                currentPath.includes("/admin/edit-project-category")
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/admin/project-categories" ||
                  currentPath === "/admin/add-project-category" ||
                  currentPath === "/admin/manage-project-category" ||
                  currentPath.includes("/admin/edit-project-category")
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath === "/admin/project-categories" ||
                  currentPath === "/admin/add-project-category" ||
                  currentPath === "/admin/manage-project-category" ||
                  currentPath.includes("/admin/edit-project-category")
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <CategoryRounded
                sx={{
                  color:
                    currentPath === "/admin/project-categories" ||
                    currentPath === "/admin/add-project-category" ||
                    currentPath === "/admin/manage-project-category" ||
                    currentPath.includes("/admin/edit-project-category")
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Manage Categories" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/admin/projects")}
            sx={{
              pl: 8,
              backgroundColor:
                currentPath.includes("/admin/projects") ||
                currentPath === "/admin/add-projects" ||
                currentPath === "/admin/manage-projects" ||
                currentPath.includes("/admin/edit-projects")
                  ? "#4B49AC"
                  : "transparent",
              color:
                currentPath.includes("/admin/projects") ||
                currentPath === "/admin/add-projects" ||
                currentPath === "/admin/manage-projects" ||
                currentPath.includes("/admin/edit-projects")
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath.includes("/admin/projects") ||
                  currentPath === "/admin/add-projects" ||
                  currentPath === "/admin/manage-projects" ||
                  currentPath.includes("/admin/edit-projects")
                    ? "#4B49AC"
                    : "transparent",
                color:
                  currentPath.includes("/admin/projects") ||
                  currentPath === "/admin/add-projects" ||
                  currentPath === "/admin/manage-projects" ||
                  currentPath.includes("/admin/edit-projects")
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <DvrRounded
                sx={{
                  color:
                    currentPath.includes("/admin/projects") ||
                    currentPath === "/admin/add-projects" ||
                    currentPath === "/admin/manage-projects" ||
                    currentPath.includes("/admin/edit-projects")
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
