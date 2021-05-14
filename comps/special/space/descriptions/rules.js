import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Input, } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { SpaceContext } from "../index_desc";

function Rules({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { spaceRules } = spaceData

    return <>
        <Container style={{ marginTop: "10px" }}  >
            <h4>Rules</h4>
            <Grid container >
                {spaceRules.map(({desc},index)=><Grid container key={index} >
                    <Grid item container xs={2} ></Grid>
                    <Grid item container xs={10} ><p>{desc}</p></Grid>
                </Grid>)}
            </Grid>
        </Container>
    </>
}

export { Rules }