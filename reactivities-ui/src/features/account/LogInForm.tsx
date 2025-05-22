import { Fragment, useState } from "react";
import { useAccount } from "../../lib/hooks/useAccount";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { GitHub, LockOpen } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextCustomInput from "../../app/shared/components/TextCustomInput";
import { toast } from "react-toastify";

const LogInForm = () => {
  const [notVerified, setNotVerified] = useState(false);
  const { loginUser, resendConfirmationEmail } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const email = watch("email");

  const handleResendEmail = async () => {
    try {
      await resendConfirmationEmail.mutateAsync({ email });
      setNotVerified(false);
    } catch (error) {
      console.log(error);
      toast.error("Problem sending email - please check email address");
    }
  };

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || "/activities");
      },
      onError: (error) => {
        if (error.message === "NotAllowed") {
          setNotVerified(true);
        }
      },
    });
  };

  const loginWithGithub = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirectUri=${redirectUrl}&scope=read:user user:email`;
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
          <Typography variant="h4">Sign in</Typography>
        </Box>
        <TextCustomInput label="Email" control={control} name="email" />
        <TextCustomInput
          label="Password"
          type="password"
          control={control}
          name="password"
        />
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          variant="contained"
          size="large"
        >
          Login
        </Button>
        <Button
          onClick={loginWithGithub}
          startIcon={<GitHub />}
          sx={{ backgroundColor: "black" }}
          type="button"
          variant="contained"
          size="large"
        >
          Login with Github
        </Button>

        {notVerified ? (
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography textAlign="center" color="error">
              Your email has not been verified. You can click the button to
              re-send the verification email
            </Typography>
            <Button
              disabled={resendConfirmationEmail.isPending}
              onClick={handleResendEmail}
            >
              Re-send email link
            </Button>
          </Box>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={3}
          >
            <Typography>
              Forgot password? Click <Link to="/forgot-password">here</Link>
            </Typography>

            <Typography sx={{ textAlign: "center" }}>
              Don't have an account?
              <Typography
                sx={{ ml: 2 }}
                component={Link}
                to="/register"
                color="primary"
              >
                Sign up
              </Typography>
            </Typography>
          </Box>
        )}
      </Paper>
    </Fragment>
  );
};

export default LogInForm;
