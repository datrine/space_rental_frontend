import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, Input, InputAdornment,
    makeStyles, MenuItem, Paper, Select, Table, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import View from "../../view";
import { ProfileMenu } from "../dashboard/resuables";
import { useStyles } from "../profile/styles";
import { SpaceForm } from "./comps/spaceform_create";
import AlignItemsList from "./comps/roomlist";
import { useRouter } from "next/router";
import _ from "lodash";
import { SpaceContext } from "../../resuables/contextInterfaces";
import { Delete, Edit } from "@material-ui/icons";
import { getImgUrl } from "../../../utils/utilFns";

function SpaceItem() {
    let { spaceData } = useContext(SpaceContext)
    let { nameOfSpace,descOfSpace,locationInfo, space_pics } = spaceData
    return <>
        <Paper >
            <Container>
                <Grid container>
                    <Grid item container justify="center" xs={3} >
                        {space_pics.map((imgUrl, index) => <img key={index} className="w3-circle" 
                        height={40} width={40}
                            src={getImgUrl(imgUrl)} />)}
                    </Grid>
                    <Grid item container xs={6} direction="column" >
                        {nameOfSpace ?
                            <span>{nameOfSpace}</span> : <i>No name given</i>}
                            {descOfSpace ?
                                <span>{descOfSpace}</span> : <i>No description given</i>}
                    </Grid>
                    <Grid item container direction="column" alignItems="flex-end" xs={3} >
                        <a className="w3-btn" href={`/my_spaces/${spaceData.id}`} ><Edit /></a>
                        <button className="w3-btn" ><Delete /></button>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    </>
}


export { SpaceItem }