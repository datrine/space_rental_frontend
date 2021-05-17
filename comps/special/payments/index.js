import { Container } from "@material-ui/core";
import { useContext, useState } from "react";
import { ProfileContext } from "../../../pages/payments";
import {BillingInfo} from "./billingInfo"
import { PaymentOpts } from "./paymentOpts";

export default function PaymentApp(params) {
    let { profile } = useContext(ProfileContext);
    let [paymentState, changePaymentState] = useState(paymentEnums);
    let view=null
    switch (paymentState.current) {
        case paymentEnums.billing:
            view=<BillingInfo/>
            break;
    
            case paymentEnums.paymentOpts:
                view=<PaymentOpts/>
                break;
        default:
            break;
    }
    return <>
        <Container>
            {view}
        </Container>
    </>
}

let paymentEnums = {
    billing: 0,
    paymentOpts: 1,
    paymentSuccess: 2,
    paymentError: 3,
    paymentCancel: 4,
    current: undefined,
    init() {
        this.current = this.billing
    },
    setCurrent(state) {
        this.current = state;
    },
    getCurrent() {
        return this.current;
    }
}
paymentEnums.init()