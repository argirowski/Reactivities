import { Fragment } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import { Group } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";

const NavBar = () => {
  const { uiStore } = useStore();

  return (
    <Fragment>
      <Fragment>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{
              backgroundImage:
                "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
              position: "relative",
            }}
          >
            <Container maxWidth="xl">
              <Toolbar
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <MenuItem
                    component={NavLink}
                    to="/"
                    sx={{ display: "flex", gap: 2 }}
                  >
                    <Group fontSize="large" />
                    <Typography variant="h4" fontWeight="bold">
                      Reactivities
                    </Typography>
                  </MenuItem>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <MenuItemLink to="/activities">Activities</MenuItemLink>
                  <MenuItemLink to="/add">Create Activity</MenuItemLink>
                  <MenuItemLink to="/counter">Counter</MenuItemLink>
                  <MenuItemLink to="/errors">Errors</MenuItemLink>
                </Box>
                <MenuItem
                  sx={{
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  User Menu Placeholder
                </MenuItem>
              </Toolbar>
            </Container>
            <Observer>
              {() =>
                uiStore.isLoading ? (
                  <LinearProgress
                    color="secondary"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                    }}
                  />
                ) : null
              }
            </Observer>
          </AppBar>
        </Box>
      </Fragment>
      ;
    </Fragment>
  );
};

export default NavBar;
