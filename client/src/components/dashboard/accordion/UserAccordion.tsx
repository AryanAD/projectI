import { useEffect, useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Category,
  ExpandLess,
  ExpandMore,
  Groups,
  Inventory,
  ProductionQuantityLimits,
  Warehouse,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const UserAccordion = () => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // States
  const [openInventory, setOpenInventory] = useState(true);

  // Functions
  const handleInventoryClick = () => {
    setOpenInventory(!openInventory);
  };

  useEffect(() => {
    if (
      currentPath.startsWith("/users") ||
      currentPath === "/add-product" ||
      currentPath === "/add-existing-product" ||
      currentPath === "/products/pay-credit" ||
      currentPath.startsWith("/customer") ||
      currentPath === "/add-suppliers" ||
      currentPath.startsWith("/suppliers") ||
      currentPath === "/category" ||
      currentPath === "/add-suppliers" ||
      currentPath === "/add-category"
    ) {
      setOpenInventory(true);
    } else {
      setOpenInventory(false);
    }
  }, [currentPath]);

  return (
    <div>
      <ListItemButton onClick={handleInventoryClick}>
        <ListItemIcon>
          <Inventory />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
        {openInventory ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openInventory} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            onClick={() => navigate("/category")}
            sx={{
              pl: 4,
              backgroundColor:
                currentPath === "/category" || currentPath === "/add-category"
                  ? "#5AC064"
                  : "transparent",
              color:
                currentPath === "/category" || currentPath === "/add-category"
                  ? "white"
                  : "black",
              "&:hover": {
                backgroundColor:
                  currentPath === "/category" || currentPath === "/add-category"
                    ? "#5AC064"
                    : "transparent",
                color:
                  currentPath === "/category" || currentPath === "/add-category"
                    ? "white"
                    : "black",
              },
            }}
          >
            <ListItemIcon>
              <Category
                sx={{
                  color:
                    currentPath === "/category" ||
                    currentPath === "/add-category"
                      ? "white"
                      : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/products")}
            sx={{
              pl: 4,
              backgroundColor: currentPath.includes("product")
                ? "#5AC064"
                : "transparent",
              color: currentPath.includes("product") ? "white" : "black",
              "&:hover": {
                backgroundColor: currentPath.includes("product")
                  ? "#5AC064"
                  : "transparent",
                color: currentPath.includes("product") ? "white" : "black",
              },
            }}
          >
            <ListItemIcon>
              <ProductionQuantityLimits
                sx={{
                  color: currentPath.includes("product") ? "white" : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigate("/suppliers")}
            sx={{
              pl: 4,
              backgroundColor: currentPath.includes("suppliers")
                ? "#5AC064"
                : "transparent",
              color: currentPath.includes("suppliers") ? "white" : "black",
              "&:hover": {
                backgroundColor: currentPath.includes("suppliers")
                  ? "#5AC064"
                  : "transparent",
                color: currentPath.includes("suppliers") ? "white" : "black",
              },
            }}
          >
            <ListItemIcon>
              <Warehouse
                sx={{
                  color: currentPath.includes("suppliers") ? "white" : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Suppliers" />
          </ListItemButton>
          <ListItemButton
            onClick={() => navigate("/customer")}
            sx={{
              pl: 4,
              backgroundColor: currentPath.includes("customer")
                ? "#5AC064"
                : "transparent",
              color: currentPath.includes("customer") ? "white" : "black",
              "&:hover": {
                backgroundColor: currentPath.includes("customer")
                  ? "#5AC064"
                  : "transparent",
                color: currentPath.includes("customer") ? "white" : "black",
              },
            }}
          >
            <ListItemIcon>
              <Groups
                sx={{
                  color: currentPath.includes("customer") ? "white" : "",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Customer" />
          </ListItemButton>
        </List>
      </Collapse>
    </div>
  );
};

export default UserAccordion;
