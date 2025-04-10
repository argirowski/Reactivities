import { DateArg, format, formatDistanceToNow } from "date-fns";
import { z } from "zod";

export const formattedDate = (date: DateArg<Date>) => {
  return format(date, "dd MMM yyy h:mm a");
};

export function timeAgo(date: DateArg<Date>) {
  return formatDistanceToNow(date) + " ago";
}

export const requiredString = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is Required` })
    .min(1, { message: `${fieldName} is Required` });
