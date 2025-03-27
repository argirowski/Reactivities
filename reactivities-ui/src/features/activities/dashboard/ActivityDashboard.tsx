import { Grid2 } from "@mui/material";
import { Fragment } from "react";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
  return (
    <Fragment>
      <Grid2 container spacing={3}>
        <Grid2 size={7}>
          <ActivityList />
        </Grid2>
        <Grid2 size={5}>Activity Filters go here</Grid2>
      </Grid2>
    </Fragment>
  );
};

export default ActivityDashboard;
