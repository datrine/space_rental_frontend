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

let Comp_Account = ({ ...propsFromParent }) => {
    return <>
        <MobileView {...propsFromParent} />
    </>
}

function MobileView({ csrfToken, hookChangeRegState, callbackUrl }) {
    let [session, loading] = useSession()
    let { query } = useRouter()
    let view = null
    if (session) {
        view = <> <p className="">You're already logged in...</p></>
    }
    view = <>
        <Comp_Mob_Header />
        <AccountView />
        <Comp_Mob_Footer />
    </>

    return <>
        {view}
    </>
}

function AccountView(params) {
    let formik = useFormik({
        email: "",
        lname: "",
    })
    let [tabValue, changeTabValue] = useState("login")
    return <>
        <Container className="pt-4 mt-5 mb-3 pb-3">
            <Typography
                style={{ textAlign: "center" }}>
                <Typography component="label" variant="h3"
                    style={{
                        borderBottomStyle: "solid", borderBottomWidth: "3px",
                        textAlign: "center", paddingBottom: "10px"
                    }}>
                    MySpace4You
                        </Typography>
            </Typography>
            <br />

            <Tabs value={tabValue} indicatorColor="primary" onChange={
                (e, value) => {
                    changeTabValue(value);
                }
            } centered >
                <Tab label="Sign in" value="login" />
                <Tab label="Register" value="register" />
            </Tabs>
            <TabPanel value={tabValue} index="login" >
                <div className="container-fluid" ><Comp_Login /></div>
            </TabPanel>
            <TabPanel value={tabValue} index="register" >
                <div className="container-fluid mb-5" ><Comp_Register /></div>
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


export { Comp_Account }