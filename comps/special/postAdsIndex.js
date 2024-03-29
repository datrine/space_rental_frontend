import { Container, Grid, Button, Paper, Typography } from "@material-ui/core";
import Link from 'next/link';
import { useState, useEffect, useContext } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import View from '../view';
import { ProfileMenu } from './dashboard/resuables';
import { isProfileComplete } from "../../utils/utilFns";
import { UserSessionContext } from "../../pages/_app";
import { profileFetcher } from "../resuables/my_useswr";
import { PCViewTemplate } from "../general/pcview";


let PostAdsIndex = ({ csrfToken, hookChangeRegState, callbackUrl }) => {
    return <><View mobileView={<MobileView />} pcView={<PCView />} />
    </>
}

function PCView() {
    let { session } = useContext(UserSessionContext);
    let { profileFromServer, loading, error } = profileFetcher(session.user.id);
    let view = null
    if (loading) {
        view = <>
            <p style={{ textAlign: "center", marginTop: "100px" }}>Loading profile data</p>
        </>
    }
    else if (error) {
        view = <>
            <p style={{ textAlign: "center", marginTop: "100px" }}>Error loading profile data</p>
        </>
    }
    else if (!profileFromServer) {
        view = <>
            <p style={{ textAlign: "center", marginTop: "100px" }}>Profile data not found</p>
        </>
    }
    else if (profileFromServer) {
        let complete = isProfileComplete(profileFromServer)
        view = <>{complete ? <PostView /> :
            <Container style={{ textAlign: "center", }}>
                <p style={{ textAlign: "center" }}>Complete your profile</p>
                <p style={{ textAlign: "center" }}>
                    <a className="w3-btn w3-cyan" href="/profile" >Return to complete your profile</a>
                </p>
            </Container>}

        </>
    }
    let comp = <>
        <Grid item container >
            <Grid md={4} item >
                {view}
            </Grid>
        </Grid>
    </>
    return <>
        <PCViewTemplate comp={comp} />
    </>
}

function MobileView() {
    let { session } = useContext(UserSessionContext);
    let { profileFromServer, loading, error } = profileFetcher(session.user.id);
    let view = null
    if (loading) {
        view = <>
            <p style={{ textAlign: "center", marginTop: "100px" }}>Loading profile data</p>
        </>
    }
    else if (error) {
        view = <>
            <p style={{ textAlign: "center", marginTop: "100px" }}>Error loading profile data</p>
        </>
    }
    else if (!profileFromServer) {
        view = <>
            <p style={{ textAlign: "center", marginTop: "100px" }}>Profile data not found</p>
        </>
    }
    else if (profileFromServer) {
        let complete = isProfileComplete(profileFromServer)
        view = <>{complete ? <PostView /> :
            <Container style={{ textAlign: "center", marginTop: "100px" }}>
                <p style={{ textAlign: "center" }}>Complete your profile</p>
                <p style={{ textAlign: "center" }}>
                    <a className="w3-btn w3-cyan" href="/profile" >Return to complete your profile</a>
                </p>
            </Container>}

        </>
    }
    return <>
        <ProfileMenu />
        {view}
    </>
}

function PostView(params) {
    return <>
        <h2 style={{ color: "#60941A", textAlign: "center", marginTop: "50px" }}>Post An Ad</h2>
        <Grid direction="column" alignItems="center" justify="space-around" container
            style={{ height: "80vh", }} >

            <Link href="/postads/space?spaceType=residence" ><Paper style={{ width: "80vw", paddingLeft: 10, paddingTop: 5, paddingBottom: 5 }}>

                <h3 style={{ color: "#60941A", fontSize: "2em" }} >Room</h3>
                <Grid container >
                    <Grid xs={9} item >
                        <Typography>Advertise on or more rooms in property to a potential tenant.
                          </Typography>
                    </Grid>
                    <Grid xs={3} item container justify="center"  >
                        <img height={50} width={50} src="/icons/postads/ic_baseline-bedroom-parent.svg" />
                    </Grid>
                </Grid>
            </Paper></Link>

            <Link href="/postads/space?spaceType=residence"><Paper style={{ width: "80vw", paddingLeft: 10, paddingTop: 5, paddingBottom: 5 }}>
                <h3 style={{ color: "#60941A", fontSize: "2em" }} >Entire Building</h3>
                <Grid container >
                    <Grid xs={9} item >
                        <Typography>Advertise an apartment or entire house for
                        potential tenants to stay on contract
                          </Typography>
                    </Grid>
                    <Grid xs={3} item container justify="center"  >
                        <img height={50} width={50} src="/icons/postads/fa-solid_house-user.svg" />
                    </Grid>
                </Grid>
            </Paper>
            </Link>

            <Link href="/postads/space?spaceType=office">
                <Paper style={{ width: "80vw", paddingLeft: 10, paddingTop: 5, paddingBottom: 5 }}>
                    <h3 style={{ color: "#60941A", fontSize: "2em" }} >Office Space</h3>
                    <Grid container >
                        <Grid xs={9} item >
                            <Typography>Advertise an office or entire working space
                            property for potential tenants
                          </Typography>
                        </Grid>
                        <Grid xs={3} item container justify="center" >
                            <img height={50} width={50} src="/icons/postads/icomoon-free_office.svg" />
                        </Grid>
                    </Grid>
                </Paper>
            </Link>
            <Grid item container ></Grid>
        </Grid>


        <h2 style={{ textAlign: "center", marginTop: "10px" }}>Create An Ad</h2>

        <h4 style={{ textAlign: "center", marginTop: "0px" }}>
            Need A room/work space with special needs?</h4>

        <h5 style={{ textAlign: "center", marginTop: "0px" }}>
            Let us help your search for the house of your dreams</h5>
    </>
}

export { PostAdsIndex }