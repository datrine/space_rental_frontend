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
import { Loading, LogoSVG, SessionState } from '../reusables';
import { procSingleFile, uploader, stateMgr } from '../../utils/utilFns';
import { OpenedMenu } from "./dashboard/opened_menu"
import { useFormik } from 'formik';
import { registerValidator } from '../../utils/validators';

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

function ProfileMenu() {
    let [isCollapsed, toggleCollapsed] = useState(true)
    return <>
        <Container style={{ position: "fixed", top: 0, padding: 0 }}>
            <Grid container style={{ padding: 0 }}>

                <IconButton onClick={
                    e => {
                        toggleCollapsed(!isCollapsed)
                    }
                }><FontAwesomeIcon style={{ color: isCollapsed ? "black" : "red" }}
                    icon={isCollapsed ? faBars : faTimes} /></IconButton>
            </Grid>
        </Container>
        {isCollapsed ? null : <OpenedMenu />}
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

        let classes = useStyles()
        let user = session.user
        let formik = useFormik({
            initialValues: {
                f_name: user.f_name,
                l_name: user.l_name,
                m_name: user.m_name,
                prof_pic: user.prof_pic || "/prof_pic.png",
                address: user.address,
                dob: user.dob,
                email: user.email,
                password: user.password,
                phonenum: user.phonenum,
                username: user.username,
                repass: user.password
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
            <Container>
                <form className="container-fluid mt-2" onSubmit={
                    e => {
                        e.preventDefault()
                        return formik.handleSubmit(e)
                    }} >

                    <FormControl>
                        <Container>
                            <Grid direction="column" container >
                                <Image src={formik.values.prof_pic} width={250} height={250} />
                                <span style={{ marginTop: 10 }}>
                                    <span className="w3-green"
                                        style={{
                                            paddingLeft: 5, paddingRight: 5, paddingTop: 5,
                                            paddingBottom: 5, borderRadius: 5
                                        }} >
                                        <Input type="file" onChange={
                                            async e => {
                                                let files = e.target.files
                                                let formData = new FormData()
                                                procSingleFile({ file: files[0], formData, nameOfColumnOnDb: "prof_pic" })
                                            }
                                        } style={{ display: "none" }} />
                                        <IconButton
                                            aria-label="toggle password visibility"
                                        >
                                            <FontAwesomeIcon icon={faImage} />
                                        </IconButton><strong>Change Image </strong>
                                    </span></span>
                            </Grid>
                        </Container>
                    </FormControl>

                    <FormControl fullWidth>
                        <Input onChange={formik.handleChange} value={formik.values.email}
                            placeholder="First name ..." fullWidth
                            startAdornment={
                                <InputAdornment position="start">
                                    <label> <Person /> *</label></InputAdornment>
                            } name="f_name"
                            className={classes.textField} />
                    </FormControl>

                    <FormControl fullWidth>
                        <Input onChange={formik.handleChange} value={formik.values.email}
                            placeholder="Last name ..." fullWidth
                            startAdornment={
                                <InputAdornment position="start">
                                    <label> <Person /> *</label></InputAdornment>
                            } name="f_name"
                            className={classes.textField} />
                    </FormControl>

                    <FormControl fullWidth>
                        <Input onChange={formik.handleChange} value={formik.values.email}
                            placeholder="Email..." fullWidth
                            startAdornment={
                                <InputAdornment position="start">
                                    <label> <Email /> *</label></InputAdornment>
                            } type="email" name="email"
                            className={classes.textField} />
                    </FormControl>
                    <p>
                        {formik?.errors?.email ? <span className="w3-text-red" >
                            {formik?.errors?.email}</span> : null}</p>

                    <FormControl fullWidth>
                        <Input onChange={formik.handleChange} value={formik.values.username}
                            placeholder="Username..." fullWidth
                            startAdornment={
                                <InputAdornment position="start">
                                    <label><PersonAdd /> *</label></InputAdornment>
                            } name="username"
                            className={classes.textField} />
                    </FormControl>

                    <p>
                        {formik?.errors?.username ? <span className="w3-text-red" >
                            {formik?.errors?.username}</span> : null}</p>

                    <FormControl fullWidth>
                        <Input onChange={formik.handleChange} value={formik.values.phonenum} fullWidth
                            startAdornment={<InputAdornment position="start">
                                <Phone /></InputAdornment>}
                            name="phonenum" placeholder="Phone number..."
                            className={classes.textField} />
                    </FormControl>

                    <p>
                        {formik?.errors?.phonenum ? <span className="w3-text-red" >
                            {formik?.errors?.phonenum}</span> : null}</p>

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

export { Comp_Profile }