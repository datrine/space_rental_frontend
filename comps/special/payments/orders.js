import { Button, Container, Divider, FormControl, Grid, Input, InputAdornment } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import _ from "lodash";
import { createContext } from "react";
import { useContext } from "react";
import { OrdersContext } from "../../../pages/payments";
import order from "../../../utils/models/order";
import { SpaceContext } from "../space/index_desc";
import { paymentEnums, PresentOrderContext, SpaceDataProvider } from "./index";

export const OrderContext = createContext({
    presentOrder: _.cloneDeep({ ...order }), changeContext: () => { }
});
/**
 * 
 * @param {object} param0 
 * @param {paymentEnums} param0.paymentProp 
 * @returns 
 */
export function Orders({ paymentProp, hookChangePaymentProp, }) {
    console.log("Current state in Orders: " + paymentProp.current)
    let { orders } = useContext(OrdersContext)
    let { presentOrder, changeContext: changePresetOrderContext } = useContext(PresentOrderContext)
    return <>
        <Container>
            <h3>Choose Space to Pay</h3>
            {orders.map((order, index) => <OrderContext.Provider key={index} value={{ order }}>
                <SpaceDataProvider spaceId={order.spaceId}>
                    <Container>
                        <OrderItem />
                        <Button variant="contained" color="primary" onClick={
                            e => {
                                paymentProp.setCurrent(paymentProp.billing);
                                console.log("paymentEnums");
                                hookChangePaymentProp({ ...paymentProp })
                                changePresetOrderContext({ ...order })
                            }
                        }>Process Order
                        </Button>
                    </Container>
                </SpaceDataProvider>
            </OrderContext.Provider>
            )}
        </Container>
    </>
}


function OrderItem({ paymentProp, hookChangePaymentProp, hookChangePresentOrderState }) {
    let { order } = useContext(OrderContext)
    let { spaceData } = useContext(SpaceContext)
    return <>
        <Grid container >
            <Grid item container xs={6} >
                <span style={{ wordWrap: "break-word", wordBreak: "break-word" }} >
                    Tracking Id: {order.trackingId}
                </span>
            </Grid>
            <Grid item container xs={6}>
                <p>{spaceData.nameOfSpace}</p>
            </Grid>
        </Grid>
    </>
}