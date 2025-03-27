import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useActivities } from "../../../lib/hooks/useActivities";

const ActivityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <Typography>Loading ...</Typography>;

  if (!activity) return <Typography>Activity Not Found</Typography>;

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
          <Button component={Link} to={`/edit/${activity.id} `} color="primary">
            Edit
          </Button>
          <Button color="inherit" onClick={() => navigate("/activities")}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default ActivityDetails;
