import Link from 'next/link';
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { AppBar, Container, Tab, Typography, Tabs, TextField, makeStyles, Box } from '@material-ui/core';
import { useFormik } from 'formik';
import { TabPanel } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    form: {
        marginTop: "30px"
    },
    textField: {
        display: "block",
        width: "80%",
        marginBottom: "25px",
        paddingLeft: "5px",
        marginLeft: "10%",
        fontSize: "25px",
        borderWidth: 1,
        borderRadius: "2px"
    },
    formDiv: {
        width: "80%",
        marginBottom: "25px",
        marginLeft: "10%",
    },
}));

let Comp_Login = ({ ...propsFromParent }) => {
    let classes = useStyles()
    let formik = useFormik({
        initialValues: {
            email: ""
        }
    })
    return <>
        <Container>
            <form className="container-fluid mt-5" >
                <input placeholder="Email/username..."
                    className=" w3-input w3-border w3-border-black mb-5"
                    style={{ width: "80%", marginLeft: "10%" }} />

                <input placeholder="Password..." type="password"
                    className=" w3-input w3-border w3-border-black mb-5"
                    style={{ width: "80%", marginLeft: "10%" }} />

                <p style={{ textAlign: "right", width: "80%", marginLeft: "10%" }}>
                    <button className="btn" style={{ fontSize: "25px", textDecoration: "underline" }}>
                        Forget Password?
                        </button>
                </p>
                <div style={{ width: "80%", marginLeft: "10%" }}>
                    <label>
                        <input type="checkbox" className="w3-check" />
                        <span style={{ fontSize: "25px", marginLeft: "10px", verticalAlign: "baseline" }}>Remember me</span></label>
                </div>
            </form>
            <div className="container-fluid mt-2">
            <div
             style={{ width: "80%", marginLeft: "10%", paddingLeft: "10px", 
             borderWidth: "2px", borderStyle: "solid" }}>
                <p>
                    <button className="btn" style={{
                        width: "40px", height: "40px",
                        borderRadius: "50%", backgroundColor: "#ededed"
                    }}>
                    </button>
                    <span style={{ fontSize: "20px" }} className="ml-2"> Google sign in</span>
                </p>
                <p>
                    <button className="btn" style={{
                        width: "40px", height: "40px",
                        borderRadius: "50%", backgroundColor: "#ededed"
                    }}>
                    </button>
                    <span style={{ fontSize: "20px" }} className="ml-2"> Facebook sign in</span>
                </p>
            </div>
        </div>
        </Container>
    </>
}


export { Comp_Login }