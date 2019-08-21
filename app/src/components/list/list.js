import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';


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
    //faut changer à cause du méchant Géry
    const item = data[index].firstName ? data[index].firstName + " " + data[index].lastName : data[index].name;
    return (
        <ListItem
            button
            key={index}
            data-key={data[index].id}
            style={{
                zIndex: 9999,
                position: "relative"
            }}

        >
            <ListItemText
                primary={item}
                data-key={data[index].id}
                style={{
                    zIndex: 9999,
                    position: "relative"
                }} />
        </ListItem>
    )
}

function setItemKey(index, data) {
    const item = data[index]
    return item.id
}

function MyList(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <FixedSizeList
                height={200}
                width={250}
                itemSize={46}
                itemData={props.items}
                itemKey = {setItemKey}
                itemCount={props.items.length}
                outerElementType={props.getData}
                style={{
                    zIndex: 9999,
                    position: "relative"
                }}
            >
                {Row}
            </FixedSizeList>
        </div>
    )
}


export { MyList }