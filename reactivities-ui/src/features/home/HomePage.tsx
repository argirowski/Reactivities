import { Container, Typography } from "@mui/material";
import { Fragment } from "react";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Fragment>
      <Container sx={{ mt: 3 }}>
        <Typography variant="h3">Home Page</Typography>
      </Container>
    </Fragment>
  );
};

export default HomePage;
