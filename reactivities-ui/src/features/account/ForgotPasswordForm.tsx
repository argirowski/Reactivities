import { Fragment } from "react";
import { useAccount } from "../../lib/hooks/useAccount";
import { LockOpen } from "@mui/icons-material";
import AccountFormWrapper from "./AccountFormWrapper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import TextCustomInput from "../../app/shared/components/TextCustomInput";

const ForgotPasswordForm = () => {
  const { forgotPassword } = useAccount();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    try {
      await forgotPassword.mutateAsync(data.email, {
        onSuccess: () => {
          toast.success("Password reset requested - please check your email");
          navigate("/login");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      {" "}
      <AccountFormWrapper
        title="Please enter your email address"
        icon={<LockOpen fontSize="large" />}
        submitButtonText="Request password reset link"
        onSubmit={onSubmit}
      >
        <TextCustomInput
          rules={{ required: true }}
          label="Email address"
          name="email"
        />
      </AccountFormWrapper>
    </Fragment>
  );
};

export default ForgotPasswordForm;
