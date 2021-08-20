import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Input, } from "@material-ui/core";
import { Carousel } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { SpaceContext } from "../index_desc";

function Desc({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, } = ctx
    let { descOfSpace } = spaceData
    return <>
        <Container style={{marginTop:"10px"}}  >
            <Grid container >
                <Grid item container xs={2} >
                    <img src="/space_desc/desc.svg" />
                </Grid>
                <Grid item container xs={8}>
                    <p>{descOfSpace||"No description available..."}</p>
                </Grid>
            </Grid>
        </Container>
    </>
}

export { Desc }