import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
    cardSign: {
        minWidth: 275,
    },
    simpleCard: {
        height: '60px'
    }
}));

export default function SimpleCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes[props.classes]}>
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    );
}