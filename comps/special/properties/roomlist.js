import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { getSession } from 'next-auth/client';
import { Loading, LogoSVG } from '../../reusables';
import { Container, Grid } from '@material-ui/core';
import { getImgUrl } from '../../../utils/utilFns';
import { RoomContext, roomDataDefault } from './room_prop';

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

export default function AlignItemsList({ hookRoomListDialog }) {
    const classes = useStyles();
    let [roomsState, changeRoomsState] = useState([])
    let [loadingState, changeLoadingState] = useState(false)
    useEffect(() => {
        (async () => {
            changeLoadingState(true)
            let { user } = await getSession()
            let res = await fetch(`/api/rooms?userId_eq=${user.userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, []);
            changeLoadingState(false)
            if (res.ok) {
                let data = await res.json();
                let { err, rooms, jwt } = data;
                if (err) {
                    console.log(err)
                }
                if (rooms) {
                    rooms = rooms.map(room => ({ ...room,...roomDataDefault }))
                    console.log(rooms)
                    changeRoomsState(rooms)
                }
            }
        })()
    }, [])
    return <RoomContext.Consumer>
        {({ roomData, changeRoomContext }) => loadingState ? <Grid container justify="center" alignItems="center"
            style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }} >
            <Loading />
        </Grid> :
            <List className={classes.root}>
                {
                    roomsState.map(({ nameOfRoom, desc, id, spaceInfo, room_pics, created_at }, index) => <React.Fragment key={index}>
                        <ListItem onClick={
                            e => {
                                changeRoomContext({ ...roomsState[index] })
                            }
                        } alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={getImgUrl(room_pics[0], "small") || "/room_placeholder.jpeg"} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={nameOfRoom || "Untitled"}
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary">
                                            {desc || "No desc.."} </Typography>
                                        {`Created on : ${(new Date(created_at)).toLocaleDateString()}`}
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>)
                }
            </List>}
    </RoomContext.Consumer>
}