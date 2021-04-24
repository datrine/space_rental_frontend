import Link from 'next/link';
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Tabs, TextField, makeStyles, Box, Button, CssBaseline } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { useFormik } from 'formik';
import { TabPanel } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFunnelDollar, faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AlarmOn, Dashboard } from '@material-ui/icons';
import React from 'react';

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
        width: 50,
        alignItems: "center"
    },
}));

let Comp_Mob_Footer = ({ showMenu, ...propsFromParent }) => {
    let classes = useStyles();
    return <>
        <AppBar className={classes.appBar} position="fixed"
            style={{ display: showMenu ? "flex" : "none" }} >
            <Box component="button" className={classes.btnStacked} >
                <span><FontAwesomeIcon icon={faHome} /></span>
                <span style={{ fontSize: "12px" }}>Home</span>
            </Box>
            <Link href="/dashboard"><Box component="button" className={classes.btnStacked}>
                <span><Dashboard /></span>
                <span style={{ fontSize: "12px" }}>Dashboard</span>
            </Box></Link>
            <Box component="button" className={classes.btnStacked}>
                <span><FontAwesomeIcon icon={faPlusCircle} className="fa-3x" /></span>
            </Box>
            <Box component="button" className={classes.btnStacked}>
                <span><FontAwesomeIcon icon={faFunnelDollar} /></span>
                <span style={{ fontSize: "12px" }}>Realty</span>
            </Box>
            <Box component="button" className={classes.btnStacked}>
                <span><AlarmOn /></span>
                <span style={{ fontSize: "12px" }} >Notification</span>
            </Box>
        </AppBar>
    </>
}


export { Comp_Mob_Footer }