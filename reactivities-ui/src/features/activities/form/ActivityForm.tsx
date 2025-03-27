import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, Fragment } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router-dom";

const ActivityForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (activity) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
      navigate(`/activities/${activity.id}`);
    } else {
      createActivity.mutate(data as unknown as Activity, {
        onSuccess: (id) => {
          navigate(`/activities/${id}`);
        },
      });
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
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField label="Title" defaultValue={activity?.title} />
          <TextField
            label="Description"
            multiline
            rows={3}
            defaultValue={activity?.description}
          />
          <TextField label="Category" defaultValue={activity?.category} />
          <TextField
            label="Date"
            type="date"
            defaultValue={
              activity?.date
                ? new Date(activity.date).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
          />
          <TextField label="City" defaultValue={activity?.city} />
          <TextField label="Venue" defaultValue={activity?.venue} />
          <Box display="flex" justifyContent="end" gap={3}>
            <Button color="inherit" onClick={() => console.log("Cancel")}>
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
