import { Button, Container, Grid, Input } from "@material-ui/core";
import { createContext, useEffect, useState } from "react"
import AdminDashboard from "../../comps/admin";
let AdminContext = createContext({ adminData: {}, changeContext: () => { } })
export default function AdminApp() {
    let [isLogged, changeLoginState] = useState(false);
    let [adminData, changeAdminData] = useState(null);
    let sess = sessionStorage.getItem("myspaceAdminInfo")
    let myspaceAdminInfo = sess && JSON.parse(sess) || {};

    useEffect(() => {
        if (!adminData || typeof adminData !== "object") {
            return
        }
        if (adminData.user.id) {
            changeLoginState(true)
        }
    }, [adminData]);

    useEffect(() => {
        if (!myspaceAdminInfo || !myspaceAdminInfo.jwt || !myspaceAdminInfo.profileId) {
            sessionStorage.removeItem("myspaceAdminInfo");
            return changeLoginState(false);
        }
        if (adminData) {
            if (myspaceAdminInfo.jwt === adminData.jwt) {
                return changeLoginState(true)
            }
        }
        (async () => {
            try {
                
            let user = await refreshAdminToken(myspaceAdminInfo);
            console.log(user)
            let data = { user, jwt: myspaceAdminInfo.jwt }
            changeAdminData(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [myspaceAdminInfo.jwt]);
    if (!myspaceAdminInfo.user) {
        if (!isLogged) {
            return <>
                <AdminLogin hookChangeAdminData={changeAdminData} />
            </>
        }
    }
    if (!isLogged) {
        return <><p>Loading admin data...</p></>
    }
    return <AdminDashboard />

}

function AdminLogin({ hookChangeAdminData }) {
    let [identifierState, changeIdentifierState] = useState("");
    let [passwordState, changePasswordState] = useState("");
    return <>
        <Container style={{ height: "100vh" }} >
            <Grid container justify="center" alignItems="center" style={{ height: "100%" }} >
                <Grid item container xs={10} sm={6} md={3} justify="center" direction="column" >
                    <h3 style={{ textAlign: "center" }}>Admin Login</h3>
                    <p><Input value={identifierState}
                        onChange={
                            e => {
                                changeIdentifierState(e.target.value)
                            }
                        }
                        placeholder="Please enter username/email" fullWidth /></p>
                    <p> <Input value={passwordState}
                        onChange={
                            e => {
                                changePasswordState(e.target.value)
                            }
                        }
                        placeholder="Please enter password" fullWidth /></p>
                    <p><Button color="primary" variant="contained" onClick={
                        async e => {
                            try {
                                let res = await loginAdmin({
                                    identifier: identifierState,
                                    password: passwordState
                                });
                                console.log(res)
                                hookChangeAdminData(res);
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    } >Login</Button></p>
                </Grid>
            </Grid>
        </Container>
    </>
}

async function loginAdmin({ identifier, password }) {
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/userprofiles/admin/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ identifier, password })
        });
        if (!res.ok) {
            throw await res.json()
        }
        let data = await res.json();
        sessionStorage.setItem("myspaceAdminInfo", JSON.stringify({
            jwt: data.jwt,
            profileId: data.user.profileId
        }));
        return data;
    } catch (error) {
        throw error
    }
}


async function refreshAdminToken({ jwt, profileId }) {
    try {
        let url = `${process.env.NEXT_PUBLIC_CMS_URL}/userprofiles/${profileId}`;
        console.log(jwt)
        let res = await fetch(url, {
            method: "get",
           // mode: "cors",
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });
        if (!res.ok) {
            throw await res.json()
        }
        let data = await res.json();
        console.log(data)
        sessionStorage.setItem("myspaceAdminInfo", JSON.stringify({
            jwt,
            profileId: data.profileId
        }))
        return data;
    } catch (error) {
        throw error
    }
}
export { AdminContext }