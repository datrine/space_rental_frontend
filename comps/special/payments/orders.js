import { Button, Container, Divider, FormControl, Grid, Input, InputAdornment } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { useContext } from "react";
import { OrdersContext } from "../../../pages/payments";
import { paymentEnums } from "./index"
/**
 * 
 * @param {object} param0 
 * @param {paymentEnums} param0.paymentProp 
 * @returns 
 */
export function Orders({ paymentProp, hookChangePaymentProp, hookChangePresentOrderState }) {
    let { orders } = useContext(OrdersContext)
    return <>
        <Container>
            <h3>Choose Order to Pay</h3>
            {orders.map((order, index) => <Container key={index} >
                <Grid container >
                    <Grid item container xs={6} >
                        <span style={{ overflowWrap: "break-word" }} >Tracking Id: {order.trackingId}</span>
                    </Grid>
                    <Divider orientation="vertical" />
                    <Grid item container xs={6} ></Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={
                    e => {
                        paymentEnums.setCurrent(paymentEnums.billing)
                        //console.log(paymentEnums)
                        hookChangePresentOrderState(order)
                        hookChangePaymentProp({ ...paymentEnums })
                    }
                } >Process Order</Button>
            </Container>)}
        </Container>
    </>
}