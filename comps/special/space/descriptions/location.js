import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Input, } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { SpaceContext } from "../index_desc";

function Location({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { locationInfo } = spaceData
    return <>
        <Container style={{ marginTop: "10px" }}  >
                        <h4>Location</h4>
            <Grid container >
                <Grid item container xs={2} >
                    <img src="/space_desc/location.svg" />
                </Grid>
                <Grid item container xs={8}>
                    <Grid>
                        <Grid container item direction="column" >
                            <p>City/Town: {locationInfo.cityOrTown}</p>
                            <p>Area: {locationInfo.area}</p>
                            <p>Address: {locationInfo.address}</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </>
}

export { Location }