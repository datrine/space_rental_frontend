import qs from "qs";
import useSWR from "swr";
async function ordersNotifFetcher(obj = { userId: "", renterId: "", lastOrderNotifiedTime: "" }) {
    try {
        let queryString = qs.stringify(obj);
        console.log(queryString)
        let res = await fetch(`/api/orders/fetch?${queryString}`)
        let orders = await res.json();
        return { orders }
    } catch (error) {
        console.log(error);
        return { err: error }
    }
}

export { ordersNotifFetcher }