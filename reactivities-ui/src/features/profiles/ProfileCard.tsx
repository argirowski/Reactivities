import { Person } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";

type ProfileCardProps = {
  attendeeProfile: AttendeeProfile;
};

const ProfileCard = ({ attendeeProfile }: ProfileCardProps) => {
  return (
    <Fragment>
      <Link
        to={`/profiles/${attendeeProfile.id}`}
        style={{ textDecoration: "none" }}
      >
        <Card
          sx={{
            borderRadius: 3,
            p: 3,
            maxWidth: 250,
            textDecoration: "none",
          }}
          elevation={4}
        >
          <CardMedia
            component="img"
            src={attendeeProfile?.imageUrl || "/images/user.png"}
            sx={{ width: "100%", zIndex: 50 }}
            alt={attendeeProfile.displayName + " image"}
          />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="h5">
                {attendeeProfile.displayName}
              </Typography>
              {attendeeProfile.bio && (
                <Typography
                  variant="body2"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {attendeeProfile.bio}
                </Typography>
              )}

              {attendeeProfile.following && (
                <Chip
                  size="small"
                  label="Following"
                  color="secondary"
                  variant="outlined"
                />
              )}
            </Box>
          </CardContent>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Person />
            <Typography sx={{ ml: 1 }}>
              {attendeeProfile.followersCount} Followers
            </Typography>
          </Box>
        </Card>
      </Link>
    </Fragment>
  );
};

export default ProfileCard;
