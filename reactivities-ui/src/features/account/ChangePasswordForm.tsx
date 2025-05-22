import { Fragment } from "react";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { Password } from "@mui/icons-material";
import TextCustomInput from "../../app/shared/components/TextCustomInput";
import AccountFormWrapper from "./AccountFormWrapper";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "../../lib/schemas/changePasswordSchema";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const { changePassword } = useAccount();

  const onSubmit = async (data: ChangePasswordSchema) => {
    try {
      await changePassword.mutateAsync(data, {
        onSuccess: () => toast.success("Your password has been changed"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <AccountFormWrapper<ChangePasswordSchema>
        title="Change password"
        icon={<Password fontSize="large" />}
        onSubmit={onSubmit}
        submitButtonText="Update password"
        resolver={zodResolver(changePasswordSchema)}
        reset={true}
      >
        <TextCustomInput
          type="password"
          label="Current password"
          name="currentPassword"
        />
        <TextCustomInput
          type="password"
          label="New password"
          name="newPassword"
        />
        <TextCustomInput
          type="password"
          label="Confirm password"
          name="confirmPassword"
        />
      </AccountFormWrapper>
    </Fragment>
  );
};

export default ChangePasswordForm;
