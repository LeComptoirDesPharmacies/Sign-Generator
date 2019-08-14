import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: '#FAF9FB',
    padding: theme.spacing(2),
    flexGrow: 1
  },
  second: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: '#FAF9FB',
    padding: theme.spacing(2),
    flexGrow: 1,
    height: '100%',
    width: '100%'
  },
  third: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: '#FAF9FB',
    padding: theme.spacing(2),
    flexGrow: 1,
    height: '100%',
    width: '50%'
  },
  title: {
    color: '#4B579C',
    marginBottom: theme.spacing(3)
  }
}));

export default function PaperSheet(props) {
  const classes = useStyles();
  const height = props.height
  const textAlign = props.textAlign

  return (
    <div>
      <Paper className={classes[props.classes]} mx='auto' style={{height}} style={{textAlign}}>
        <Typography variant="h5" component="h3" className={classes.title}>
          {props.title}
        </Typography>
        {props.children}
      </Paper>
    </div>
  );
}