import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { Fragment } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type DateTimeCustomInputProps<T extends FieldValues> =
  {} & UseControllerProps<T> & DateTimePickerProps<Date>;

const DateTimeCustomInput = <T extends FieldValues>(
  props: DateTimeCustomInputProps<T>
) => {
  const { field, fieldState } = useController({ ...props });
  return (
    <Fragment>
      <DateTimePicker
        {...props}
        value={field.value ? new Date(field.value) : null}
        onChange={(value) => {
          field.onChange(new Date(value!));
        }}
        sx={{ width: "100%" }}
        slotProps={{
          textField: {
            onBlur: field.onBlur,
            error: !!fieldState.error,
            helperText: fieldState.error?.message,
          },
        }}
      />
    </Fragment>
  );
};

export default DateTimeCustomInput;
