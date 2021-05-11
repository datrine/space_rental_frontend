import Link from 'next/link';
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import {
    AppBar, Container, Tab, Typography, Tabs, TextField, makeStyles, Box,
    InputAdornment, Input, FormControl, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText
} from '@material-ui/core';
import { useFormik } from 'formik';
import { TabPanel } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckCircleOutline, Email, Label, PersonAdd, Phone, Visibility, VisibilityOff } from '@material-ui/icons';
import validator from 'validator';
import { fetchError, registerValidator } from '../../utils/validators';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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

let Comp_Register = ({ ...propsFromParent }) => {
    let classes = useStyles()
    let [showPassword, changeShowPasword] = useState(false)
    let [showRePass, changeShowRePass] = useState(false)
    let [isFailed, changeIsFailed] = useState(false)
    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            phonenum: "",
            username: "",
            repass: ""
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
                try {
                    let res = await fetch("/api/register", {
                        method: "POST",
                        body: JSON.stringify(values)
                    });
                    if (res.ok) {
                        let data = await res.json();
                        let { err, user } = data;
                        if (err) {
                            handleFail(err)
                            changeIsFailed(true)
                        }
                        if (user) {

                            handleSuccess(user);
                        }

                    }
                } catch (error) {
                    console.log(error)
                    changeIsFailed(true)
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
    let isMinimal = !!(formik.values.email && formik.values.username && formik.values.password);
    return <>
        <Container>
            <form className="container-fluid mt-2" onSubmit={
                e => {
                    e.preventDefault()
                    console.log("registering")
                    return formik.handleSubmit(e)
                }} style={{ maxWidth: "350px" }} >
                <FormControl fullWidth>
                    <Input onChange={formik.handleChange} value={formik.values.email}
                        placeholder="Email..." fullWidth
                        startAdornment={
                            <InputAdornment position="start">
                                <Email style={{ color: formik?.errors?.email ? "red" : "green" }} /></InputAdornment>
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
                                <PersonAdd
                                    style={{ color: formik?.errors?.username ? "red" : "green" }} />
                            </InputAdornment>
                        } name="username" className={classes.textField} />
                </FormControl>
                <p>
                    {formik?.errors?.username ? <span className="w3-text-red" >
                        {formik?.errors?.username}</span> : null}</p>

                <FormControl fullWidth>
                    <Input onChange={formik.handleChange} value={formik.values.phonenum} fullWidth
                        startAdornment={<InputAdornment position="start">
                            <Phone style={{ color: formik?.errors?.phonenum ? "red" : "green" }} />
                        </InputAdornment>}
                        name="phonenum" placeholder="Phone number..."
                        className={classes.textField} />
                </FormControl>
                <p>
                    {formik?.errors?.phonenum ? <span className="w3-text-red" >
                        {formik?.errors?.phonenum}</span> : null}</p>

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
                    <Button disabled={(isMinimal && !formik.isValid)} type="submit" variant="contained"
                        color="primary" >{
                            (!formik.isSubmitting || isFailed) ? "Register" : <FontAwesomeIcon
                                spin icon={faSpinner} />} </Button>
                </p>
            </form>
            <div className="container-fluid mt-2" style={{ display: "none" }}>
                <div
                    style={{
                        width: "100%", paddingLeft: "10px",
                        borderWidth: "2px", borderStyle: "solid"
                    }}>
                    <p>
                        <button className="btn" style={{
                            width: "40px", height: "40px",
                            borderRadius: "50%", backgroundColor: "#ededed"
                        }}>
                        </button>
                        <span style={{ fontSize: "20px" }} className="ml-2"> Google sign up</span>
                    </p>
                    <p>
                        <button className="btn" style={{
                            width: "40px", height: "40px",
                            borderRadius: "50%", backgroundColor: "#ededed"
                        }}>
                        </button>
                        <span style={{ fontSize: "20px" }} className="ml-2"> Facebook sign up</span>
                    </p>
                </div>
            </div>
        </Container>
        {responseView}
    </>
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
                    Please verify your email to ensure you can log in.
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

export { Comp_Register }