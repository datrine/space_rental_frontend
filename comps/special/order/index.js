import { Grid, Paper } from "@material-ui/core";
import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { OrderContext } from "../../../pages/orders";
import View from "../../view";

function Order({ spaceDataProps }) {
    let { orderData } = useContext(OrderContext)
    return <>
    <Paper>
        <Grid container >
            <Grid xs={4} ></Grid>
            <Grid></Grid>
        </Grid>
    </Paper>
    </>
}
export { Order }