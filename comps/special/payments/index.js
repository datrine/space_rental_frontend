import { Container } from "@material-ui/core";
import { useContext, useState } from "react";
import { OrderContext, ProfileContext } from "../../../pages/payments";
import { BillingInfo } from "./billingInfo"
import { PaymentOpts } from "./paymentOpts";
import { Orders } from "./orders";

export default function PaymentApp(params) {
    let { profile } = useContext(ProfileContext);
    let { order, changeContext } = useContext(OrderContext);
    let [paymentState, changePaymentState] = useState(paymentEnums.init());
    let [presentOrderState, changePresentOrderState] = useState(order);
    let view = null
    console.log(paymentState)
    //console.log( paymentState.current)
    switch (paymentState.current) {
        case paymentEnums.orders:
            view = <Orders hookChangePaymentProp={changePaymentState}
                paymentProp={paymentState}
                hookChangePresentOrderState={changePresentOrderState} />
            break;
        case paymentEnums.billing:
            view = <BillingInfo hookChangePaymentProp={changePaymentState}
                paymentProp={paymentState} />
            break;

        case paymentEnums.paymentOpts:
            view = <PaymentOpts />
            break;
        default:
            break;
    }
    return <>
        <Container>
            <OrderContext.Provider value={{
                order: presentOrderState, changeContext: changePresentOrderState
            }} >
                {view}
            </OrderContext.Provider>
        </Container>
    </>
}

let paymentEnums = {
    orders: 0,
    billing: 1,
    paymentOpts: 2,
    paymentSuccess: 3,
    paymentError: 4,
    paymentCancel: 5,
    current: undefined,
    init() {
        this.setCurrent(this.orders)
        return this;
    },
    setCurrent(state) {
        this.current = state;
        console.log("State set to " + this.current);
    },
    getCurrent() {
        return this.current;
    }
};

export { paymentEnums }