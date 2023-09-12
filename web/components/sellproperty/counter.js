import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    height: "3.5rem",
    marginRight: "0.5rem",
    marginLeft: "0.5rem",
    background: "white",
    color: "rgba(8, 24, 74, 0.69)",
    boxShadow: "0 3px 5px 2px rgba(36, 159, 251, 0.1)",
    "&:hover": {
      background: "white",
      boxShadow: "0 4px 6px 3px rgba(36, 159, 251, 0.15)",
    },
  },
}));
const counter = ({
  textFieldClass,
  inputLabelClass,
  label,
  name,
  handleChange,
  handleBlur,
  increment,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0.0);

  const increase = () => {
    setValue(value + increment);
  };

  const decrease = () => {
    if (value - increment < 0) {
      setValue(0);
    } else {
      setValue(value - increment);
    }
  };
  return (
    <div>
      <Button onClick={increase} className={classes.button}>
        <AddIcon />
      </Button>
      <TextField
        className={textFieldClass}
        InputLabelProps={{
          className: inputLabelClass,
        }}
        InputProps={{
          className: inputLabelClass,
        }}
        label={label}
        variant="outlined"
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button onClick={decrease} className={classes.button}>
        <RemoveIcon />
      </Button>
    </div>
  );
};

export default counter;
