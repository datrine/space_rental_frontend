import Link from 'next/link';
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Tabs, TextField, makeStyles, Box, Button, CssBaseline, Input } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { useFormik } from 'formik';
import { TabPanel } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFunnelDollar, faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AccountCircle, AlarmOn, Dashboard, Message, PersonRounded, Search } from '@material-ui/icons';
import { ExpandedMenu, HamburgerMenu } from './comp_hamburger';

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        top: 0,
        height: 60
    },

    btnStacked: {
        display: 'flex',
        justifyContent: "center",
        flexDirection: "column",
        borderWidth: 0,
        backgroundColor: "transparent"
    },
}));

let Comp_Mob_Header = ({ ...propsFromParent }) => {
    let classes = useStyles();
    let [expandedMenuState, changeExpandedMenu] = useState(false)
    let [session,loading]= useSession()
    return <>
        <AppBar className={classes.appBar} position="fixed">
            <Box component="button" className={classes.btnStacked} >
                <span>MySpace4You</span>
            </Box>
            <SearchBtn />
          {session? <Box component="button" className={classes.btnStacked}>
                <Link href="/account"><AccountCircle/></Link>
            </Box>:null} 
            <Box component="button" className={classes.btnStacked} >
                <HamburgerMenu hookChangeExpandedMenu={changeExpandedMenu} expandedProps={expandedMenuState} />
            </Box>
        </AppBar>
        {expandedMenuState ? <ExpandedMenu hookToggleExpanded={changeExpandedMenu} /> : null}
    </>
}

let SearchBtn = () => {
    let classes = useStyles();
    let [viewState, changeViewState] = useState(false);
    return <><TextField size="small" variant="outlined" InputLabelProps={{ shrink: true }} style={{
        visibility: viewState ? "hidden" : "visible", marginRight: "10px", marginTop: "10px"
    }} />
        <Box onClick={
            e => {
                changeViewState(!viewState)
            }
        } component="button" className={classes.btnStacked}>
            <span><Search /></span>
        </Box>
    </>
}

export { Comp_Mob_Header }