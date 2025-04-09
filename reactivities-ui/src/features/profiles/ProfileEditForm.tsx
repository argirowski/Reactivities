import { Box, Button } from "@mui/material";
import { Fragment, useEffect } from "react";
import {
  editProfileSchema,
  EditProfileSchema,
} from "../../lib/schemas/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import TextCustomInput from "../../app/shared/components/TextCustomInput";
import { useProfile } from "../../lib/hooks/useProfile";

type ProfileEditFormProps = {
  setEditMode: (editMode: boolean) => void;
};

const ProfileEditForm = ({ setEditMode }: ProfileEditFormProps) => {
  const { id } = useParams();
  const { updateProfile, profile } = useProfile(id);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    mode: "onTouched",
  });
  const onSubmit = (data: EditProfileSchema) => {
    updateProfile.mutate(data, {
      onSuccess: () => setEditMode(false),
    });
  };

  useEffect(() => {
    reset({
      displayName: profile?.displayName,
      bio: profile?.bio || "",
    });
  }, [profile, reset]);
  return (
    <Fragment>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        alignContent="center"
        gap={3}
        mt={3}
      >
        <TextCustomInput
          label="Display Name"
          name="displayName"
          control={control}
        />
        <TextCustomInput
          label="Add your bio"
          name="bio"
          control={control}
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || !isDirty || updateProfile.isPending}
        >
          Update profile
        </Button>
      </Box>
    </Fragment>
  );
};

export default ProfileEditForm;
