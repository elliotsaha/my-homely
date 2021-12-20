import React, { useState, useEffect } from "react";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { InputBase, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  active: {
    padding: "0.5rem",
    cursor: "pointer",
    backgroundColor: "#e8eaed",
    borderRadius: "0.25rem",
    fontFamily: "Gilroy, sans-serif",
  },
  inactive: {
    padding: "0.5rem",
    fontFamily: "Gilroy, sans-serif",
    cursor: "pointer",
  },
  textFieldProps: {
    fontFamily: "Gilroy, sans-serif",
    fontWeight: "bold",
    color: "rgba(8, 24, 74, 0.69)",
  },
  textFieldMain: {
    width: "25rem",
    [theme.breakpoints.down("610")]: {
      width: "16rem",
    },
    [theme.breakpoints.down("340")]: {
      width: "12rem",
    },
  },
  outputContainer: {
    width: "25rem",
    [theme.breakpoints.down("610")]: {
      width: "16rem",
    },
    [theme.breakpoints.down("340")]: {
      width: "12rem",
    },
    marginTop: "0.2rem",
  },
  outputContainerAbsolute: {
    position: "absolute",
    zIndex: 5,
    background: "white",
    width: "25rem",
    [theme.breakpoints.down("610")]: {
      width: "16rem",
    },
    [theme.breakpoints.down("340")]: {
      width: "12rem",
    },
    marginTop: "0.2rem",
  },
  suggestionsContainer: {
    borderRadius: "0.25rem",
    marginTop: "0.5rem",
    boxShadow: "0.05rem 0.05rem 0.9rem 0.05rem #e8eaed",
    position: "relative",
    paddingBottom: "0.2rem",
    paddingTop: "0.2rem",
  },
  noSuggestions: {},
}));

export default function standAloneSearch({
  coordinateUpdater,
  addressUpdater,
  absolute,
  query,
  queryAddress,
}) {
  const classes = useStyles();
  const [address, setAddress] = useState(query ? queryAddress : "");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  useEffect(() => {
    coordinateUpdater(coordinates);
    addressUpdater(address);
  }, [coordinates, address]);

  return (
    <div>
      <PlacesAutoComplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              className={classes.textFieldMain}
              InputProps={{
                className: classes.textFieldProps,
              }}
              InputLabelProps={{
                className: classes.textFieldProps,
              }}
              variant="outlined"
              label="Type Address"
              {...getInputProps()}
            />
            <div
              className={
                absolute
                  ? classes.outputContainerAbsolute
                  : classes.outputContainer
              }
            >
              {loading ? <div>...loading</div> : null}
              <div
                className={
                  suggestions.length > 0
                    ? classes.suggestionsContainer
                    : classes.noSuggestions
                }
              >
                {suggestions.map((i) => {
                  const className = i.active
                    ? classes.active
                    : classes.inactive;

                  return (
                    <div {...getSuggestionItemProps(i, { className })}>
                      {i.description}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </PlacesAutoComplete>
    </div>
  );
}
