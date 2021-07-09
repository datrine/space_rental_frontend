import { Container, Grid, Paper } from "@material-ui/core";
import _ from "lodash";
import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { OrderContext } from "../../../pages/my_orders";
import { tenant } from "../../../utils/models/tenant";
import View from "../../view";
import useSWR from "swr"
import TenantBio from "./tenant_biodata";
import { ISpaceContext } from "../../resuables/contextInterfaces";
import DemTemplates from "./demtemplates";

export const TenantContext = createContext({
    tenantData: _.cloneDeep(tenant),
});

function OrderComp({ }) {
    let { orderData, changeContext } = useContext(OrderContext)
    let [orderState, changeOrderState] = useState(orderData)
    return <>
        <OrderContext.Provider value={{ orderData: orderState, changeContext: changeOrderState }}>
            <TenantContextProvider>
                <RecombinedWithSpace />
            </TenantContextProvider>
        </OrderContext.Provider>
    </>
}

function RecombinedWithSpace({ }) {
    let { orderData } = useContext(OrderContext)
    console.log(orderData)
    return <>
        <SpaceDataProvider spaceId={orderData.spaceId} >
            <View mobileView={<MobileView />} />
        </SpaceDataProvider>
    </>
}

function MobileView() {
    let { orderData } = useContext(OrderContext);
    let { state } = orderData
    let view = null
    switch (state) {
        case "begun":
            view = <>
                <Grid justify="center" direction="column" container >
                    <Paper style={{ width: "300px" }}>
                        <TenantBio />
                        <DemTemplates />
                    </Paper>
                </Grid>
            </>
            break;

        case "accepted":
            view = <>
                <p>Order accepted...</p>
            </>
            break;
            
        case "declined":
            view = <>
                <p>Order Declined</p>
            </>
            break;
        default:
            break;
    }
    return <>
        <Grid justify="center" direction="column" container >
            <Paper style={{ width: "300px" }}>
                {view}
            </Paper>
        </Grid>
    </>
}

function TenantContextProvider({ children }) {
    let { orderData } = useContext(OrderContext)
    let { tenantFromServer, loading, error } = tenantFetcher(orderData.tenantId)
    let view = null;
    if (loading) {
        view = <>{children}
        </>
    }

    if (error) {
        view = <>
            {children}
        </>
    }
    if (tenantFromServer) {
        view = <>
            <TenantContext.Provider value={{ tenantData: tenantFromServer }} >
                {children}
            </TenantContext.Provider>
        </>
    }
    return <>
        {view}
    </>
}

function tenantFetcher(tenantId) {
    let { data, error, isValidating } = useSWR(`/api/tenants/${tenantId}`, fetcher, {
        revalidateOnFocus: false,
    })
    return { tenantFromServer: data, error, loading: isValidating }
}

export function SpaceDataProvider({ children, spaceId }) {
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
        <ISpaceContext.Provider value={{ spaceData: spaceDataFromServer }} >
            {children}
        </ISpaceContext.Provider>
    </>
}

function spaceFetcher(spaceId) {
    let { data, error, isValidating } = useSWR(`/api/spaces/${spaceId}`, fetcher, {
        revalidateOnFocus: false
    })
    //console.log(data || error || isValidating)
    return { spaceDataFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export { OrderComp }