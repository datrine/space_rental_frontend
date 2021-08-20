import { Container, Grid}
    from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import useSWR from "swr"
import MyTable from "../reusables/table";

function OrdersAdmin(params) {
    return <>
        <Grid container>
            <h3>Orders</h3>
            <Grid>
                <MyOrdersTable />
            </Grid>
        </Grid>
    </>
}

function MyOrdersTable(params) {
    let { ordersFromServer, error, loading } = ordersFetcher();
    if (error) {
        return <>
            <p>Error loading orders...</p>
        </>
    }
    if (loading) {
      return  <>Loading</>
    }
    if (!ordersFromServer) {
        return  <>No order...</>
    }
    return <>
        <MyTable data={ ordersFromServer.map(order=>fmtOrder(order))} />
    </>
}


function ordersFetcher() {
    let { data, error, isValidating } = useSWR(`/api/orders?`, fetcher, {
        revalidateOnFocus: false,
    });
    //console.log(data || error || isValidating)
    return { ordersFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

function fmtOrder(order) {
    let fmtd={};
    fmtd.id=order.id;
    fmtd["space meta"]=order.spaceMeta
    fmtd.state=order.state;
    fmtd.trackingId=order.trackingId;
    //fmtd.ConfirmBtn=<ConfirmBtn/>
    return fmtd;
}

function ConfirmBtn(params) {
    return<><button>
        Confirm
        </button></>
}

export default OrdersAdmin;