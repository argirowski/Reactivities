import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

type ActivityCardProps = {
  activity: Activity;
  handleSelectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
};

const ActivityCard = ({
  activity,
  handleSelectActivity,
  handleDeleteActivity,
}: ActivityCardProps) => {
  return (
    <Fragment>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5">{activity.title}</Typography>
          <Typography sx={{ color: "text.secondary", mb: 1 }}>
            {activity.date}
          </Typography>
          <Typography variant="body2">{activity.description}</Typography>
          <Typography variant="subtitle1">
            {activity.city} / {activity.venue}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
        >
          <Chip label={activity.category} variant="outlined" />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              size="medium"
              variant="contained"
              onClick={() => handleSelectActivity(activity.id)}
            >
              View
            </Button>
            <Button
              size="medium"
              variant="contained"
              onClick={() => handleDeleteActivity(activity.id)}
              color="error"
            >
              Delete
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default ActivityCard;
