import { Grid2 } from "@mui/material";
import { Fragment } from "react";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

const ActivityDashboard = () => {
  return (
    <Fragment>
      <Grid2 container spacing={3}>
        <Grid2 size={8}>
          <ActivityList />
        </Grid2>
        <Grid2 size={4}>
          <ActivityFilters />
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default ActivityDashboard;
