import Link from 'next/link';
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { AppBar, Container, Tab, Typography, Tabs, TextField, makeStyles, Box, FormControl, Input, InputAdornment, Button, Grid, IconButton } from '@material-ui/core';
import { useFormik } from 'formik';
import { TabPanel } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowBack, Email, Person, RepeatRounded, Visibility, VisibilityOff } from '@material-ui/icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { errorsLibrary } from '../../utils/errorLib';
import validator from 'validator';
import { appColor, stateMgr } from '../../utils/utilFns';

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
    let [showOtherInfo, changeShowOtherInfo] = useState(false)
    let [otherInfoMood, changeOtherInfoMood] = useState("")
    let [isFailed, changeIsFailed] = useState(false)
    // console.log(router.query)
    let { err, errMsg } = router.query
    errMsg = !!err && (errorsLibrary[err]?.msg || errMsg || "Error: please try again");
    let needsVerification = err === "Auth.form.error.confirmed" ? true : false
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
    if (!showOtherInfo) {
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
                    <p><span onClick={
                        e => {
                            changeShowOtherInfo(true)
                            changeOtherInfoMood("forgot-password")
                        }
                    } >Forgot Password?</span></p>
                    <p style={{ width: "100%", textAlign: "center", color: "red" }}>{errMsg}</p>
                    {needsVerification ?
                        <p style={{}}>
                            <Button onClick={
                                e => {
                                    changeShowOtherInfo(true)
                                    changeOtherInfoMood("send-email-conf")
                                }
                            } style={{ backgroundColor: appColor, color: "white" }} >
                                Click to verify your email address
                                </Button>
                        </p> : null}
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
    else {
        return <>
            <OtherInfo showOtherInfoProps={showOtherInfo}
                hookChangeShowOtherInfo={changeShowOtherInfo}
                emailProps={validator.isEmail(formik.values.emailOrUsername) ?
                    formik.values.emailOrUsername : ""} mode={otherInfoMood} />
        </>
    }
}

let OtherInfo = ({ showOtherInfoProps, hookChangeShowOtherInfo, emailProps, mode }) => {
    let props = { showOtherInfoProps, hookChangeShowOtherInfo, emailProps, mode }
    let [modeState, changeModeState] = useState(mode)
    let view = null
    switch (modeState) {
        case "send-email-conf":
            view = <SendEmailConfApp {...props} />
            break;

        case "forgot-password":
            view = <ForgotPasswordApp {...props} />
            break;

        default:
            break;
    }
    return <>
        <Container>
            {view}
            <Button onClick={
                e => {
                    hookChangeShowOtherInfo(false)
                }
            } style={{ color: "white", backgroundColor: appColor }} >
                <ArrowBack /> Back To Login</Button>
        </Container>
    </>
}

let SendEmailConfApp = ({ showOtherInfoProps, hookChangeShowOtherInfo, emailProps, mode }) => {
    let [emailState, changeEmailState] = useState(emailProps)
    let state = stateMgr()
    let [networkState, changeNetworkState] = useState(state);
    let [passwordLinkSent, changePasswordLinkSending] = useState(false)
    let networkView = null
    switch (networkState.Current) {
        case state.Loaded:
            networkView = <span >Confirmatory email sent. Please check your email...</span>
            break;

        case state.Loading:
            networkView = <span>Sending...</span>
            break;

        case state.Failed:
            networkView = <span>Unable to send email...</span>
            break;

        default:
            break;
    }
    return <>
        <Container style={{ marginTop: "20px" }} >
            {passwordLinkSent ? <>
                {networkView}
                <p style={{ marginTop: "10px" }} >
                    {networkState.Current === networkState.Failed ?
                        <Button color="secondary" variant="contained" onClick={
                            e => {
                                changePasswordLinkSending(false)
                            }
                        } >
                            <RepeatRounded /> Retry</Button> : null}
                </p>

            </> : <>
                <Input fullWidth value={emailState} onChange={e => {
                    changeEmailState(e.target.value)
                }} />
                <p style={{ marginTop: "10px" }} >
                    <Button color="primary" variant="contained" onClick={
                        async e => {
                            try {
                                if (!emailState) {
                                    return alert("Please enter email...")
                                }
                                let state = { ...networkState }
                                state.setLoadingState(state.Loading)
                                changeNetworkState({ ...state })
                                changePasswordLinkSending(true)
                                let res = await fetch("/api/email/auth/send-email-confirmation", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ email: emailState })
                                })
                                if (res.ok) {
                                    let data = await res.json()
                                    console.log(data)
                                    let { err } = data
                                    if (err) {
                                        state.setLoadingState(state.Failed)
                                        return changeNetworkState({ ...state })
                                    }
                                    state.setLoadingState(state.Loaded)
                                    changeNetworkState({ ...state })
                                }
                            } catch (error) {
                                state.setLoadingState(state.Failed)
                                changeNetworkState({ ...state })
                            }
                        }
                    } style={{}} >Resend Confirmatory Email</Button>
                </p>

            </>}
        </Container>
    </>

}

let ForgotPasswordApp = ({ showOtherInfoProps, hookChangeShowOtherInfo, emailProps, mode }) => {
    let [emailState, changeEmailState] = useState(emailProps)
    let [passwordLinkSent, changePasswordLinkSending] = useState(false)
    let state = stateMgr()
    let [networkState, changeNetworkState] = useState(state);
    let networkView = null
    console.log(networkState)
    switch (networkState.Current) {
        case state.Loaded:
            networkView = <span >Email sent. Please check your email...</span>
            break;

        case state.Loading:
            networkView = <span>Sending...</span>
            break;

        case state.Failed:
            networkView = <span>Unable to send email...</span>
            break;

        default:
            break;
    }
    return <>
        <Container style={{ marginTop: "20px" }} >
            {passwordLinkSent ? <>
                {networkView}
                <p style={{ marginTop: "10px" }} >
                    {networkState.Current === networkState.Failed ?
                        <Button color="secondary" variant="contained" onClick={
                            e => {
                                changePasswordLinkSending(false)
                            }
                        } >
                            <RepeatRounded /> Retry</Button> : null}
                </p>

            </> : <>
                <Input fullWidth value={emailState} onChange={e => {
                    changeEmailState(e.target.value)
                }} />
                <p style={{ marginTop: "10px" }} >
                    <Button color="primary" variant="contained" onClick={
                        async e => {
                            try {
                                if (!emailState) {
                                    return alert("Please enter email...")
                                }
                                let state = { ...networkState }
                                state.setLoadingState(state.Loading)
                                changeNetworkState({ ...state })
                                changePasswordLinkSending(true)
                                let res = await fetch("/api/email/forgot-password", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ email: emailState })
                                })
                                if (res.ok) {
                                    let data = await res.json()
                                    console.log(data)
                                    let { err } = data
                                    if (err) {
                                        state.setLoadingState(state.Failed)
                                        return changeNetworkState({ ...state })
                                    }
                                    state.setLoadingState(state.Loaded)
                                    changeNetworkState({ ...state })
                                }
                            } catch (error) {
                                state.setLoadingState(state.Failed)
                                changeNetworkState({ ...state })
                            }
                        }
                    } style={{}} >Resend Email</Button>
                </p>

            </>}
        </Container>
    </>

}
export { Comp_Login }