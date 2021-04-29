import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { getSession } from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export default function AlignItemsList({ userIdProp }) {
    const classes = useStyles();
    let [roomsState, changeRoomsState] = useState([])
    useEffect(() => {
        (async () => {
            let { user } = await getSession()
            let res = await fetch(`/api/rooms?userId_eq=${user.userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, []);
            if (res.ok) {
                let data = await res.json();
                let { err, rooms, jwt } = data;
                if (err) {
                    console.log(err)
                }
                if (rooms) {
                    console.log(rooms)
                    changeRoomsState(rooms)
                }
            }
        })()
    }, [])
    return <List className={classes.root}>
        {roomsState.map(({desc,id,spaceInfo},index) => <> <ListItem key={index} onClick={
            e=>{
            }
        } alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary="Brunch this weekend?"
                secondary={
                    <>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary">
                            Ali Connors </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                    </>
                }
            />
        </ListItem>
            <Divider variant="inset" component="li" />
        </>)}

    </List>

}