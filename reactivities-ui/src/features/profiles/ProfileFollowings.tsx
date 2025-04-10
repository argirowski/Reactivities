import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Typography, Divider } from "@mui/material";
import ProfileCard from "./ProfileCard";

type ProfileFollowingsProps = { activeTab: number };

const ProfileFollowings = ({ activeTab }: ProfileFollowingsProps) => {
  const { id } = useParams();
  const predicate = activeTab === 3 ? "followers" : "followings";
  const { profile, followings, loadingFollowings } = useProfile(id, predicate);

  return (
    <Fragment>
      <Box>
        <Box display="flex">
          <Typography variant="h5">
            {activeTab === 3
              ? `People following ${profile?.displayName}`
              : `People ${profile?.displayName} is following`}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        {loadingFollowings ? (
          <Typography>Loading...</Typography>
        ) : (
          <Box display="flex" marginTop={3} gap={3}>
            {followings?.length === 0 && (
              <Typography variant="h6" color="text.secondary">
                No followings yet.
              </Typography>
            )}
            {followings?.map((profile) => (
              <ProfileCard key={profile.id} attendeeProfile={profile} />
            ))}
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export default ProfileFollowings;
