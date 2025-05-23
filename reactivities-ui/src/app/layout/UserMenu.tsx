import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Fragment, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAccount } from "../../lib/hooks/useAccount";
import { Link } from "react-router-dom";
import { Add, Logout, Password, Person } from "@mui/icons-material";

const UserMenu = () => {
  const { currentUser, logoutUser } = useAccount();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Button
        onClick={handleClick}
        color="inherit"
        size="large"
        sx={{ fontSize: "1.1rem" }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={currentUser?.imageUrl} alt="current user image" />
          {currentUser?.displayName}
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/add" onClick={handleClose}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>Add Activity</ListItemText>
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/profiles/${currentUser?.id}`}
          onClick={handleClose}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem
          component={Link}
          to={"/change-password"}
          onClick={handleClose}
        >
          <ListItemIcon>
            <Password />
          </ListItemIcon>
          <ListItemText>Change Password</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            logoutUser.mutate();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Log Out</ListItemText>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserMenu;
