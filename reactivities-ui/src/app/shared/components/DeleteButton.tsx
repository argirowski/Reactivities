import { DeleteOutline, Delete } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Fragment } from "react/jsx-runtime";

const DeleteButton = () => {
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
          <DeleteOutline
            sx={{ fontSize: 32, color: "white", position: "absolute" }}
          />
          <Delete
            sx={{
              fontSize: 28,
              color: "red",
            }}
          />
        </Button>
      </Box>
    </Fragment>
  );
};

export default DeleteButton;
