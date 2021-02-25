import Link from 'next/link';
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { AppBar, Container, Tab, Typography, Tabs, TextField, makeStyles, Box, InputAdornment, Input, FormControl } from '@material-ui/core';
import { useFormik } from 'formik';
import { TabPanel } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Email } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    container: {
    },
    form: {
        marginTop: "30px"
    },
    textField: {
        marginBottom: "15px",
        paddingLeft: "5px",
        fontSize: "25px",
        borderWidth: 1,
        borderRadius: "2px"
    },
    formDiv: {
        width: "100%",
        marginBottom: "25px",
        marginLeft: "10%",
    },
}));

let Comp_Register = ({ ...propsFromParent }) => {
    let classes = useStyles()
    let formik = useFormik({
        initialValues: {
            email: ""
        }
    })
    return <>
        <Container>
            <form className="container-fluid mt-2" >
                <FormControl>
                    <Input placeholder="Email..." fullWidth startAdornment={
                        <InputAdornment position="start">
                            <Email /></InputAdornment>
                    } type="email"
                        className={classes.textField} /></FormControl>

                <TextField inputProps={{
                    startAdornment:(<InputAdornment position="start">
                    <Email /></InputAdornment>)
                }} placeholder="Full name..."
                    className={classes.textField} />

                <TextField placeholder="Phone number..."
                    className={classes.textField} />

                <TextField placeholder="Password..." type="password"
                    className={classes.textField} />

                <p style={{ textAlign: "right", width: "80%", marginLeft: "10%" }}>
                    <button className="btn" style={{ fontSize: "25px", textDecoration: "underline" }}>
                        Forget Password?
                        </button>
                </p>
                <div style={{ width: "80%", marginLeft: "10%" }}>
                    <label>
                        <input type="checkbox" className="w3-check" />
                        <span style={{ fontSize: "25px", marginLeft: "10px", verticalAlign: "baseline" }}>Remember me</span></label>
                </div>
            </form>
            <div className="container-fluid mt-2">
                <div
                    style={{
                        width: "80%", marginLeft: "10%", paddingLeft: "10px",
                        borderWidth: "2px", borderStyle: "solid"
                    }}>
                    <p>
                        <button className="btn" style={{
                            width: "40px", height: "40px",
                            borderRadius: "50%", backgroundColor: "#ededed"
                        }}>
                        </button>
                        <span style={{ fontSize: "20px" }} className="ml-2"> Google sign in</span>
                    </p>
                    <p>
                        <button className="btn" style={{
                            width: "40px", height: "40px",
                            borderRadius: "50%", backgroundColor: "#ededed"
                        }}>
                        </button>
                        <span style={{ fontSize: "20px" }} className="ml-2"> Facebook sign in</span>
                    </p>
                </div>
            </div>
        </Container>
    </>
}


export { Comp_Register }