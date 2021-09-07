
import { Container, Grid } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import useSWR from "swr"
import MyTable from "../reusables/table";
import OrderIndex from "./order";
function OrdersAdmin({ hookChangeActiveTab }) {
    let [viewType, changeViewType] = useState("index");
    let [orderIdState, changeOrderIdState] = useState(null);
    let view = null
    switch (viewType) {
        case "index":
            view = <>
                <Grid container>
                    <h3>Orders</h3>
                    <Grid>
                        <MyOrdersTable hookChangeViewType={changeViewType}
                        hookChangeOrderId={changeOrderIdState} />
                    </Grid>
                </Grid>
            </>
            break;

            case "order":
                view = <>
                <OrderIndex orderId={orderIdState} />
                </>
                break;
        default:
            break;
    }
    return <>
    {view}
    </>
}

function MyOrdersTable({ hookChangeViewType,hookChangeOrderId }) {
    let { ordersFromServer, error, loading } = ordersFetcher();
    if (error) {
        return <>
            <p>Error loading orders...</p>
        </>
    }
    if (loading) {
        return <>Loading</>
    }
    if (!ordersFromServer) {
        return <>No order...</>
    }
    return <>
        <MyTable data={ordersFromServer.map(order => 
            fmtOrder({order, hookChangeViewType,hookChangeOrderId}))} />
    </>
}

function ordersFetcher() {
    let { data, error, isValidating } = useSWR(`${process.env.NEXT_PUBLIC_CMS_URL}/orders?`, fetcher, {
        revalidateOnFocus: false,
    });
    //console.log(data || error || isValidating)
    return { ordersFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url, {
    headers: {
        //"Authorization":`${}`
    }
}).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

function fmtOrder({order, hookChangeViewType,hookChangeOrderId}) {
    let fmtd = {};
    fmtd.id = order.id;
    fmtd["space metae"] = order.spaceMeta
    fmtd.state = order.state;
    fmtd.trackingId = order.trackingId;
    fmtd.open = <button className="w3-btn" onClick={
        e => {
            hookChangeViewType("order");
            hookChangeOrderId(order.id)
        }
    } >Open
    </button>
    return fmtd;
}


export default OrdersAdmin;