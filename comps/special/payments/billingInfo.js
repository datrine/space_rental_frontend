import { Button, Container, FormControl, Input, InputAdornment } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { useContext } from "react";
import { useStyles } from "../profile/styles";
import {paymentEnums, PresentOrderContext } from "./index"
/**
 * 
 * @param {object} param0 
 * @param {paymentEnums} param0.paymentProp 
 * @returns 
 */
export function BillingInfo({ paymentProp, hookChangePaymentProp }) {
    const classes = useStyles();
    let { presentOrder, changeContext } = useContext(PresentOrderContext);
    presentOrder.billingInfo = presentOrder.billingInfo ? presentOrder.billingInfo : {}
    return <>
        <Container>
            <form className="container-fluid mt-2" style={{ maxWidth: "350px" }} >

                <FormControl fullWidth>
                    <Input value={presentOrder.billingInfo.email || ""} onChange={
                        e => {
                            presentOrder.billingInfo.email = e.target.value
                            console.log(presentOrder)
                            changeContext({ ...presentOrder })
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
                    <Input value={presentOrder.billingInfo.fullName || ""} onChange={
                        e => {
                            presentOrder.billingInfo.fullName = e.target.value
                            changeContext({ ...presentOrder })
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
                    <Input value={presentOrder.billingInfo.address || ""} onChange={
                        e => {
                            presentOrder.billingInfo.address = e.target.value
                            changeContext({ ...presentOrder })
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
                    <Button disabled={!presentOrder.billingInfo.address || !presentOrder.billingInfo.email}
                        variant="contained" color="primary" onClick={
                            async e => {
                                paymentProp.setCurrent(paymentProp.paymentOpts)
                                //console.log("paymentProp: "+paymentProp.current);
                                hookChangePaymentProp({ ...paymentProp })
                            }
                        } >Pay</Button>
                </p>
            </form>
        </Container>
    </>
}