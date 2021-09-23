import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Input, } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { SpaceContext } from "../index_desc";

function Rent({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx;
    let { spaceBills } = spaceData
    spaceBills=spaceBills||{}
    return <>
        <Container style={{marginTop:"10px"}}  >
            <Grid container >
                <Grid item container xs={2} >
                    <img src="/space_desc/rent.svg" />
                </Grid>
                <Grid item container xs={8}>
                    <span>{spaceBills.charge} per {spaceBills.billFormat}</span>
                </Grid>
            </Grid>
        </Container>
    </>
}

export { Rent }