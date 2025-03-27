import { MenuItem } from "@mui/material";
import { Fragment, ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: ReactNode;
  to: string;
};

const MenuItemLink = ({ children, to }: Props) => {
  return (
    <Fragment>
      <MenuItem
        component={NavLink}
        to={to}
        sx={{
          fontSize: "1.2rem",
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "inherit",
          "&.active": {
            color: "#f5b400",
          },
        }}
      >
        {children}
      </MenuItem>
    </Fragment>
  );
};

export default MenuItemLink;
