import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    default: {
      background: '#00B4A0',
      "&:hover": {
        backgroundColor: "#5AD2AA !important"
      },
      marginTop: '5%'
    },
    delete: {
        background: '#e53d35',
      "&:hover": {
        backgroundColor: "#f25551 !important"
      },
      marginTop: '5%',
      marginRight: theme.spacing(3),
    }
  }));

function MyButtonSubmit(props) {
    const classes = useStyles();

    return (
        <Button variant="contained" color="primary" type="submit" value="Submit" className={classes[props.classes]}>
            {props.text}
        </Button>
    );
}

function MyButtonText(props) {
  const classes = useStyles();

  return (
      <Button variant="contained" component="span" color="primary" className={classes[props.classes]}>
          {props.text}
      </Button>
  );
}

function MyButtonOnClick(props) {
    const classes = useStyles();

    return (
        <div onClick={props.onClick}>
            <Button variant="contained" color="primary" className={classes[props.classes]}>
                {props.text}
            </Button>
        </div>
    );
}

export { MyButtonText, MyButtonOnClick, MyButtonSubmit };