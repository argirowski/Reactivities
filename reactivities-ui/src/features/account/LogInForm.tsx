import { Fragment } from "react";
import { useAccount } from "../../lib/hooks/useAccount";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextCustomInput from "../../app/shared/components/TextCustomInput";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LogInForm = () => {
  const { loginUser } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || "/activities");
      },
    });
  };
  return (
    <Fragment>
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 3,
          gap: 3,
          maxWidth: "md",
          mx: "auto",
          borderRadius: 3,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={3}
          color="secondary.main"
        >
          <LockOpen fontSize="large" />
          <Typography variant="h4">Sign In</Typography>
        </Box>
        <TextCustomInput label="Email" name="email" control={control} />
        <TextCustomInput
          type="password"
          label="Password"
          name="password"
          control={control}
        />
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          variant="contained"
          size="large"
        >
          Login
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Don't have an account?
          <Typography
            sx={{ ml: 1 }}
            component={Link}
            to="/register"
            color="primary"
          >
            Sign Up
          </Typography>
        </Typography>
      </Paper>
    </Fragment>
  );
};

export default LogInForm;
