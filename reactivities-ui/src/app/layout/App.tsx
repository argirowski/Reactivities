import { Fragment } from "react";
import NavBar from "./NavBar";
import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Box sx={{ bgcolor: "#d9d8d7", minHeight: "100vh" }}>
        <CssBaseline />
        <NavBar />
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Fragment>
  );
}

export default App;
