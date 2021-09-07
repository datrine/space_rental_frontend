import { Container, Grid } from "@material-ui/core";
import { isNull } from "lodash";
import useSWR from "swr"
import { useContext, useState } from "react";
import { IOrderContext } from "../../resuables/contextInterfaces";

function OrderIndex({ orderId }) {
    if (!orderId) {
       return <></>
    }
    let { orderFromServer, error, loading } = orderFetcher(orderId);

    if (error) {
        return <>
            <p>{error}</p>
        </>
    }

    if (loading) {
        return <>
            <p>{loading}</p>
        </>
    }

    if (!orderFromServer) {
        return <>
            <p>no order matching ${ }</p>
        </>
    }

    return <>
        <OrderCxtToState orderFromServer={orderFromServer} />
    </>
}

function OrderCxtToState({ orderFromServer }) {

    let [orderState, changeOrderState] = useState(orderFromServer)
    return <>
        <IOrderContext.Provider value={{ orderData: orderState, changeContext: changeOrderState }}>
            <Order />
        </IOrderContext.Provider></>
}

function Order() {
    let { orderData } = useContext(IOrderContext);
    return <>
        <Container>
            <StateMini />
        </Container>
    </>
}

function StateMini() {
    let { orderData } = useContext(IOrderContext);
    let state = orderData.state
    let view = null;
    switch (state) {
        case "accepted":
            view = <>
                <PostOrder />
            </>
            break;
        default:
            break;
    }
    return <>
        {view}
    </>
}

function PostOrder(params) {
    let { orderData } = useContext(IOrderContext);
    let { paymentInfo } = orderData;
    paymentInfo=paymentInfo||{}
    let view = null;
    switch (paymentInfo.state) {
        case "success":
            view = <>
                <ConfirmOrderBtn />
                <CancelOrderBtn /></>
            break;

        default:
            view = <VerifyPaymentBtn />
            break;
    }

    return <>
        <Container>
            <Grid container justify="space-between"  >
                <Grid xs={6} item container justify="space-between">
                    {view}
                </Grid>
            </Grid>
        </Container></>
}

function ConfirmOrderBtn() {
    let { orderData } = useContext(IOrderContext)
    return <>
        <button onClick={async e => {
            await orderPut({ id: orderData.id, obj: { state: "confirmed" } })
        }} >Approve</button>
    </>
}

function CancelOrderBtn() {
    let { orderData } = useContext(IOrderContext)
    return <>
        <button onClick={async e => {
            await orderPut({ id: orderData.id, obj: { state: "canceled" } })
        }} >Cancel</button>
    </>
}

function VerifyPaymentBtn() {
    let { orderData, changeContext } = useContext(IOrderContext);
    let { paymentInfo } = orderData;
    paymentInfo=paymentInfo||{}
    let onClick = () => { }
    switch (paymentInfo.platform) {
        case "paystack":
            onClick = async e => {
                try {
                    let data = await verifyPayment(paymentInfo.platformMeta.reference);

                    let paymentInfoToSave = {
                        platform: "paystack",
                        platformMeta: data,
                    }
                    if (data.status === "success") {
                        paymentInfoToSave.state = "success"
                        let res = await orderPut({
                            obj: {
                                paymentInfo: paymentInfoToSave
                            }
                        });
                    }
                    changeContext({ ...orderData, paymentInfo: paymentInfoToSave })
                } catch (error) {

                }
            }
            break;

        default:
            break;
    }
    return <>
        <button onClick={onClick} >Verify</button>
    </>
}
/**
 * 
 * @param {object} param0 
 * @param {number} param0.id
 * @param {object} param0.obj
 * @param {"begun"|"accepted"|"confirmed"|"canceled"|"client_canceled"} param0.obj.state
 * @param {object} param0.obj.paymentInfo
 * @param {string} param0.obj.paymentInfo.platform
 * @param {string} param0.obj.paymentInfo.via
 * @param {string} param0.obj.paymentInfo.p
 * @returns 
 */
async function orderPut({ id, obj: { } }) {
    try {
        let res = await fetch(`/api/order/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });
        if (!res.ok) {
            throw await res.json()
        }
        let data = await res.json();
        return data;
    } catch (error) {

    }
}

function orderFetcher(orderId) {
    let { data, error, isValidating } =
        useSWR(`${process.env. NEXT_PUBLIC_CMS_URL}/orders/${orderId}`, fetcher, {
            revalidateOnFocus: false,
        });
    //console.log(data || error || isValidating)
    return { orderFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

async function verifyPayment(reference) {
    try {
        let res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`);
        if (!res.ok) {
            throw res.text()
        }
        let data = res.data
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default OrderIndex