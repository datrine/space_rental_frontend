import { useRouter } from 'next/router';
import useSWR, { SWRConfig } from 'swr'
import React, { createContext, useContext } from 'react';
import _ from 'lodash';
import order from '../../utils/models/order';
import { UserSessionContext } from '../_app';
import { OrderComp } from '../../comps/special/order';
import View from '../../comps/view';

export const OrderContext = createContext({
    orderData: _.cloneDeep(order),
});

let Orders = ({ csrfToken, callbackUrl, session, ...otherProps }) => {
    let { query: { id } } = useRouter();
    let { session: { user } } = useContext(UserSessionContext)
    let { ordersFromServer, error, loading } = ordersFetcher(user.id);
    if (error) {
        return <>
            <p>Error loading data...</p>
        </>
    }
    if (loading) {
        return <>
            <p>Loading...</p>
        </>
    }
    return <>
        <View mobileView={<MobileView ordersProp={ordersFromServer} />} />
    </>
}

function MobileView({ ordersProp }) {
    return <>
        {
            ordersProp.map((orderData, index) => <OrderContext.Provider
                value={{ orderData }} key={index} >
                <OrderComp/>
            </OrderContext.Provider>)}
    </>
}

function ordersFetcher(userId) {
    let { data, error, isValidating } = useSWR(`/api/orders?userId=${userId}`, fetcher)
    console.log(data || error || isValidating)
    return { ordersFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export default Orders;