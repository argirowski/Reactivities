import { Box } from "@mui/material";
import { Fragment } from "react";
import ActivityCard from "../ActivityCard";

type ActivityListProps = {
  activities: Activity[];
  handleSelectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
};

const ActivityList = ({
  activities,
  handleSelectActivity,
  handleDeleteActivity,
}: ActivityListProps) => {
  return (
    <Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            handleSelectActivity={handleSelectActivity}
            handleDeleteActivity={handleDeleteActivity}
          />
        ))}
      </Box>
    </Fragment>
  );
};

export default ActivityList;
