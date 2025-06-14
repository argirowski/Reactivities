import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Fragment, useState } from "react";
import { formattedDate } from "../../../lib/utils/utils";
import MapComponent from "../../../app/shared/components/MapComponent";

type ActivityDetailsInfoProps = {
  activity: Activity;
};

const ActivityDetailsInfo = ({ activity }: ActivityDetailsInfoProps) => {
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <Fragment>
      <Paper sx={{ mb: 2 }}>
        <Grid2 container alignItems="center" pl={2} py={1}>
          <Grid2 xs={1}>
            <Info color="info" fontSize="large" />
          </Grid2>
          <Grid2 xs={11}>
            <Typography>{activity.description}</Typography>
          </Grid2>
        </Grid2>
        <Divider />
        <Grid2 container alignItems="center" pl={2} py={1}>
          <Grid2 xs={1}>
            <CalendarToday color="info" fontSize="large" />
          </Grid2>
          <Grid2 xs={11}>
            <Typography> {formattedDate(activity.date)}</Typography>
          </Grid2>
        </Grid2>
        <Divider />

        <Grid2 container alignItems="center" pl={2} py={1}>
          <Grid2 xs={1}>
            <Place color="info" fontSize="large" />
          </Grid2>
          <Grid2
            xs={11}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>
              {activity.venue}, {activity.city}
            </Typography>
            <Button
              onClick={() => setMapOpen(!mapOpen)}
              sx={{ whiteSpace: "nowrap", mx: 2 }}
            >
              {mapOpen ? "Hide Map" : "Show Map"}
            </Button>
          </Grid2>
        </Grid2>
        {mapOpen && (
          <Box sx={{ height: 400, zIndex: 1000, display: "block" }}>
            <MapComponent
              position={[activity.latitude, activity.longitude]}
              venue={activity.venue}
            />
          </Box>
        )}
      </Paper>
    </Fragment>
  );
};

export default ActivityDetailsInfo;
