import { AccessTime, Place } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { formattedDate } from "../../lib/utils/utils";

type ActivityCardProps = {
  activity: Activity;
};

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const isHost = false;
  const isGoing = false;
  const label = isHost ? "You are hosting" : "You are going";
  const isCancelled = false;
  const color = isHost ? "secondary" : isGoing ? "warning" : "default";

  return (
    <Fragment>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <CardHeader
            title={activity.title}
            sx={{ fontWeight: "bold", fontSize: 20 }}
            subheader={
              <Fragment>
                Hosted By <Link to={`/profiles/bob`}></Link>
              </Fragment>
            }
            avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          />
          <Box display="flex" flexDirection="column" gap={2} mr={2}>
            {(isHost || isGoing) && (
              <Chip label={label} color={color} sx={{ borderRadius: 2 }} />
            )}

            {isCancelled && (
              <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />
            )}
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <CardContent sx={{ p: 0 }}>
          <Box display="flex" alignItems="center" mb={2} px={2}>
            <Box display="flex" flexGrow={0} alignItems="center">
              <AccessTime sx={{ mr: 1 }} />
              <Typography variant="body2" noWrap>
                {formattedDate(activity.date)}
              </Typography>
            </Box>
            <Place sx={{ ml: 2, mr: 1 }} />
            <Typography variant="body2">{activity.venue}</Typography>
          </Box>
          <Divider />
          <Box
            display="flex"
            sx={{ backgroundColor: "grey.200", py: 3, pl: 3 }}
            flexDirection="column"
            gap={2}
          >
            Attendees go here
          </Box>
        </CardContent>
        <CardContent sx={{ pb: 2 }}>
          <Typography variant="body2">{activity.description}</Typography>

          <Button
            size="medium"
            variant="contained"
            component={Link}
            to={`/activities/${activity.id}`}
            sx={{ display: "flex", justifySelf: "self-end", borderRadius: 3 }}
          >
            View
          </Button>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ActivityCard;
