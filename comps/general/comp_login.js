import Link from 'next/link';
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { AppBar, Container, Tab, Typography, Tabs, TextField, makeStyles, Box, FormControl, Input, InputAdornment, Button, Grid, IconButton } from '@material-ui/core';
import { useFormik } from 'formik';
import { TabPanel } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Email, Person, Visibility, VisibilityOff } from '@material-ui/icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { errorsLibrary } from '../../utils/strapiErrors';

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

let Comp_Login = ({ callbackUrl, ...propsFromParent }) => {
    let classes = useStyles()
    let router = useRouter()
    let [showPassword, changeShowPasword] = useState(false)
    let [isFailed, changeIsFailed] = useState(false)
    // console.log(router.query)
    let { err, errMsg } = router.query
    errMsg =err&& errorsLibrary[err]?.msg || errMsg || "Error: please try again"
    let formik = useFormik({
        initialValues: {
            emailOrUsername: "",
            password: "",
        },
        onSubmit: (values, actions) => {
            (async () => {
                let { emailOrUsername, password } = values
                changeIsFailed(false)
                try {
                    await signIn("credentials", {
                        emailOrUsername,
                        password,
                        callbackUrl: callbackUrl ? callbackUrl : "/dashboard"
                    })
                    console.log("Signed in...")
                } catch (error) {
                    changeIsFailed(true)
                }
            })()
        }
    })
    return <>
        <Container>
            <form className="container-fluid mt-3" onSubmit={
                e => {
                    e.preventDefault()
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
                            <button onClick={
                                e => changeShowPasword(!showPassword)
                            } type="button" className="btn p-0" >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </button>
                        </InputAdornment>}
                        name="password" placeholder="Password..." type={showPassword ? "text" : "password"}
                        className={classes.textField} />
                </FormControl>

                <p style={{ width: "100%", textAlign: "center" }}>
                    <Button disabled={!formik.isValid} size="large" type="submit" variant="contained"
                        color="primary" >
                        {(!formik.isSubmitting || isFailed) ?
                            "Login" : <FontAwesomeIcon spin icon={faSpinner} />} </Button>
                </p>
                <p style={{ width: "100%", textAlign: "center", color: "red" }}>{errMsg}</p>
            </form>

            <div className="container-fluid mt-2" style={{ maxWidth: "400px", padding: 0, display: "none" }} >
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
                            <FontAwesomeIcon icon={faGoogle} />
                        </button>
                        <span style={{ fontSize: "20px" }} className="ml-2"> Google sign in</span>
                    </p>
                    <p>
                        <IconButton style={{
                            width: "40px", height: "40px",
                            borderRadius: "50%", backgroundColor: "white", color: "blue"
                        }}>
                            <FontAwesomeIcon size="2x" icon={faFacebook} />
                        </IconButton>
                        <span style={{ fontSize: "20px" }} className="ml-2"> Facebook sign in</span>
                    </p>
                </div>
            </div>
        </Container>
    </>
}

export { Comp_Login }