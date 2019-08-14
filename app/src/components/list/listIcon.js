import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '200px',
        maxWidth: '250px',
        backgroundColor: 'white',
        position: 'relative'
    },
}));

function Row({ data, index }) {
    const item = data[index].fullName ? data[index].fullName : data[index].name;
    return (
        <ListItem>
            <ListItemIcon
            data-key={data[index].id}
            >
                <DeleteIcon 
                    data-key={data[index].id}
                />
            </ListItemIcon>
            <ListItemText
                primary={item}
                data-key={data[index].id}
                 />
        </ListItem>
    )
}

function setItemKey(index, data) {
    const item = data[index]
    return item.id
}

function MyListIcon(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <FixedSizeList
                height={200}
                width={250}
                itemSize={46}
                itemData={props.items}
                itemKey={setItemKey}
                itemCount={props.items.length}
                outerElementType={props.getData}
            >
                {Row}
            </FixedSizeList>
        </div>
    )
}


export { MyListIcon }