import { Box, Button, Divider, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import { useParams } from "react-router-dom";
import { useProfile } from "../../lib/hooks/useProfile";

const ProfileAbout = () => {
  const { id } = useParams();
  const { profile, isCurrentUser } = useProfile(id);
  const [editMode, setEditMode] = useState(false);

  return (
    <Fragment>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">About {profile?.displayName}</Typography>
          {isCurrentUser && (
            <Button onClick={() => setEditMode(!editMode)}>Edit profile</Button>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ overflow: "auto", maxHeight: 350 }}>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {profile?.bio || "No description added yet"}
          </Typography>
          {editMode && <ProfileEditForm setEditMode={setEditMode} />}
        </Box>
      </Box>
    </Fragment>
  );
};

export default ProfileAbout;
