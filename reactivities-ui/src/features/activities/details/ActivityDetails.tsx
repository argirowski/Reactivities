import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

type ActivityDetailsProps = {
  activity: Activity;
  handleCancelSelectActivity: () => void;
};

const ActivityDetails = ({
  activity,
  handleCancelSelectActivity,
}: ActivityDetailsProps) => {
  return (
    <Fragment>
      <Card sx={{ borderRadius: 3 }}>
        <CardMedia
          component="img"
          src={`/images/categoryImages/${activity.category}.jpg`}
        />
        <CardContent>
          <Typography variant="h5">{activity.title}</Typography>
          <Typography variant="subtitle1" fontWeight="light">
            {activity.date}
          </Typography>
          <Typography variant="body1">{activity.description}</Typography>
        </CardContent>
        <CardActions>
          <Button color="primary">Edit</Button>
          <Button color="inherit" onClick={handleCancelSelectActivity}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default ActivityDetails;
