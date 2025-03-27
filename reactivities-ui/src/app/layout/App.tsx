import { Fragment } from "react";
import NavBar from "./NavBar";
import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();
  return (
    <Fragment>
      <Box sx={{ bgcolor: "#d9d8d7", minHeight: "100vh" }}>
        <CssBaseline />
        {location.pathname === "/" ? (
          <HomePage />
        ) : (
          <Fragment>
            <NavBar />
            <Container maxWidth="xl" sx={{ mt: 3 }}>
              <Outlet />
            </Container>
          </Fragment>
        )}
      </Box>
    </Fragment>
  );
}

export default App;
