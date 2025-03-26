import { Fragment, useState } from "react";
import NavBar from "./NavBar";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    // setActivities(activities.filter((x) => x.id !== id));
  };

  return (
    <Fragment>
      <Box sx={{ bgcolor: "#d9d8d7", minHeight: "100vh" }}>
        <CssBaseline />
        <NavBar handleOpenForm={handleOpenForm} />
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          {!activities || isPending ? (
            <Typography variant="h1">Loading...</Typography>
          ) : (
            <ActivityDashboard
              handleSelectActivity={handleSelectActivity}
              handleCancelSelectActivity={handleCancelSelectActivity}
              selectedActivity={selectedActivity}
              activities={activities}
              editMode={editMode}
              handleOpenForm={handleOpenForm}
              handleCloseForm={handleCloseForm}
              handleDeleteActivity={handleDeleteActivity}
            />
          )}
        </Container>
      </Box>
    </Fragment>
  );
}

export default App;
