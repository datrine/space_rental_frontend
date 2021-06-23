import { Grid, Paper } from "@material-ui/core";
import _ from "lodash";
import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { OrderContext } from "../../../pages/my_orders";
import { tenant } from "../../../utils/models/tenant";
import View from "../../view";
import useSWR from "swr"

export const TenantContext = createContext({
    tenantData: _.cloneDeep(tenant),
});

function OrderComp({ }) {
    return <>
        <TenantContextProvider>
            <View mobileView={<MobileView />} />
        </TenantContextProvider>
    </>
}

function MobileView() {
    let { orderData } = useContext(OrderContext);
    return <>
        <Paper>
            <Grid container >
                <Grid xs={4} item container ></Grid>
                <Grid></Grid>
            </Grid>
        </Paper>
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
    console.log(tenantId)
    let { data, error, isValidating } = useSWR(`/api/tenants/${tenantId}`, fetcher)
    //console.log(data || error || isValidating)
    return { tenantFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export { OrderComp }