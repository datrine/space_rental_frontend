import { Button } from "@material-ui/core";
import { nanoid } from "nanoid"
import { useContext } from "react";
import { usePaystackPayment } from "react-paystack";
import { paymentEnums, PresentOrderContext } from "./index"

// you can call this function anything
const onSuccess = (reference) => {
    console.log(reference);
};

// you can call this function anything
const onClose = () => {
    console.log('closed')
}
export function MyPaystack(params) {
    const { presentOrder } = useContext(PresentOrderContext)
    console.log(presentOrder)
    const config = {
        reference: nanoid(),
        email: presentOrder.billingInfo.email,
        amount: 20000,
        publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
    };
    const initializePayment = usePaystackPayment(config);
    return <>
        <button className="w3-btn" style={{ backgroundColor: "#b2beb5" }} onClick={
            e => {
                initializePayment(onSuccess, onClose);
            }
        } >Pay Via Paystack</button>
    </>
}