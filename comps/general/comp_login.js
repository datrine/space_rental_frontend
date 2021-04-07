import Link from 'next/link';
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
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

let Comp_Login = ({ ...propsFromParent }) => {
    let classes = useStyles()
    let router=useRouter()
   // console.log(router.query)
    let {view}=router.query
    let formik = useFormik({
        initialValues: {
            emailOrUsername: "",
            password: "",
        },
        onSubmit: (values, actions) => {
            (async () => {
                let { emailOrUsername, password } = values
                await signIn("credentials", { emailOrUsername, password, callbackUrl: "/dashboard" })
            })()
        }
    })

    return <>
        <Container>
            <form className="container-fluid mt-3" onSubmit={
                e => {
                    e.preventDefault()
                    console.log("logging...")
                    return formik.handleSubmit(e)
                }} style={{ maxWidth: "350px" }} >
                <FormControl fullWidth>
                    <Input onChange={formik.handleChange} value={formik.values.emailOrUsername}
                        placeholder="Email or username..." fullWidth
                        startAdornment={
                            <InputAdornment position="start">
                                <label style={{ display: "flex", flexDirection: "column" }} >
                                    <Email /> <Person /></label> </InputAdornment>
                        } name="emailOrUsername"
                        className={classes.textField} />
                </FormControl>
              

                <FormControl fullWidth>
                    <Input onChange={formik.handleChange} value={formik.values.password} fullWidth
                        startAdornment={<InputAdornment position="start">
                            <button type="button" className="btn p-0" >
                                <Visibility />
                            </button>
                        </InputAdornment>}
                        name="password" placeholder="Password..." type="password"
                        className={classes.textField} />
                </FormControl>
                <p>
                    {view==="pass_user_err" ? <span className="w3-text-red" >
                        Username or password error</span> : null}</p>

                <p style={{ width: "100%", textAlign: "center" }}>
                    <Button disabled={!formik.isValid} size="large" type="submit" variant="contained"
                        color="primary" > Login</Button>
                </p>
            </form>

            <div className="container-fluid mt-2" style={{ maxWidth: "400px",padding:0 }} >
                <div
                    style={{
                        width: "90%", marginLeft: "10%", paddingLeft: "10px",
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

export { Comp_Login }