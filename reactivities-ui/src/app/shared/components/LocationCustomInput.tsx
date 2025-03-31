import {
  Box,
  debounce,
  List,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { LocationIQSuggestion } from "../../../lib/types";
import axios from "axios";

type LocationCustomInputProps<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

const LocationCustomInput = <T extends FieldValues>(
  props: LocationCustomInputProps<T>
) => {
  const { field, fieldState } = useController({ ...props });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
  const [inputValue, setInputValue] = useState(field.value || "");

  useEffect(() => {
    if (field.value && typeof field.value === "object") {
      setInputValue(field.value.venue || "");
    } else {
      setInputValue(field.value || "");
    }
  }, [field.value]);

  const locationURL =
    "https://api.locationiq.com/v1/autocomplete?key=pk.23a2387ec87842810d96d469b10168e5&limit=5&dedupe=1&";

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        try {
          const response = await axios.get<LocationIQSuggestion[]>(
            `${locationURL}q=${query}`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setLoading(false);
        }
      }, 500),
    [locationURL]
  );

  const handleInputChange = async (value: string) => {
    field.onChange(value);
    await fetchSuggestions(value);
  };

  const handleInputSelection = (suggestion: LocationIQSuggestion) => {
    const city =
      suggestion.address.city ||
      suggestion.address.town ||
      suggestion.address.village;

    const venue = suggestion.display_name;
    const latitude = suggestion.lat;
    const longitude = suggestion.lon;

    setInputValue(venue);
    field.onChange({
      venue,
      city,
      latitude,
      longitude,
    });
    setSuggestions([]);
  };

  return (
    <Fragment>
      <Box>
        <TextField
          {...props}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          fullWidth
          variant="outlined"
          error={!!fieldState.error}
          helperText={!!fieldState.error?.message}
        />
        {loading && <Typography>Loading...</Typography>}
        {suggestions.length > 0 && (
          <List
            sx={{
              border: 1,
            }}
          >
            {suggestions.map((suggestion) => (
              <ListItemButton
                key={suggestion.place_id}
                divider
                onClick={() => handleInputSelection(suggestion)}
              >
                {suggestion.display_name}
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>
    </Fragment>
  );
};

export default LocationCustomInput;
