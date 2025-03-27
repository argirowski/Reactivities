import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Fragment>
      <Paper
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
        }}
      >
        <SearchOff sx={{ fontSize: 100, color: "primary" }} />
        <Typography variant="h3" gutterBottom>
          We could not find what you are looking for
        </Typography>
        <Button fullWidth component={Link} to="/activities">
          Return to the Activities Page
        </Button>
      </Paper>
    </Fragment>
  );
};

export default NotFound;
