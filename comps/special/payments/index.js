import { Container } from "@material-ui/core";
import { useContext, useState } from "react";
import { ProfileContext } from "../../../pages/payments";
import { BillingInfo } from "./billingInfo"
import { PaymentOpts } from "./paymentOpts";
import { Orders } from "./orders";
import { SpaceContext } from "../space/index_desc";
import useSWR from "swr";
import { space } from '../../../utils/models/space';
import order from "../../../utils/models/order";
import { createContext } from "react";
import _ from "lodash";
import View from "../../view";

export const PresentOrderContext = createContext({
    presentOrder: _.cloneDeep({ ...order }), changeContext: () => { }
});

export default function PaymentApp(params) {
    let [paymentState, changePaymentState] = useState(paymentEnums.init());
    let [presentOrderState, changePresentOrderState] = useState(null);
    let commonProps = { paymentProp: paymentState, hookChangePaymentProp: changePaymentState }
    console.log("paymentState for origin: " + paymentState.current)
    console.log("spaceId: " + presentOrderState?.spaceId)
    return <>
        <PresentOrderContext.Provider value={{
            presentOrder: presentOrderState,
            changeContext: changePresentOrderState
        }} >{presentOrderState ?
            <SpaceDataProvider spaceId={presentOrderState.spaceId} >
                <View mobileView={<MobileView {...{ ...commonProps }} />} />
            </SpaceDataProvider> : <View mobileView={<MobileView {...commonProps} />} />}
        </PresentOrderContext.Provider>
    </>
}

function MobileView(props) {
    let view = null;
    console.log("props.paymentProp.current: " + props.paymentProp.current)
    switch (props.paymentProp.current) {
        case 0:
            view = <Orders {...props} />
            break;
        case 1:
            view = <BillingInfo {...props} />
            break;
        case 2:
            console.log("Here: " + 2)
            view = <PaymentOpts {...props} />
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

export function SpaceDataProvider({ children, spaceId }) {
    //console.log(spaceId);
    let { spaceDataFromServer, error, loading } = spaceFetcher(spaceId)
    if (loading) {
        return <>
            {children}
        </>
    }
    if (error) {
        return <>
            <p>Error...</p>
            {children}
        </>
    }
    if (!spaceDataFromServer) {
        return <>
            {children}
        </>
    }
    return <>
        <SpaceContext.Provider value={{ spaceData: spaceDataFromServer }} >
            {children}
        </SpaceContext.Provider>
    </>
}

function spaceFetcher(spaceId) {
    let { data, error, isValidating } = useSWR(`/api/spaces/${spaceId}`, fetcher)
    //console.log(data || error || isValidating)
    return { spaceDataFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

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
        //console.log("State set to " + this.current);
    },
    getCurrent() {
        return this.current;
    }
};

export { paymentEnums }