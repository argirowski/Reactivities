import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSideBar from "./ActivityDetailsSideBar";
import ActivityDetailsHeader from "./ActivityDetailsHeader";

const ActivityDetailsPage = () => {
  const { id } = useParams();
  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <Typography>Loading ...</Typography>;

  if (!activity) return <Typography>Activity Not Found</Typography>;

  return (
    <Fragment>
      <Grid2 container spacing={3}>
        <Grid2 xs={8}>
          <ActivityDetailsHeader activity={activity} />
          <ActivityDetailsInfo activity={activity} />
          <ActivityDetailsChat />
        </Grid2>
        <Grid2 xs={4}>
          <ActivityDetailsSideBar activity={activity} />
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default ActivityDetailsPage;
