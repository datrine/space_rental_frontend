import Link from 'next/link';
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import {
    Accordion, AccordionDetails, AccordionSummary, Button, Container, Dialog,
    DialogContent, DialogActions, DialogTitle, FormControl, Grid, IconButton, Input, InputAdornment, makeStyles, Typography
} from "@material-ui/core"
import { Announcement, ArrowBack, Chat, CheckCircle, Edit, Email, Label, Person, PersonAdd, Phone, PowerOff, Settings, Visibility, } from "@material-ui/icons"
import View from '../../view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFile, faImage, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Loading, LogoSVG, MySelect, SessionState } from '../../reusables';
import { uploader, stateMgr, generalPutAPI, autoSignIn } from '../../../utils/utilFns';
import { OpenedMenu } from "../dashboard/opened_menu"
import { useFormik } from 'formik';
import { registerValidator } from '../../../utils/validators';
import { ProfileMenu } from '../dashboard/resuables';
import { useRef } from 'react';
import ProfilePicture from "./prof_pic"
import Firstname from './f_name';
import EmailForm from './email';
import Username from './username';
import GenderSelect from './gender';
import PhoneNum from './phonenum';
import Lastname from './l_name';
//import Lastname from './l_name';
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

let ProfileForm = ({ ...propsFromParent }) => {
    let [session, loading] = useSession()
        let [responseView, changeResponseView] = useState(null)
    if (session) {
        let user = session.user
        let formik = useFormik({
            initialValues: {
                f_name: user.f_name || "",
                l_name: user.l_name || "",
                m_name: user.m_name || "",
                address: user.address || "",
                dob: user.dob,
                email: user.email,
                password: user.password || "",
                phonenum: user.phonenum || "",
                username: user.username,
                gender: user.gender || "female",
                repass: user.password || ""
            },
            validate: (values) => {
                console.log("gcffg")
                /**  return new Promise(async (res, rej) => {
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
                 })*/
            },
            onSubmit: (values, actions) => {
                (async () => {
                    console.log(values)
                    let res = await fetch(`/api/profiles/${session.user.profileId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
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
                    <ProfilePicture />

                    <Firstname handleChange={formik.handleChange} f_name={formik.values.f_name} />

                    <Lastname handleChange={formik.handleChange} l_name={formik.values.l_name} />

                    <EmailForm handleChange={formik.handleChange}
                        email={formik.values.email} emailError={formik.errors.email} />

                    <Username handleChange={formik.handleChange}
                        username={formik.values.username} usernameError={formik.errors.username} />

                    <GenderSelect genderProps={formik.values.gender}
                        handleChangeProps={formik.handleChange} />

                    <PhoneNum handleChange={formik.handleChange}
                        phonenum={formik.values.phonenum} phonenumError={formik.errors.phonenum} />

                    <p style={{ width: "100%", textAlign: "center" }}>
                        <Button disabled={!formik.isValid && !formik.isSubmitting}
                            type="submit" variant="contained"
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
        autoSignIn({callbackUrl:"/profile"})
        hookChangeResponseView(null)
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
                <CheckCircle fontSize="large" style={{ color: "green" }} />
                <Container >
                    <h3 style={{ textAlign: "center" }} >Successful!</h3>
                    <h4 style={{ textAlign: "center" }}>Your Profile Has Been Successfully Updated</h4>
                </Container>
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

let quickUpdate = async () => {

}

export { Comp_Profile }