import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import ActivityCard from "../ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";

const ActivityList = () => {
  const { activities, isPending } = useActivities();

  if (!activities || isPending) return <Typography>Loading...</Typography>;

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </Box>
    </Fragment>
  );
};

export default ActivityList;
