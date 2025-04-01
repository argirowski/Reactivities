import { DateArg, format } from "date-fns";
import { z } from "zod";

export const formattedDate = (date: DateArg<Date>) => {
  return format(date, "dd MMM yyy h:mm a");
};

export const requiredString = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is Required` })
    .min(1, { message: `${fieldName} is Required` });
