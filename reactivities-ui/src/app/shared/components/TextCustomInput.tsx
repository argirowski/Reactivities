import { TextField, TextFieldProps } from "@mui/material";
import { Fragment } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type TextInputProps<T extends FieldValues> = {} & UseControllerProps<T> &
  TextFieldProps;

const TextCustomInput = <T extends FieldValues>(props: TextInputProps<T>) => {
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
