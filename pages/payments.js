import Link from 'next/link';
import { csrfToken, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { Comp_Dashboard } from '../comps/special/dashboard';
import _ from 'lodash';
import {profile} from '../utils/models/exportModels';
import useSWR from "swr";
import { UserSessionContext } from './_app';
import { createContext, useContext } from 'react';
import PaymentApp from '../comps/special/payments';

/**
 * 
 * @param {object} params
 * @param {session} params.session
 * @returns 
 */

let ProfileContext = createContext({ profile: _.cloneDeep(profile), changeContext: () => { } });
let order = {
    trackingId: 0,
    billingInfo: {},
    userId: 0,
    state: "begun",
    spaceId: 0,
    paymentInfo: {
        via: "e-payment",
        platform: "paystack",
        platformMeta: {},
        type: "full" || "split",
        state: "none" || "incomplete" || "completed"
    }
}
export const OrdersContext = createContext({
    orders: [order],
});

let Payments = ({ csrfToken, callbackUrl, ...otherProps }) => {
    let { session } = useContext(UserSessionContext);
    let { data: dataForProfile, loading: loadingProfile, error: errorForProfileFetch } =
        profileFetcher(session.user.profileId);
    if (loadingProfile) {
        return <>Loading...</>
    }
    if (errorForProfileFetch) {
        return <>Error...</>
    }
    if (!dataForProfile) {
        return <>No data...</>
    }
    return <>
        <ProfileContext.Provider value={{
            profile: dataForProfile.profile
        }}>
            <OrdersView />
        </ProfileContext.Provider>
    </>
}

let OrdersView = ({ csrfToken, callbackUrl, ...otherProps }) => {
    let { session } = useContext(UserSessionContext)
    let { data: dataForOrders, loading: loadingOrders, error: errorForOrdersFetch } =
        ordersFetcher(session.user.userId);
    if (loadingOrders) {
        return <>Loading...</>
    }
    if (errorForOrdersFetch) {
        return <>Error...</>
    }
    if (!dataForOrders) {
        return <>No data...</>
    }
    return <>
        <OrdersContext.Provider value={{ orders: dataForOrders.orders }} >
            <PaymentApp csrfToken={csrfToken} callbackUrl={callbackUrl} />
        </OrdersContext.Provider>
    </>
}

function profileFetcher(id) {
    let { data, error, isValidating } = useSWR(`/api/profiles/${id}`, fetcher)
    //console.log(data || error || isValidating)
    return { data, error, loading: isValidating }
}

function ordersFetcher(id) {
    let { data, error, isValidating } = useSWR(`/api/orders/?userId=${id}`, fetcher)
    //console.log(data || error || isValidating)
    return { data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export { ProfileContext }
export default Payments;