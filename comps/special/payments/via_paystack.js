import { Button } from "@material-ui/core";
import { nanoid } from "nanoid"
import { useContext } from "react";
import { usePaystackPayment } from "react-paystack";
import { paymentEnums, PresentOrderContext } from "./index"

export function MyPaystack({ onSuccess, onFailure }) {
    const { presentOrder } = useContext(PresentOrderContext)
    const config = {
        reference: nanoid(),
        email: presentOrder.billingInfo.email,
        amount: presentOrder.amountToPay,
        publicKey: 'pk_test_7cef28e87845e0bb56c5c709d5a3cf9aae065714',
    };
    const initializePayment = usePaystackPayment(config);
    // you can call this function anything
    const onPaystackSuccess = (reference) => {
        console.log(reference);
        return onSuccess({ 
            paymentInfo: { via: "paystack", 
            paystackRef: reference,},
            message:"Payment successful via Paystack"
         })
    };

    // you can call this function anything
    const onPaystackError = () => {
        console.log('closed')
        return onFailure({errMsg:"Paystack payment failed.",message:"Paystack payment failed."})
    }
    return <>
        <button className="w3-btn" style={{ backgroundColor: "#b2beb5" }} onClick={
            e => {
                initializePayment(onPaystackSuccess, onPaystackError);
            }
        } >Pay Via Paystack</button>
    </>
}