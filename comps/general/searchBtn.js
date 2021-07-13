import Link from 'next/link';
import Image from 'next/image';
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
import { LogoSVG } from '../resuables/reusables';
import SearchApp from '../searchApp';

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

let SearchBtn = () => {
    let classes = useStyles();
    let [viewState, changeViewState] = useState(false);
    let [showSearchAppState, changeShowSearchAppState] = useState(false);
    return <>
        <TextField placeholder="Search..." onFocus={
            e => {
                changeShowSearchAppState(true)
                e.currentTarget.blur()
            }
        } size="small" variant="outlined" InputLabelProps={{ shrink: true }} style={{
            visibility: viewState ? "hidden" : "visible", marginRight: "10px", marginTop: "10px"
        }} />
        {showSearchAppState ?
            <SearchApp openSearchApp={showSearchAppState}
                hookOpenSearchApp={changeShowSearchAppState} /> : null
        }
    </>
}

export default SearchBtn