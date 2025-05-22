import { Fragment } from "react";
import { useAccount } from "../../lib/hooks/useAccount";
import { Button, Paper, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

type RegisterSuccessProps = {
  email?: string;
};
const RegisterSuccess = ({ email }: RegisterSuccessProps) => {
  const { resendConfirmationEmail } = useAccount();
  if (!email) {
    return null;
  }
  return (
    <Fragment>
      <Paper
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
        }}
      >
        <Check sx={{ fontSize: 100 }} color="primary" />
        <Typography gutterBottom variant="h3">
          You have successfully registered!
        </Typography>
        <Typography gutterBottom variant="h3">
          Please check your email to confirm your account.
        </Typography>
        <Button onClick={() => resendConfirmationEmail.mutate({ email })}>
          Resend Confirmation Email
        </Button>
      </Paper>
    </Fragment>
  );
};

export default RegisterSuccess;
