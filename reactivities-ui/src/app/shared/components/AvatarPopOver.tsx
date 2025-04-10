import { Popover, Avatar } from "@mui/material";
import { Fragment, useState } from "react";
import ProfileCard from "../../../features/profiles/ProfileCard";
import { Link } from "react-router-dom";

type AvatarPopOverProps = {
  attendeeProfile: AttendeeProfile;
};

const AvatarPopOver = ({ attendeeProfile }: AvatarPopOverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Fragment>
      <Avatar
        alt={attendeeProfile.displayName + " image"}
        src={attendeeProfile.imageUrl}
        sx={{
          border: attendeeProfile.following ? 3 : 0,
          borderColor: "secondary.main",
        }}
        component={Link}
        to={`/profiles/${attendeeProfile.id}`}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <ProfileCard attendeeProfile={attendeeProfile} />
      </Popover>
    </Fragment>
  );
};

export default AvatarPopOver;
