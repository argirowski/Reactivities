import { Box } from "@mui/material";
import { Fragment } from "react";
import ActivityCard from "../ActivityCard";

type ActivityListProps = {
  activities: Activity[];
  handleSelectActivity: (id: string) => void;
};

const ActivityList = ({
  activities,
  handleSelectActivity,
}: ActivityListProps) => {
  return (
    <Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            handleSelectActivity={handleSelectActivity}
          />
        ))}
      </Box>
    </Fragment>
  );
};

export default ActivityList;
