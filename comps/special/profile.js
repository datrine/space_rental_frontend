import Link from 'next/link';
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Dialog, DialogTitle, FormControl, Grid, IconButton, Input, InputAdornment, makeStyles, Typography } from "@material-ui/core"
import { Announcement, ArrowBack, Chat, Edit, Email, Label, Person, PersonAdd, Phone, PowerOff, Settings, Visibility, } from "@material-ui/icons"
import View from '../view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFile, faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Loading, LogoSVG, MySelect, SessionState } from '../reusables';
import { uploader, stateMgr, generalPutAPI } from '../../utils/utilFns';
import { OpenedMenu } from "./dashboard/opened_menu"
import { useFormik } from 'formik';
import { registerValidator } from '../../utils/validators';
import { ProfileMenu } from './dashboard/resuables';
import { useRef } from 'react';

let states = stateMgr()

let Comp_Profile = ({ csrfToken, hookChangeRegState, callbackUrl }) => {
    let [session, loading] = useSession()
    let view = null
    view = <><div className="">Fetching Dashboard data</div></>
    if (session) {
        view = <><View mobileView={<MobileView />} /></>
        return view
    }
    return <><><View mobileView={<MobileView />} /></>
    </>
}

function MobileView() {
    return <>
        <ProfileMenu />
        <ProfileForm />
    </>
}

const useStyles = makeStyles((theme) => ({
    container: {
    },
    form: {
        marginTop: "30px"
    },
    textField: {
        marginBottom: "20px",
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

let ProfileForm = ({ ...propsFromParent }) => {
    let [session, loading] = useSession()
    if (session) {
        let user = session.user
        let formik = useFormik({
            initialValues: {
                f_name: user.f_name || "",
                l_name: user.l_name || "",
                m_name: user.m_name || "",
                prof_pic: user.prof_pic.formats.large.url || "/user_profile.png",
                address: user.address || "",
                dob: user.dob,
                email: user.email,
                password: user.password || "",
                phonenum: user.phonenum || "",
                username: user.username,
                gender: user.gender||"male",
                repass: user.password || ""
            },
            validate: (values) => {
                return new Promise(async (res, rej) => {
                    let errors = {}
                    let valObj = await registerValidator(values)
                    let { valid, errorList, instance } = valObj
                    if (!valid) {
                        for (const errorObj of errorList) {
                            errors[errorObj.prop] = errorObj.msg;
                        }
                    }
                    console.log(errors)
                    res(errors)
                })
            },
            onSubmit: (values, actions) => {
                (async () => {
                    let res = await fetch(`/api/users/${session.user.id}`, {
                        method: "POST",
                        body: JSON.stringify(values)
                    });
                    if (res.ok) {
                        let data = await res.json();
                        let { err, user, jwt } = data;
                        if (err) {
                            handleFail(err)
                        }
                        if (user) {
                            handleSuccess(user);
                        }

                    }
                })()
            }
        })
        let [responseView, changeResponseView] = useState(null)
        let handleSuccess = (user) => {
            let view = <SuccessReg hookChangeResponseView={changeResponseView} />
            changeResponseView(view)
        }
        let handleFail = (err) => {
            let view = <FailReg hookChangeResponseView={changeResponseView} />
            changeResponseView(view)
        }
        return <>
            <Container style={{ marginTop: "70px" }} >
                <form className="container-fluid mt-2" onSubmit={
                    e => {
                        e.preventDefault()
                        return formik.handleSubmit(e)
                    }} >
                    <ProfilePicture prof_pic={formik.values.prof_pic} />

                    <Firstname handleChange={formik.handleChange} f_name={formik.values.f_name} />

                    <Lastname handleChange={formik.handleChange} l_name={formik.values.l_name} />

                    <EmailForm handleChange={formik.handleChange}
                        email={formik.values.email} emailError={formik.errors.email} />

                    <Username handleChange={formik.handleChange}
                        username={formik.values.username} usernameError={formik.errors.username} />

                    <GenderSelect genderProps={formik.values.gender}
                        changeGenderSelectedProps={formik.handleChange} />

                    <PhoneNum handleChange={formik.handleChange}
                        phonenum={formik.values.phonenum} phonenumError={formik.errors.phonenum} />

                    <p style={{ width: "100%", textAlign: "center" }}>
                        <Button disabled={!formik.isValid} type="submit" variant="contained"
                            color="primary" >{formik.isSubmitting ? <FontAwesomeIcon
                                spin icon={faSpinner} /> : "Update"} </Button>
                    </p>
                </form>
            </Container>
            {responseView}
        </>

    }

}

let SuccessReg = ({ openDialog, hookChangeResponseView }) => {
    let [open, setOpen] = useState(true)
    let handleClose = (e) => {
        console.log("Closed")
        hookChangeResponseView(null)
        window.location = "/dashboard";
    }
    return <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">User Register Success</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    User registered.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Ok
          </Button>
            </DialogActions>
        </Dialog>
    </>
}

function ProfilePicture({ prof_pic }) {
    let [session, loading] = useSession()
    if (session) {
        let { user } = session
        return <>
            <title>Profile</title>
            <FormControl>
                <Container>
                    <Grid direction="column" container >
                        <img style={{ borderRadius: "50%" }} src={prof_pic || "/user_profile.png"} width={250} height={250} />
                        <span style={{ marginTop: 10 }}>
                            <label className="w3-green w3-btn"
                                style={{
                                    paddingLeft: 5, paddingRight: 5, paddingTop: 5,
                                    paddingBottom: 5, borderRadius: 5
                                }} >
                                <Input type="file" onChange={
                                    async e => {
                                        try {
                                            let files = e.target.files
                                            let { data: dataUploaded, err } = await uploader({
                                                files,
                                                ref: "file",
                                                refId: user.userId,
                                                field: "prof_pic",
                                                source: "upload",
                                            })
                                            if (dataUploaded) {
                                                console.log("syssgaysaygasy")
                                                let { data, err } = await generalPutAPI({
                                                    model: "userprofiles",
                                                    entryId: user.profileId,
                                                    dataReq: { prof_pic: dataUploaded[0] }
                                                })
                                                if (data) {
                                                    await signIn("credentials", {
                                                        strapiToken: user.jwt,
                                                        strapiProfileId: user.profileId,
                                                        callbackUrl: "/profile",
                                                    })
                                                }
                                            }

                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }
                                } style={{ display: "none" }} />
                                <span style={{ marginRight: "10px" }} >
                                    <FontAwesomeIcon icon={faImage} />
                                </span>
                                <strong>Change Image </strong>
                            </label>
                        </span>
                    </Grid>
                </Container>
            </FormControl>
        </>

    }
}

function Firstname({ f_name, handleChange }) {
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <Input onChange={handleChange} value={f_name}
                placeholder="First name ..." fullWidth
                startAdornment={
                    <InputAdornment position="start">
                        <label> <Person /> *</label></InputAdornment>
                } name="f_name"
                className={classes.textField} />
        </FormControl></>
}

function Lastname({ l_name, handleChange }) {
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <Input onChange={handleChange} value={l_name}
                placeholder="Last name ..." fullWidth
                startAdornment={
                    <InputAdornment position="start">
                        <label> <Person /> *</label></InputAdornment>
                } name="f_name"
                className={classes.textField} />
        </FormControl></>
}

function EmailForm({ email, emailError, handleChange }) {
    let classes = useStyles()
    let [session, loading] = useSession()
    if (session) {
        return <>
            <FormControl fullWidth>
                <Input disabled onChange={handleChange} value={email}
                    placeholder="Email..." fullWidth
                    startAdornment={
                        <InputAdornment position="start">
                            <label> <Email /> *</label></InputAdornment>
                    } type="email" name="email"
                    className={classes.textField} />
            </FormControl>
          
                {emailError && email !== session.user.email ?  <p> <span className="w3-text-red" >
                    {emailError}</span> </p>: null}
        </>

    }
    return null
}

function Username({ username, usernameError, handleChange }) {
    let classes = useStyles()
    let [session, loading] = useSession()
    if (session) {
        return <>
            <FormControl fullWidth>
                <Input disabled onChange={handleChange} value={username}
                    placeholder="Username..." fullWidth
                    startAdornment={
                        <InputAdornment position="start">
                            <label><PersonAdd /> *</label></InputAdornment>
                    } name="username"
                    className={classes.textField} />
            </FormControl>

            {usernameError && session.user.username !== username ? <p>
                <span className="w3-text-red" >
                    {usernameError}</span>
            </p> : null}</>
    }
    return null
}

function GenderSelect({ genderProps, changeGenderSelectedProps }) {
    return <>
        <MySelect labelTitle="Select Gender" valueProps={genderProps} selectMenuArr={[
            { value: "male", text: "Male" },
            { value: "female", text: "Female" },
            { value: "binary", text: "Binary" },
        ]} handleChangeProps={
            e => {
                changeGenderSelectedProps(e.target.value)
            }
        } />
    </>
}

function PhoneNum({ phonenum, phonenumError, handleChange }) {
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <Input onChange={handleChange} value={phonenum} fullWidth
                startAdornment={<InputAdornment position="start">
                    <Phone /></InputAdornment>}
                name="phonenum" placeholder="Phone number..."
                className={classes.textField} />
        </FormControl>
        <p>
            {phonenumError ? <span className="w3-text-red" >
                {phonenumError}</span> : null}</p>
    </>
}

let FailReg = ({ openDialog, hookChangeResponseView }) => {
    let [open, setOpen] = useState(true)
    let handleClose = (e) => hookChangeResponseView(null)
    return <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">User Registration Error</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Unable to register. Please reload page.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
          </Button>
            </DialogActions>
        </Dialog>
    </>
}

let quickUpdate = async () => {

}

export { Comp_Profile }