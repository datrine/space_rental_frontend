import _ from 'lodash';
import { createContext, useContext } from 'react'
import { OrderComp } from '../../comps/special/order';
import View from '../../comps/view';
import order from '../../utils/models/order';
import { UserSessionContext } from '../_app'
import useSWR from "swr"
import { renter } from '../../utils/models/renter';

export const OrderContext = createContext({
    orderData: _.cloneDeep(order),
});

export const RenterContext = createContext({
    renterData: _.cloneDeep(renter),
});

function MyOrdersPage() {
    return <>
        <RenterContextProvider>
            <MyOrders />
        </RenterContextProvider>
    </>
}

function MyOrders() {
    let { renterData: { id } } = useContext(RenterContext);
    let { ordersFromServer, error, loading } = ordersFetcher(id);
    let mobileView = <MobileView
        ordersProp={ordersFromServer}
        errorProp={error}
        loadingProp={loading} />
    return <>
        <View mobileView={mobileView} />
    </>
}

function RenterContextProvider({ children }) {
    let { session: { user } } = useContext(UserSessionContext);
    let { renterFromServer, error, loading } = renterFetcher(user.id);
    let view = null;
    if (loading) {
        view = <>{children} </>
    }

    if (error) {
        view = <>{children}</>
    }
    
    if (renterFromServer) {
        view = <>
            <RenterContext.Provider value={{ renterData: renterFromServer }}>
                {children}
            </RenterContext.Provider>
        </>
    }
    return <>
        {view}
    </>
}


function MobileView({ loadingProp, errorProp, ordersProp }) {
    let view = null;
    if (loadingProp) {
        view = <>
            <p>Loading</p>
        </>
    }
    if (errorProp) {
        view = <>
            <p>Error loading</p>
        </>
    }
    if (ordersProp) {
        view = <>
            <OrderContext.Provider value={{ orderData: ordersProp }}>
                <OrderComp />
            </OrderContext.Provider>
        </>
    }
    console.log(ordersProp)
    return <>
        <p>JJJJ</p>
        {view}
    </>
}

function renterFetcher(userId) {
    let { data, error, isValidating } = useSWR(`/api/renters?userId=${userId}`, fetcher)
    if (data) {
        if (Array.isArray(data)) {
            data = data[0]
            console.log(data)
        }
    }
    return { renterFromServer: data, error, loading: isValidating }
}

function ordersFetcher(renterId) {
    let { data, error, isValidating } = useSWR(`/api/orders?renterId=${renterId}`, fetcher)
    //console.log(data || error || isValidating)
    return { ordersFromServer: data, error, loading: isValidating }
}


let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export default MyOrdersPage;