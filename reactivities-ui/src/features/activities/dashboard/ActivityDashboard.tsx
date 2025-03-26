import { Grid2 } from "@mui/material";
import { Fragment } from "react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type ActivityDashboardProps = {
  activities: Activity[];
  handleCancelSelectActivity: () => void;
  handleSelectActivity: (id: string) => void;
  selectedActivity?: Activity;
  handleOpenForm: (id: string) => void;
  handleCloseForm: () => void;
  editMode: boolean;
  handleDeleteActivity: (id: string) => void;
};

const ActivityDashboard = ({
  activities,
  handleCancelSelectActivity,
  handleSelectActivity,
  selectedActivity,
  handleOpenForm,
  handleCloseForm,
  editMode,
  handleDeleteActivity,
}: ActivityDashboardProps) => {
  return (
    <Fragment>
      <Grid2 container spacing={3}>
        <Grid2 size={7}>
          <ActivityList
            activities={activities}
            handleSelectActivity={handleSelectActivity}
            handleDeleteActivity={handleDeleteActivity}
          />
        </Grid2>
        <Grid2 size={5}>
          {selectedActivity && !editMode && (
            <ActivityDetails
              activity={selectedActivity}
              handleCancelSelectActivity={handleCancelSelectActivity}
              handleOpenForm={handleOpenForm}
            />
          )}
          {editMode && (
            <ActivityForm
              handleCloseForm={handleCloseForm}
              selectedActivity={selectedActivity}
            />
          )}
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default ActivityDashboard;
