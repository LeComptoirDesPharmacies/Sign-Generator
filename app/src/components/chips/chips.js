import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(1),
        background: '#4B579C',
        "&:hover": {
            backgroundColor: "#8F98CC !important"
        },
        marginTop: '7%',
        width:'100%',
        whiteSpace: 'inherit !important'
    },
}));

function BasicChip(props) {
    const classes = useStyles();
    return (
            <Chip label={props.text} className={classes.chip} color='primary' />
    )
}

export { BasicChip }