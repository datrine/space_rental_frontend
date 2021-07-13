import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useContext } from "react"
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
import SearchBtn from './searchBtn';
import SearchApp from '../searchApp';
import { UserSessionContext } from '../../pages/_app';
import { getImgUrl } from '../../utils/utilFns';

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
    let { session } = useContext(UserSessionContext);
    let { user } = session
    let prof_pic = getImgUrl(user?.prof_pic) || ""
    return <>
        <AppBar className={classes.appBar} position="fixed">
            <Box component="button" className={classes.btnStacked} >
                <Image src="/myspace_32x32.svg" height={30} width={30} />
            </Box>
            <SearchBtn />
            <Box component="button" className={classes.btnStacked}>
                <Link href="/acccount" >
                    {user.id ? (prof_pic ?
                        <img height={50} width={50} src={prof_pic} className="w3-circle" /> : <AccountCircle
                            style={{
                                color: "green",
                                fontSize: "2.5em"
                            }} />) :
                        <AccountCircle
                            style={{
                                color: "black",
                                fontSize: "2.5em"
                            }} />
                    }
                </Link> </Box>
            <Box component="button" className={classes.btnStacked} >
                <HamburgerMenu hookChangeExpandedMenu={changeExpandedMenu} expandedProps={expandedMenuState} />
            </Box>
        </AppBar>
        {expandedMenuState ? <ExpandedMenu hookToggleExpanded={changeExpandedMenu} /> : null}
    </>
}

export { Comp_Mob_Header }