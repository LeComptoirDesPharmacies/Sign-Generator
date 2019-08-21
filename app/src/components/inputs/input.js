import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles(theme => ({
  root: {
    color: '#01b57c'
  }
}));

function MyInputText(props) {
  const classes = useStyles();

  return (
    <TextField
      label={props.label}
      id="mui-theme-provider-standard-input"
      type="text"
      value={props.value}
      name={props.name}
      onChange={props.handleChange}
      className={classes.root}
      fullWidth={props.fullWidth}
    />
  );
}

function MyInputSubmit(props) {
  const classes = useStyles();

  return (
    <TextField
      label={props.label}
      id="mui-theme-provider-standard-input"
      type="submit"
      value={props.value}
      name={props.name}
      fullWidth={props.fullWidth}
      onChange={props.handleChange}
      className={classes.root}
    />
  );
}

function MyInput(props) {
  const classes = useStyles();
  const labelRef = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(labelRef.current.offsetWidth);
  }, []);

  return (
    <div>
      <InputLabel ref={labelRef} className={classes.root} htmlFor="component-input">
        {props.name}
      </InputLabel>
      <Input
        id="component-input"
        value={props.value}
        onChange={props.onChange}
        className={classes.root}
      />
    </div>
  )
}

export { MyInputText, MyInput, MyInputSubmit };