import { Button, Container, Divider, FormControl, Grid, Input, InputAdornment, Paper } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import _ from "lodash";
import { createContext, useEffect } from "react";
import { useContext } from "react";
import { OrdersContext } from "../../../pages/my_payments/";
import order from "../../../utils/models/order";
import { billEstimator, numberOfDays } from "../../../utils/utilFns";
import { SpaceContext } from "../space/index_desc";
import { paymentEnums, PresentOrderContext, SpaceDataProvider } from "./index";
import { ISpaceContext, ISpaceToBookContext } from "../../resuables/contextInterfaces"
import { MyCalendar } from "../../resuables/myCalendar";

export const OrderContext = createContext({
    order: _.cloneDeep({ ...order }), changeContext: () => { }
});
/**
 * 
 * @param {object} param0 
 * @param {paymentEnums} param0.paymentProp 
 * @returns 
 */
export function Orders({ paymentProp, hookChangePaymentProp, }) {
    let { orders } = useContext(OrdersContext)
    let { presentOrder, changeContext: changePresetOrderContext } = useContext(PresentOrderContext)
    return <>
        <Container>
            {orders.length > 0 ? <h3>Choose Order to Pay</h3> : <h3>No Orders Yet accepted</h3>}
            {orders.map((order, index) =><OrderContext.Provider key={index} value={{ order }}>
                <SpaceDataProvider spaceId={order.spaceId}>
                    <Paper style={{ paddingTop: "10px", paddingBottom: "10px", maxWidth: "500px" }} >
                        <OrderItem />
                        <p style={{ textAlign: "center" }} >
                            <Button variant="contained" color="primary" onClick={
                                async e => {
                                    try {
                                        let spaceData = await
                                            (await fetch(`api/spaces/${order.spaceId}`)).json()
                                        console.log(spaceData)
                                        let newEstimate = billEstimator(spaceData.spaceBills,
                                            numberOfDays(order.spaceMeta.datesToStayInfo));
                                        changePresetOrderContext({
                                            ...order, amountToPay: newEstimate
                                        });
                                        paymentProp.setCurrent(paymentProp.billing);
                                        hookChangePaymentProp({ ...paymentProp });
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }
                            }>Book
                        </Button>
                        </p>
                    </Paper>
                <br />
                </SpaceDataProvider>
            </OrderContext.Provider>
            )}
        </Container>
    </>
}


function OrderItem() {
    let { order } = useContext(OrderContext)
    let { trackingId, spaceMeta, } = order
    let { spaceData } = useContext(SpaceContext)
    let { locationInfo, nameOfSpace, spaceBills } = spaceData
    let spaceItem = (label, value) => <>
        <Grid container style={{ marginBottom: "5px" }}>
            <Grid item container xs={6}>
                <Container>
                    <span><strong>{label}</strong></span></Container>
            </Grid>
            <Grid item container xs={6}>
                <Container>
                    <p style={{ wordBreak: "break-all" }} >{value}</p></Container>
            </Grid>
        </Grid>
    </>
    return <>
        <Grid container >
            <Container>
                <ISpaceContext.Provider value={{
                    spaceData: {
                        spaceAvailabiltyInfo: { datesInfo: spaceMeta.datesToStayInfo }
                    }
                }} >
                    <MyCalendar />
                </ISpaceContext.Provider>
            </Container>
            {spaceItem("Length of stay", numberOfDays(spaceMeta.datesToStayInfo))}
            {spaceItem("Tracking Id:", trackingId)}
            {spaceItem("Name:", nameOfSpace)}
            {spaceItem("Address:", locationInfo.address)}
            {spaceItem("Area/Borough:", locationInfo.area)}
            {spaceItem("City or town:", locationInfo.cityOrTown)}
            {spaceItem("Bill estimate: ₦",
                billEstimator(spaceBills, numberOfDays(spaceMeta.datesToStayInfo)))}
        </Grid>
    </>
}