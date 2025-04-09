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
import { profile } from "console";
import { Fragment } from "react";
import { Link } from "react-router-dom";

type ProfileCardProps = {
  attendeeProfile: AttendeeProfile;
};

const ProfileCard = ({ attendeeProfile }: ProfileCardProps) => {
  const following = false; // Placeholder for following state
  return (
    <Fragment>
      <Link
        to={`/profile/${attendeeProfile.id}`}
        style={{ textDecoration: "none" }}
      >
        <Card
          sx={{ p: 3, maxWidth: 300, textDecoration: "none", borderRadius: 3 }}
          elevation={3}
        >
          <CardMedia
            component="img"
            src={attendeeProfile.imageUrl || "/images/user.png"}
            alt={attendeeProfile.displayName}
            sx={{
              width: "100%",
              zIndex: 50,
            }}
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
              {following && (
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
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Person />
            <Typography sx={{ ml: 1 }}>300 Followers</Typography>
          </Box>
        </Card>
      </Link>
    </Fragment>
  );
};

export default ProfileCard;
