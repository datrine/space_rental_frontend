
import { useState, useEffect, useContext } from "react"
import {
    Button, Container, Dialog,
    DialogContent, DialogActions, DialogTitle, Grid,
} from "@material-ui/core"
import View from '../../view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, } from '@fortawesome/free-solid-svg-icons';
import { autoSignIn, appColor } from '../../../utils/utilFns';
import { ProfileMenu } from '../dashboard/resuables';
import ProfilePicture from "./prof_pic"
import Firstname from './f_name';
import EmailForm from './email';
import Username from './username';
import GenderSelect from './gender';
import PhoneNum from './phonenum';
import Lastname from './l_name';
import BankDetails from './bank_details';
import { Calendar } from "./dob";
import { UserSessionContext } from "../../../pages/_app";
import { ProfileContext } from "../../../pages/profile";
import { CheckCircle } from "@material-ui/icons";
import Occupation from "./occupation";
import Address from "./address";

let Comp_Profile = ({ }) => {
    return <>
        <View mobileView={<MobileView />} />
    </>
}

function MobileView() {
    return <>
        <ProfileMenu />
        <Body />
    </>
}

function Body() {
    return <>
        <Container style={{ marginTop: "70px", padding: 0 }} >
            <Grid justify="space-evenly" alignItems="center"
                container style={{ backgroundColor: appColor, height: 100, color: "white" }}>
                <Grid item container justify="center" alignItems="center" >
                    <img src="/profile/header.svg" height={50} width={50} style={{ marginRight: "20px" }} />
                    <span style={{ fontWeight: "500px", fontSize: "2.5em" }} >My Profile</span>
                </Grid>
                <Grid item container justify="center" >
                    <h4>Keep Your Profile Update</h4>
                </Grid>
            </Grid>
            <Container style={{ marginTop: "20px" }}>

                <ProfileForm />
            </Container>
        </Container>
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
        <Container style={{ padding: 0, borderWidth: 1, borderColor: appColor, borderStyle: "solid" }} >
            <h4 style={{ backgroundColor: appColor, color: "white" }}>Profile</h4>
            <form className="container-fluid mt-2" onSubmit={
                async e => {
                    e.preventDefault()
                    console.log(profile)
                    let { email, emailOrUsername, username, ...restOfProfile } = profile
                    let res = await fetch(`/api/profiles/${session.user.profileId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(restOfProfile)
                    });
                    if (res.ok) {
                        let data = await res.json();
                        console.log(data)
                        let { err, profile, jwt } = data;
                        if (err) {
                            handleFail(err)
                        }
                        if (profile) {
                            handleSuccess(profile);
                        }
                    }
                }
            } >
                <ProfilePicture />
                <br />

                <Firstname />
                <br />

                <Lastname />
                <br />

                <EmailForm />
                <br />

                <Username />
                <br />

                <GenderSelect />
                <br />

                <Address />
                <br />

                <PhoneNum />
                <br />

                <Calendar />
                <br />

                <Occupation />
                <br />

                <BankDetails />
                
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