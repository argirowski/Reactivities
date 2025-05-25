import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Fragment } from "react";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

const ActivityDashboard = () => {
  return (
    <Fragment>
      <Grid2 container spacing={3}>
        <Grid2 xs={8}>
          <ActivityList />
        </Grid2>
        <Grid2
          xs={4}
          sx={{ position: "sticky", top: 112, alignSelf: "flex-start" }}
        >
          <ActivityFilters />
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default ActivityDashboard;
