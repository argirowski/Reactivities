import { Fragment, useState } from "react";
import { useAccount } from "../../lib/hooks/useAccount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextCustomInput from "../../app/shared/components/TextCustomInput";
import { Link } from "react-router-dom";
import {
  registerSchema,
  RegisterSchema,
} from "../../lib/schemas/registerSchema";
import RegisterSuccess from "./RegisterSuccess";

const RegisterForm = () => {
  const { registerUser } = useAccount();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const email = watch("email");

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onSuccess: () => {
        setRegisterSuccess(true);
      },
      onError: (error) => {
        if (Array.isArray(error)) {
          error.forEach((err) => {
            if (err.includes("email")) {
              setError("email", { message: err });
            }
            if (err.includes("password")) {
              setError("password", {
                message: err,
              });
            }
          });
        }
      },
    });
  };
  return (
    <Fragment>
      {registerSuccess ? (
        <RegisterSuccess email={email} />
      ) : (
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
            <Typography variant="h4">Register</Typography>
          </Box>
          <TextCustomInput label="Email" name="email" control={control} />
          <TextCustomInput
            label="Display Name"
            name="displayName"
            control={control}
          />
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
            Register
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?
            <Typography
              sx={{ ml: 1 }}
              component={Link}
              to="/login"
              color="primary"
            >
              Sign In
            </Typography>
          </Typography>
        </Paper>
      )}
    </Fragment>
  );
};

export default RegisterForm;
