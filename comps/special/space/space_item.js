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

function SpaceItem() {
   let {spaceData}= useContext(SpaceContext)
   console.log(spaceData)
    return <>
    <Paper >
        <Grid container>
            <Grid item container xs={3} ></Grid>
            <Grid item container xs={6} ></Grid>
            <Grid item container direction="column" alignItems="center" xs={3} >
                <a className="w3-btn" href={`/my_spaces/${spaceData.id}`} ><Edit/></a>
                <button className="w3-btn" ><Delete/></button>
            </Grid>
        </Grid>
    </Paper>
    </>
}


export { SpaceItem }