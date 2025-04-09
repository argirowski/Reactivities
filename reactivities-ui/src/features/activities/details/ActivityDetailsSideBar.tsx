import {
  Avatar,
  Chip,
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

type ActivityDetailsSideBarProps = {
  activity: Activity;
};

const ActivityDetailsSideBar = ({ activity }: ActivityDetailsSideBarProps) => {
  const following = true;

  return (
    <Fragment>
      <Paper
        sx={{
          textAlign: "center",
          border: "none",
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
        }}
      >
        <Typography variant="h6">
          {activity.attendees.length} people are going
        </Typography>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        {activity.attendees.map((attendee) => (
          <Grid2 key={attendee.id} container alignItems="center">
            <Grid2 size={8}>
              <List sx={{ display: "flex", flexDirection: "column" }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={attendee.displayName + "imgage"}
                      src={attendee.imageUrl}
                      variant="rounded"
                      sx={{ width: 75, height: 75, mr: 3 }}
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography variant="h6">{attendee.displayName}</Typography>
                    {following && (
                      <Typography variant="body2" color="orange">
                        Following
                      </Typography>
                    )}
                  </ListItemText>
                </ListItem>
              </List>
            </Grid2>
            <Grid2
              size={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 1,
              }}
            >
              {activity.hostId === attendee.id && (
                <Chip
                  label="Host"
                  color="warning"
                  variant="filled"
                  sx={{ borderRadius: 2 }}
                />
              )}
            </Grid2>
          </Grid2>
        ))}
      </Paper>
    </Fragment>
  );
};

export default ActivityDetailsSideBar;
