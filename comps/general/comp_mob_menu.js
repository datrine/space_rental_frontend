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
import { AlarmOn, Dashboard, Search } from '@material-ui/icons';
import { ExpandedMenu, HamburgerMenu } from './comp_hamburger';

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        top: 0,
        height:60
    },

    btnStacked: {
        display: 'flex',
        justifyContent:"center",
        flexDirection: "column",
        borderWidth: 0,
        backgroundColor: "transparent"
    },
}));

let Comp_Mob_Header = ({ ...propsFromParent }) => {
    let classes = useStyles();
    let [expandedMenuState,changeExpandedMenu]=useState(false)
    return <>
        <AppBar className={classes.appBar} position="fixed">
            <Box component="button" className={classes.btnStacked} >
                <span>MySpace4You</span>
            </Box>
            <Box component="button" className={classes.btnStacked}>
                <span><Search  /></span>
            </Box>
            <Box component="button" className={classes.btnStacked}>
                <HamburgerMenu hookChangeExpandedMenu={changeExpandedMenu} expandedProps={expandedMenuState} />
            </Box>
        </AppBar>
       {expandedMenuState? <ExpandedMenu hookToggleExpanded={changeExpandedMenu} />:null}
    </>
}


export { Comp_Mob_Header }