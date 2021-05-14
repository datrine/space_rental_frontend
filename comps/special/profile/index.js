import Link from 'next/link';
import Image from "next/image"
import { useState, useEffect, useContext } from "react"
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
import { ProfileContext, UserSessionContext } from '../../../utils/contexts';
import BankDetails from './bank_details';
let Comp_Profile = ({ csrfToken, hookChangeRegState, callbackUrl }) => {
    return <>
        <View mobileView={<MobileView />} />
    </>
}

function MobileView() {
    return <>
        <ProfileMenu />
        <ProfileForm />
    </>
}

let ProfileForm = ({ ...propsFromParent }) => {
    let { session, changeContext: changeSessionContext } = useContext(UserSessionContext)
    let { profile, changeContext: changeProfileContext } = useContext(ProfileContext)
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
                async e => {
                    e.preventDefault()
                    console.log(profile)
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
                }
            } >
                <ProfilePicture />

                <Firstname />

                <Lastname />

                <EmailForm />

                <Username />

                <GenderSelect />

                <PhoneNum />


<BankDetails/>
                <p style={{ width: "100%", textAlign: "center" }}>
                    <Button disabled={false}
                        type="submit" variant="contained"
                        color="primary" >{false ? <FontAwesomeIcon
                            spin icon={faSpinner} /> : "Update"} </Button>
                </p>
            </form>
        </Container>
        {responseView}
    </>

}


let SuccessReg = ({ openDialog, hookChangeResponseView }) => {
    let [open, setOpen] = useState(true)
    let handleClose = (e) => {
        autoSignIn({ callbackUrl: "/profile" })
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