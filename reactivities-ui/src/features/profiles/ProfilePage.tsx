import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "../../lib/hooks/useProfile";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";

const ProfilePage = () => {
  const { id } = useParams();
  const { profile, loadingProfile } = useProfile(id);

  if (loadingProfile) return <Typography>Loading profile...</Typography>;

  if (!profile) return <Typography>Profile not found</Typography>;
  return (
    <Fragment>
      <Grid2 container>
        <Grid2 xs={12}>
          <ProfileHeader />
          <ProfileContent />
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default ProfilePage;
