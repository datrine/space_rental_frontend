import Head from 'next/head'
import dynamic from 'next/dynamic'
//import { Button, Col, Container, Row } from 'react-bootstrap';
import { Comp_Mob_Header } from "../comps/general/comp_mob_menu"
import { Comp_Mob_Footer } from "../comps/general/comp_mob_footer"
import { PCMenu } from '../comps/general/comp_pc_menu';
import { Comp_CustomerChatApp } from '../comps/general/comp_chat_app';
import { Button, Container, FormControl, Grid, Input, InputAdornment } from '@material-ui/core';
import { SplashScreen } from '../comps/general/comp_splash_screen';
import View from '../comps/view';
import { useEffect, useState } from 'react';
import { screenMgr, stateMgr } from "../utils/utilFns"
import { ToTheTop } from '../comps/reusables';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { RepeatRounded, Visibility, VisibilityOff } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import { registerValidator } from '../utils/validators';
import { useStyles } from '../comps/special/profile/styles';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const DynamicPCComp = dynamic(() => Promise.resolve(PCView));
const DynamicMobileComp = dynamic(() => Promise.resolve(MobileView));


export default function Home() {
    return <>
        <View mobileView={<MobileView />} pcView={<PCView />} />
    </>
}

let PCView = () => {
    return <>
        <PCMenu />
        <Comp_CustomerChatApp />
    </>
}

let MobileView = () => {
    let [showFooterState, changeShowFooterState] = useState(true)
    return <>
        <Container onFocus={
            e => {
                if (e.target.type === "text" || e.target.type === "number") {
                    changeShowFooterState(false)
                }
            }
        } onBlur={
            e => {
                changeShowFooterState(true)
            }
        } style={{ padding: 0 }} >
            <Comp_Mob_Header />
            <Body />
            <Comp_Mob_Footer showMenu={showFooterState} />
        </Container>
    </>
}

let Body = () => {
    let classes = useStyles()
    let router = useRouter();
    let { query: { code } } = router;
    let [showPassword, changeShowPasword] = useState(false)
    let [showRePass, changeShowRePass] = useState(false)
    let [passwordLinkSent, changePasswordLinkSending] = useState(false)
    let state = stateMgr()
    let [networkState, changeNetworkState] = useState(state);
    let networkView = null
    switch (networkState.Current) {
        case state.Loaded:
            networkView = <span >Your password has being updated...</span>
            break;

        case state.Loading:
            networkView = <span>Sending...</span>
            break;

        case state.Failed:
            networkView = <span style={{color:"red"}} >Some error occured...</span>
            break;

        default:
            break;
    }
    let formik = useFormik({
        initialValues: {
            password: "",
            repass: ""
        },
        validate: (values) => {
            return new Promise(async (res, rej) => {
                let errors = {}
                let valObj = await registerValidator(values);
                let { valid, errorList, instance } = valObj
                if (!valid) {
                    for (const errorObj of errorList) {
                        errors[errorObj.prop] = errorObj.msg;
                    }
                }
                res(errors)
            })
        },
        onSubmit: (values, actions) => {
            (async () => {
                try {
                    if (!(code && values.password && values.repass)) {
                        return alert("Please Fill relevant details")
                    }
                    let state = { ...networkState }
                    state.setLoadingState(state.Loading)
                    changeNetworkState({ ...state })
                    changePasswordLinkSending(true)
                    let res = await fetch("/api/email/auth/reset-password", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            code,
                            password: values.password,
                            passwordConfirmation: values.repass
                        })
                    })
                    if (res.ok) {
                        let data = await res.json()
                        console.log(data)
                        let { err,jwt,user } = data
                        if (err) {
                            state.setLoadingState(state.Failed)
                            return changeNetworkState({ ...state })
                        }
                        if (jwt) {
                        state.setLoadingState(state.Loaded)
                        changeNetworkState({ ...state })
                        }
                    }
                } catch (error) {
                    state.setLoadingState(state.Failed)
                    changeNetworkState({ ...state })
                }
            })()
        }
    });
    return <>
        <Container style={{ marginTop: "100px" }} >
            <h3 style={{ textAlign: "center" }} >Change Password</h3>
            {passwordLinkSent ? <>
               <p style={{textAlign:"center"}} > {networkView}</p>
                <p style={{ marginTop: "10px",textAlign:"center" }} >
                    {networkState.Current === networkState.Failed ?
                        <Button color="secondary" variant="contained" onClick={
                            e => {
                                changePasswordLinkSending(false)
                            }
                        } >
                            <RepeatRounded /> Retry</Button> : null}
                </p>

            </> : <>
                <form className="container-fluid mt-2" onSubmit={
                    e => {
                        e.preventDefault()
                        return formik.handleSubmit(e)
                    }} style={{ maxWidth: "350px" }} >

                    <FormControl fullWidth>
                        <Input onChange={formik.handleChange} value={formik.values.password} fullWidth
                            startAdornment={<InputAdornment position="start">
                                <button onClick={
                                    e => {
                                        changeShowPasword(!showPassword)
                                    }
                                } type="button" className="btn p-0" >
                                    {showPassword ? <VisibilityOff
                                        style={{ color: formik?.errors?.password ? "red" : "green" }} /> :
                                        <Visibility style={{ color: formik?.errors?.password ? "red" : "green" }} />}
                                </button>
                            </InputAdornment>}
                            name="password" placeholder="Password..."
                            type={showPassword ? "text" : "password"}
                            className={classes.textField} />
                    </FormControl>
                    <p>
                        {formik?.errors?.password ? <span className="w3-text-red" >
                            {formik.errors.password}</span> : null}</p>

                    <FormControl fullWidth>
                        <Input onChange={formik.handleChange} value={formik.values.repass} fullWidth
                            startAdornment={<InputAdornment position="start">
                                <button onClick={
                                    e => {
                                        changeShowRePass(!showRePass)
                                    }
                                } type="button" className="btn p-0" >
                                    {showRePass ? <VisibilityOff
                                        style={{ color: formik?.errors?.repass ? "red" : "green" }} /> :
                                        <Visibility style={{ color: formik?.errors?.repass ? "red" : "green" }} />}</button> </InputAdornment>}
                            name="repass" placeholder="Repeat password..."
                            type={showRePass ? "text" : "password"}
                            className={classes.textField} />
                    </FormControl>

                    <p>
                        {formik?.errors?.repass ? <span className="w3-text-red">
                            {formik.errors.repass}</span> : null}</p>

                    <p style={{ width: "100%", textAlign: "center" }}>
                        <Button disabled={(!(code && formik.isValid))} type="submit" variant="contained"
                            color="primary" >{
                                ((networkState.Loading)) ?
                                    "Register" : <FontAwesomeIcon
                                        spin icon={faSpinner} />} </Button>
                    </p>
                </form>
            </>}
        </Container>
    </>

}