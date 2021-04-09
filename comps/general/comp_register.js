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
import { Email, Label, PersonAdd, Phone, Visibility } from '@material-ui/icons';
import validator from 'validator';
import { fetchError, registerValidator } from '../../utils/validators';

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
                let res = await fetch("/api/register", {
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
                    console.log("registering")
                    return formik.handleSubmit(e)
                }} >
                <FormControl fullWidth>
                    <Input onChange={formik.handleChange} value={formik.values.email}
                        placeholder="Email..." fullWidth
                        startAdornment={
                            <InputAdornment position="start">
                                <Email /></InputAdornment>
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
                                <PersonAdd /></InputAdornment>
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
                    {formik?.errors?.password ? <span className="w3-text-red" >
                        {formik.errors.password}</span> : null}</p>

                <FormControl fullWidth>
                    <Input onChange={formik.handleChange} value={formik.values.repass} fullWidth
                        startAdornment={<InputAdornment position="start">
                            <button type="button" className="btn p-0" >
                                <Visibility /></button> </InputAdornment>}
                        name="repass" placeholder="Repeat password..." type="password"
                        className={classes.textField} />
                </FormControl>
                <p>
                    {formik?.errors?.repass ? <span className="w3-text-red">
                        {formik.errors.repass}</span> : null}</p>

                <p style={{ width: "100%", textAlign: "center" }}>
                    <Button disabled={!formik.isValid} type="submit" variant="contained"
                        color="primary" > Register</Button>
                </p>
            </form>
            <div className="container-fluid mt-2">
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

export { Comp_Register }