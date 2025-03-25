import { Grid2 } from "@mui/material";
import { Fragment } from "react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";

type ActivityDashboardProps = {
  activities: Activity[];
  handleCancelSelectActivity: () => void;
  handleSelectActivity: (id: string) => void;
  selectedActivity?: Activity;
};

const ActivityDashboard = ({
  activities,
  handleCancelSelectActivity,
  handleSelectActivity,
  selectedActivity,
}: ActivityDashboardProps) => {
  return (
    <Fragment>
      <Grid2 container spacing={3}>
        <Grid2 size={7}>
          <ActivityList
            activities={activities}
            handleSelectActivity={handleSelectActivity}
          />
        </Grid2>
        <Grid2 size={5}>
          {selectedActivity && (
            <ActivityDetails
              activity={selectedActivity}
              handleCancelSelectActivity={handleCancelSelectActivity}
            />
          )}
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default ActivityDashboard;
