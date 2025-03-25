import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Box, Container, CssBaseline } from "@mui/material";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => setActivities(response.data));
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  return (
    <Fragment>
      <Box sx={{ bgcolor: "#d9d8d7" }}>
        <CssBaseline />
        <NavBar />
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <ActivityDashboard
            handleSelectActivity={handleSelectActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            activities={activities}
          />
        </Container>
      </Box>
    </Fragment>
  );
}

export default App;
