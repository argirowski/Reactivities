import { Fragment } from "react";
import { Event, FilterList } from "@mui/icons-material";
import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const ActivityFilters = observer(() => {
  const {
    activityStore: { setFilter, setStartDate, filter, startDate },
  } = useStore();

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          borderRadius: 3,
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                color: "primary.main",
              }}
            >
              <FilterList sx={{ mr: 1 }} />
              Filters:
            </Typography>
            <MenuList>
              <MenuItem
                selected={filter === "all"}
                onClick={() => setFilter("all")}
              >
                <ListItemText primary="All Events" />
              </MenuItem>
              <MenuItem
                selected={filter === "isGoing"}
                onClick={() => setFilter("isGoing")}
              >
                <ListItemText primary="I'm Going" />
              </MenuItem>
              <MenuItem
                selected={filter === "isHost"}
                onClick={() => setFilter("isHost")}
              >
                <ListItemText primary="I'm  Hosting" />
              </MenuItem>
            </MenuList>
          </Box>
        </Paper>
        <Box component={Paper} sx={{ borderRadius: 3, p: 3, width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              color: "primary.main",
            }}
          >
            <Event sx={{ mr: 1 }} />
            Select Date
          </Typography>
          <Calendar
            value={startDate}
            onChange={(date) => setStartDate(date as Date)}
          />
        </Box>
      </Box>
    </Fragment>
  );
});

export default ActivityFilters;
