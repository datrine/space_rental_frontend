import Link from 'next/link';
import { useState, useEffect, useContext } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Tabs, TextField, makeStyles, Box, Button, CssBaseline } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { useFormik } from 'formik';
import { TabPanel } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faFunnelDollar, faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AlarmOn, Dashboard } from '@material-ui/icons';
import React from 'react';
import { appColor } from '../../utils/utilFns';
import { socket, UserSessionContext } from '../../pages/_app'
import PubSub from 'pubsub-js';
import { ordersNotifFetcher } from '../../utils/notifs';
const useStyles = makeStyles((theme) => ({
    appBar: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        top: 'auto',
        bottom: 0,
        height: 60
    },

    btnStacked: {
        display: 'flex',
        justifyContent: "center",
        flexDirection: "column",
        borderWidth: 0,
        backgroundColor: "transparent",
        color: "black",
        width: 50,
        alignItems: "center"
    },
}));

let Comp_Mob_Footer = ({ showMenu, ...propsFromParent }) => {
    let classes = useStyles();
    useEffect(() => {
        // create a function to receive the topic
        var mySubscriber = function (msg, data) {
            console.log(data);
            console.log(data);
        };
        PubSub.subscribe("message", mySubscriber)
    })
    return <>
        <AppBar className={classes.appBar} position="fixed"
            style={{ display: showMenu ? "flex" : "none" }} >
            <Box component="button" className={classes.btnStacked} style={{ color: "#60942e" }} >
                <span><FontAwesomeIcon icon={faHome} /></span>
                <span style={{ fontSize: "12px" }}>Home</span>
            </Box>
            <Link href="/dashboard"><Box component="button" className={classes.btnStacked} >
                <span><Dashboard /></span>
                <span style={{ fontSize: "12px" }}>Dashboard</span>
            </Box>
            </Link>

            <Link href="/postads"><Box component="button" className={classes.btnStacked}>
                <span><FontAwesomeIcon icon={faPlusCircle} className="fa-3x" /></span>
            </Box>
            </Link>

            <Link href="/my_orders"><Box component="button" className={classes.btnStacked}>
                <span><FontAwesomeIcon icon={faCartPlus} className="fa-2x" /></span>
            </Box>
            </Link>
<Link href="/real_estate">   <Box component="button" className={classes.btnStacked}>
                <span><FontAwesomeIcon icon={faFunnelDollar} /></span>
                <span style={{ fontSize: "12px" }}>Realty</span>
            </Box></Link>
            {/*<NotifBtn />*/}
        </AppBar>
    </>
}
let notifCount = 0;
function NotifBtn(params) {
    let ctx = useContext(UserSessionContext);
    let classes = useStyles();
    let { session: { user } } = ctx;
    let [notifCountState, changeNotifCountState] = useState(0);
    let orderCount = 0;
    useEffect(() => {
        setTimeout(() => {
            if (user&&user.id) {
                console.log(user);
                (async () => {
                    let { orders } = await ordersNotifFetcher({
                        userId: user.id,
                        lastOrderNotifiedTime: new Date().toISOString()
                    });
                    if (orders && orders.length) {
                        orderCount = orders && orders.length ? orders.length : 0;
                        changeNotifCountState(notifCountState + orderCount)
                    }
                })();
            }
        }, 5000)
    })
    return <>
        <Link href="/chats?mode=notif">
            <Box component="button" className={classes.btnStacked}>
                <span><AlarmOn /><sub>{notifCountState}</sub></span>
                <span style={{ fontSize: "12px" }} >Notification</span>
            </Box></Link>
    </>
}
export { Comp_Mob_Footer }