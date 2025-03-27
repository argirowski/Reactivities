import { DateArg, format } from "date-fns";

export const formattedDate = (date: DateArg<Date>) => {
  return format(date, "dd MMM yyy h:mm a");
};
