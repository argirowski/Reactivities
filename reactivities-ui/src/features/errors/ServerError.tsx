import { Divider, Paper, Typography } from "@mui/material";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";

type ServerErrorProps = {};

const ServerError = (props: ServerErrorProps) => {
  const { state } = useLocation();
  return (
    <Fragment>
      <Paper>
        {state.error ? (
          <Fragment>
            <Typography
              gutterBottom
              variant="h3"
              sx={{ px: 4, pt: 2 }}
              color="secondary"
            >
              {state.error.message || "There has been an error"}
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ p: 4 }}>
              {state.error.details || "Internal server error"}
            </Typography>
          </Fragment>
        ) : (
          <Typography variant="h5">Server Error</Typography>
        )}
      </Paper>
    </Fragment>
  );
};

export default ServerError;
