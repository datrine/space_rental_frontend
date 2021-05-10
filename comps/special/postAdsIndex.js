import { Container, Grid, Button, Paper, Typography } from "@material-ui/core";
import Link from 'next/link';
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/client";
import View from '../view';
import { ProfileMenu } from './dashboard/resuables';


let PostAdsIndex = ({ csrfToken, hookChangeRegState, callbackUrl }) => {
    let [session, loading] = useSession()
    let view = null
    view = <><div className="">Fetching...</div></>
    if (session) {
        view = <View mobileView={<MobileView />} />
        return view
    }
    return <><View mobileView={<MobileView />} />
    </>
}

function MobileView() {
    return <>
        <ProfileMenu />
        <PostView />
    </>
}

function PostView(params) {
    return <>
        <h2 style={{ color: "#60941A", textAlign: "center", marginTop: "50px" }}>Post An Ad</h2>
        <Grid direction="column" alignItems="center" justify="space-around" container
            style={{ height: "80vh", width: "100vw", }} >

            <Link href="/postads/space?spaceType=residence" ><Paper style={{ width: "80vw", paddingLeft: 10, paddingTop: 5, paddingBottom: 5 }}>

                <h3 style={{ color: "#60941A", fontSize: "2em" }} >Room</h3>
                <Grid container >
                    <Grid xs={9} item >
                        <Typography>Advertise on or more rooms in property to a potential tenant.
                          </Typography>
                    </Grid>
                    <Grid xs={3} item container justify="center"  >
                        <Image height={50} width={50} src="/icons/postads/ic_baseline-bedroom-parent.svg" />
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
                        <Image height={50} width={50} src="/icons/postads/fa-solid_house-user.svg" />
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
                            <Image height={50} width={50} src="/icons/postads/icomoon-free_office.svg" />
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