import { Box, Button, Paper, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  activitySchema,
  ActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryOptions } from "./categoryOptions";
import SelectCustomInput from "../../../app/shared/components/SelectCustomInput";
import TextCustomInput from "../../../app/shared/components/TextCustomInput";
import DateTimeCustomInput from "../../../app/shared/components/DateTimeCustomInput";
import LocationCustomInput from "../../../app/shared/components/LocationCustomInput";

const ActivityForm = () => {
  const { control, reset, handleSubmit } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  useEffect(() => {
    if (activity) {
      reset({
        ...activity,
        location: {
          venue: activity.venue,
          city: activity.city,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
    }
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    const { location, ...rest } = data;
    const flattenedData = { ...rest, ...location } as Activity;
    try {
      if (activity) {
        updateActivity.mutate(
          { ...activity, ...flattenedData },
          {
            onSuccess: () => {
              navigate(`/activities/${activity.id}`);
            },
          }
        );
      } else {
        createActivity.mutate(flattenedData, {
          onSuccess: (id) => {
            navigate(`/activities/${id}`);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoadingActivity) return <Typography>Loading ...</Typography>;

  return (
    <Fragment>
      <Paper sx={{ borderRadius: 3, padding: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
          {activity ? "Edit Activity" : "Create Activity"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextCustomInput label="Title" control={control} name="title" />
          <TextCustomInput
            label="Description"
            control={control}
            name="description"
            multiline
            rows={3}
          />
          <Box display="flex" gap={3}>
            <SelectCustomInput
              items={categoryOptions}
              label="Category"
              control={control}
              name="category"
            />
            <DateTimeCustomInput label="Date" control={control} name="date" />
          </Box>
          <LocationCustomInput
            control={control}
            label="Enter the Location"
            name="location"
          />

          <Box display="flex" justifyContent="end" gap={3}>
            <Button color="inherit" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={updateActivity.isPending || createActivity.isPending}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default ActivityForm;
