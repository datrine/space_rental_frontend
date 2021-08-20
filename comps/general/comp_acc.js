import Link from 'next/link';
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { AppBar, Container, Tab, Typography, Tabs, Box, } from '@material-ui/core';
import { useFormik } from 'formik';
import { Comp_Login } from "./comp_login"
import { Comp_Mob_Footer } from './comp_mob_footer';
import { Comp_Mob_Header } from './comp_mob_menu';
import { Comp_Register } from './comp_register';
import { Comp_Logout } from './comp_logout';
import { LogoSVG } from '../resuables/reusables';
import { appColor } from '../../utils/utilFns';

let Comp_Account = ({ ...propsFromParent }) => {
    return <>
        <MobileView {...propsFromParent} />
    </>
}

function MobileView({ csrfToken, hookChangeRegState, callbackUrl, ...propsFromParent }) {
    let [session, loading] = useSession()
    let { query: { tabValue } } = useRouter()
    return <>
        <Comp_Mob_Header />
        {session ?
            <Comp_Logout /> : <AccountView callbackUrl={callbackUrl} tabValue={tabValue}
                {...propsFromParent} />}</>
}

function AccountView({ callbackUrl, ...props }) {
    let [tabValue, changeTabValue] = useState(props.tabValue || "login")
    return <>
        <Container className="pt-4 mt-5 mb-3 pb-3">
            <h4 style={{ textAlign: "center", marginBottom: "0px" }}>
                <img src="/myspace_32x32.svg" height={50} width={50} />
            </h4>
            <h3
                style={{
                    textAlign: "center", paddingBottom: "5px", marginBottom: "0px", color: appColor
                }}>
                <a>MySpace4You</a>
            </h3>

            <Tabs value={tabValue} indicatorColor="primary" onChange={
                (e, value) => {
                    changeTabValue(value);
                }
            } centered >
                <Tab label="Sign in" value="login"
                    style={{ color: tabValue === "login" ? "green" : "black" }} />
                <Tab label="Register" value="register"
                    style={{ color: tabValue === "register" ? "green" : "black" }} />
            </Tabs>
            <TabPanel value={tabValue} index="login" >
                <div className="container-fluid" >
                    <Comp_Login callbackUrl={callbackUrl} />
                </div>
            </TabPanel>
            <TabPanel value={tabValue} index="register" >
                <div className="container-fluid mb-5" >
                    <Comp_Register />
                </div>
            </TabPanel>
        </Container>
    </>
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div className="container-fluid p-0"
            role="tabpanel"
            hidden={value !== index}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


export { Comp_Account ,AccountView}