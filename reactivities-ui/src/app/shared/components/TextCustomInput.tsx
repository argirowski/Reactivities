import { TextField, TextFieldProps } from "@mui/material";
import { Fragment } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

type TextInputProps<T extends FieldValues> = {} & UseControllerProps<T> &
  TextFieldProps;

const TextCustomInput = <T extends FieldValues>({
  control,
  ...props
}: TextInputProps<T>) => {
  const formContext = useFormContext<T>();
  const effectiveControl = control || formContext?.control;

  if (!effectiveControl) {
    throw new Error(
      "Text input must be used within a form provider or passed as props"
    );
  }

  const { field, fieldState } = useController({ ...props });

  return (
    <Fragment>
      <TextField
        {...props}
        {...field}
        value={field.value || ""}
        fullWidth
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error ? fieldState.error.message : ""}
      />
    </Fragment>
  );
};

export default TextCustomInput;
