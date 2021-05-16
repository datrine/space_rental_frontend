import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import View from "../../../view";
import { useRouter } from "next/router";
import _ from "lodash";
import { space, session } from "../../../../utils/models/exportModels";
import useSWR from 'swr'
import { useSession } from "next-auth/client";
import { getImgUrl } from "../../../../utils/utilFns";
import { UserSessionContext } from "../../../../pages/_app";

function RenterProfile() {
    let ctx = useContext(UserSessionContext)
    let { session: { user } } = ctx;
    let { prof_pic } = user
    return <>
        <Container style={{marginTop:"10px"}} >
            <Grid container>
                <Grid item container xs={3} >
                    <img className="rounded-circle" height={70} width={70}
                    src={getImgUrl(prof_pic) || "/user_profile.png"} />
                </Grid>
                <Grid item container xs={8}>
                    <Biodata/>
                </Grid>
            </Grid>
        </Container>
    </>
}

function Biodata(params) {
    let ctx = useContext(UserSessionContext)
    let { session: { user } } = ctx;
    let name=(user.f_name||user.l_name)||user.username
    return<>
    <h3>{name}</h3>
    </>
}

export { RenterProfile }