import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, Fragment } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

type ActivityFormProps = {
  handleCloseForm: () => void;
  selectedActivity?: Activity;
};

const ActivityForm = ({
  handleCloseForm,
  selectedActivity,
}: ActivityFormProps) => {
  const { updateActivity } = useActivities();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (selectedActivity) {
      data.id = selectedActivity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
      handleCloseForm();
    }
  };
  return (
    <Fragment>
      <Paper sx={{ borderRadius: 3, padding: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
          Create Activity
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField label="Title" />
          <TextField label="Description" multiline rows={3} />
          <TextField label="Category" />
          <TextField label="Date" type="date" />
          <TextField label="City" />
          <TextField label="Venue" />
          <Box display="flex" justifyContent="end" gap={3}>
            <Button color="inherit" onClick={handleCloseForm}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={updateActivity.isPending}
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
