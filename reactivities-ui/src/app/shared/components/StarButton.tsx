import { Star, StarBorder } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Fragment } from "react";

type StarButtonProps = {
  selected: boolean;
};

const StarButton = ({ selected }: StarButtonProps) => {
  return (
    <Fragment>
      <Box position="relative">
        <Button
          sx={{
            opacity: 0.8,
            transition: "opacity 0.3s",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <StarBorder
            sx={{ fontSize: 32, color: "white", position: "absolute" }}
          />
          <Star
            sx={{
              fontSize: 28,
              color: selected ? "yellow" : "rgba(0,0,0,0.5)",
            }}
          />
        </Button>
      </Box>
    </Fragment>
  );
};

export default StarButton;
