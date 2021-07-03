import {
    Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, Input,
    makeStyles, MenuItem, Select, TextField
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { MySelect, } from "../../../resuables/index";
import {
    FlatmateDiv, LocationDiv, SpaceAmenityDiv, SpaceAvailabilityDiv, SpaceChargesDiv,
    SpaceRulesDiv, AddImageView
} from "./prop_reusable";
import { getSession, signIn } from "next-auth/client";
import { SpaceContext } from "../../../resuables/contextInterfaces"
import {
    BathroomNumber, SuccessSavedRoom, FailSavedRoom, SittingNumber, NameOfSpace,
    DescOfSpace, KitchenNumber, BedroomNumber, SpaceCategory, SpaceCondition, TypeOfStay
} from "./prop_reusable"

function SpaceFormEdit({ }) {
    let [responseView, changeResponseView] = useState(null)
    let ctx = useContext(SpaceContext)
    let handleSuccess = (user) => {
        let view = <SuccessSavedRoom openDialog={true} hookChangeResponseView={changeResponseView} />
        changeResponseView(view)
    }
    let handleFail = (err) => {
        let view = <FailSavedRoom openDialog={true} hookChangeResponseView={changeResponseView} />
        changeResponseView(view)
    }
    let [] = useState()
    return <>
        <form onSubmit={
            async e => {
                e.preventDefault()
                let values = {
                    ...ctx.spaceData
                }
                //no space info exists for current space=>mode:edit
                if (!ctx.spaceData.id) {
                    throw "No space Id"
                }
                let res = await fetch(`/api/spaces/${ctx.spaceData.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                });
                if (res.ok) {
                    let data = await res.json();
                    let { err, space, jwt } = data;
                    if (err) {
                        console.log(err)
                        handleFail(err)
                    }
                    if (space) {
                        handleSuccess(space);
                        let renterId = space.renterId;
                        let session = await getSession()
                        session.user.renterId = renterId
                        await signIn("credentials", {
                            callbackUrl: window.location.pathname,
                            isQuickReload: true,
                            sessionInString: JSON.stringify(session)
                        })
                    }
                }
            }} >
            <AddImageView />
            <Container style={{ marginTop: "20px" }}>
                <NameOfSpace />
                <TypeOfStay />
                <DescOfSpace />
                <SpaceCategory />
                <SpaceCondition />
                <Grid spacing={2} container>
                    <Grid item container xs={5}>
                        <BedroomNumber />
                    </Grid>
                    <Grid item container xs={5}>
                        <KitchenNumber />
                    </Grid>
                    <Grid item container xs={5}>
                        <SittingNumber />
                    </Grid>
                    <Grid item container xs={5}>
                        <BathroomNumber />
                    </Grid>
                </Grid>
                <LocationDiv />
                <SpaceAvailabilityDiv />
                <SpaceAmenityDiv />
                <SpaceChargesDiv />
                <FlatmateDiv />
                <SpaceRulesDiv />
                <p style={{ marginTop: "10px" }}>
                    <Button type="submit" 
                    style={{ color: "white", backgroundColor: "#60941a" }} >Update  Ad</Button></p>
            </Container>
        </form>
        {responseView}
    </>
}

export { SpaceFormEdit }