import { Button, Container, FormControl, Input, InputAdornment } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { useContext } from "react";
import { OrderContext } from "../../../pages/payments";
import { useStyles } from "../profile/styles";
import { paymentEnums } from "./index"
/**
 * 
 * @param {object} param0 
 * @param {paymentEnums} param0.paymentProp 
 * @returns 
 */
export function BillingInfo({ paymentProp, hookChangePaymentProp }) {
    const classes = useStyles();
    let { order, changeContext } = useContext(OrderContext);
    order.billingInfo = order.billingInfo ? order.billingInfo : {}
    return <>
        <Container>
            <form className="container-fluid mt-2" style={{ maxWidth: "350px" }} >

                <FormControl fullWidth>
                    <Input value={order.billingInfo.email || ""} onChange={
                        e => {
                            order.billingInfo.email = e.target.value
                            console.log(order)
                            changeContext({ ...order })
                        }
                    }
                        placeholder="Email..." fullWidth
                        startAdornment={
                            <InputAdornment position="start">
                                <Email style={{ color: "green" }} /></InputAdornment>
                        } type="email" name="email"
                        className={classes.textField} />
                </FormControl>

                <FormControl fullWidth>
                    <Input value={order.billingInfo.fullName || ""} onChange={
                        e => {
                            order.billingInfo.fullName = e.target.value
                            changeContext({ ...order })
                        }
                    }
                        placeholder="Full name..." fullWidth
                        startAdornment={
                            <InputAdornment position="start">
                                <Email style={{ color: "green" }} /></InputAdornment>
                        } name="email"
                        className={classes.textField} />
                </FormControl>

                <FormControl fullWidth>
                    <Input value={order.billingInfo.address || ""} onChange={
                        e => {
                            order.billingInfo.address = e.target.value
                            changeContext({ ...order })
                        }
                    } multiline
                        placeholder="Address..." fullWidth
                        startAdornment={
                            <InputAdornment position="start">
                                <Email style={{ color: "green" }} /></InputAdornment>
                        } name="address"
                        className={classes.textField} />
                </FormControl>

                <p>
                    <Button variant="contained" color="primary" onClick={
                        async e => {
                            paymentEnums.setCurrent(paymentEnums.paymentOpts)
                            hookChangePaymentProp({ ...paymentEnums })
                        }
                    } >Pay</Button>
                </p>
            </form>
        </Container>
    </>
}