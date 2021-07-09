import _ from 'lodash';
import { createContext, useContext } from 'react'
import { OrderComp } from '../../comps/special/order';
import View from '../../comps/view';
import order from '../../utils/models/order';
import { UserSessionContext } from '../_app'
import useSWR from "swr"
import { renter } from '../../utils/models/renter';
import { ProfileMenu } from '../../comps/special/dashboard/resuables';
import { Container, Grid } from '@material-ui/core';
import { JustAPanel } from '../../comps/resuables';

export const OrderContext = createContext({
    orderData: _.cloneDeep(order),
    changeContext: () => { }
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
    let { session: { user } } = useContext(UserSessionContext);
    let { renterData: { id } } = useContext(RenterContext);
    let { ordersFromServer, error, loading } = ordersFetcher(id,user.userId);
    let mobileView = <MobileView
        ordersProp={ordersFromServer}
        errorProp={error}
        loadingProp={loading}
    />
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
    else if (errorProp) {
        view = <>
            <p>Error loading</p>
        </>
    }
    else if (!ordersProp.length > 0) {
        view = <>
            <p>No orders...</p>
        </>
    }
    else if (ordersProp) {
        view = <>
            {ordersProp.map((orderData, index) => <OrderContext.Provider
                value={{ orderData }} key={index} >
                <OrderComp />
            </OrderContext.Provider>)}

        </>
    }
    return <>
        <ProfileMenu />
        <Container style={{ marginTop: 70, padding: 0, position: "fixed" }} >
            <Grid justify="center" container
                style={{ width: 300, margin: "auto", backgroundColor: "whitesmoke" }} >
                <JustAPanel />
            </Grid>
            <Container style={{ marginTop: 40, overflow: "auto", height: "65vh" }}>
                {view}
            </Container>
            <Container
                style={{ bottom: "10px", position: "fixed", paddingTop: "10px" }} >
                <Grid justify="center" container
                    style={{ width: 300, margin: "auto", backgroundColor: "whitesmoke" }} >
                    <JustAPanel />
                </Grid>
            </Container>
        </Container>
    </>
}

function renterFetcher(userId) {
    let { data, error, isValidating } = useSWR(`/api/renters?userId=${userId}`, fetcher, {
        revalidateOnFocus: false,
    });
    if (data) {
        if (Array.isArray(data)) {
            data = data[0]
        }
    }
    return { renterFromServer: data, error, loading: isValidating }
}

function ordersFetcher(renterId, userId) {
    let { data, error, isValidating } = useSWR(`/api/orders?renterId=${renterId}&userId=${userId}`, fetcher, {
        revalidateOnFocus: false,
    });
    //console.log(data || error || isValidating)
    return { ordersFromServer: data, error, loading: isValidating }
}


let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export default MyOrdersPage;