import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { Fragment } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type SelectProps<T extends FieldValues> = {
  items: { text: string; value: string }[];
  label: string;
} & UseControllerProps<T> &
  Partial<SelectInputProps>;

const SelectCustomInput = <T extends FieldValues>(props: SelectProps<T>) => {
  const { field, fieldState } = useController({ ...props });

  return (
    <Fragment>
      <FormControl fullWidth variant="outlined" error={!!fieldState.error}>
        <InputLabel>{props.label}</InputLabel>
        <Select
          value={field.value || ""}
          label={props.label}
          onChange={field.onChange}
        >
          {props.items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={!!fieldState.error?.message}></FormHelperText>
      </FormControl>
    </Fragment>
  );
};

export default SelectCustomInput;
