import Link from 'next/link';
import { useState, useEffect } from "react"
import { session, signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { AppBar, Container, Tab, Typography, Tabs, TextField, makeStyles, Box, FormControl, Input, InputAdornment, Button, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import { TabPanel } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Email, Person, Visibility } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    container: {
    },
    form: {
        marginTop: "30px"
    },
    textField: {
        marginTop: "15px",
        marginBottom: "15px",
        paddingLeft: "5px",
        fontSize: "20px",
        borderWidth: 1,
    },
    formDiv: {
        width: "100%",
        marginBottom: "25px",
        marginLeft: "10%",
    },
}));

let Comp_Logout = ({ ...propsFromParent }) => {
    let [session, loading] = useSession()
    return <>
        <Container>

            <div className="container-fluid mt-5 pt-5" style={{ maxWidth: "350px" }}>
                {session ? <p>You are logged is {session.user.email}</p> : ""}
                <p style={{ width: "100%", textAlign: "center" }}>
                    <Button onClick={() => signOut()} size="large" type="submit" variant="contained"
                        color="primary">Log Out</Button>
                </p>
            </div>
        </Container>
    </>
}

export { Comp_Logout }