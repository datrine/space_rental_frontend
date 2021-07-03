import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import { OrderContext } from "../../../pages/my_orders";
import { ISpaceContext } from "../../resuables/contextInterfaces";
import { useContext } from "react";
import { MyCalendar } from "../../resuables/myCalendar";
import { billEstimator, numberOfDays } from "../../../utils/utilFns";

export default function DemTemplates(params) {
    let { orderData } = useContext(OrderContext)
    let { trackingId, spaceMeta, } = orderData
    let { spaceData } = useContext(ISpaceContext)
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
            <Grid container >
                <DeclineBtn />
            </Grid>
        </Grid>
    </>
}

function DeclineBtn(params) {
    let { orderData } = useContext(OrderContext)
    let { id, trackingId, spaceMeta, } = orderData
    let [showDialog, toggleShowDialog] = useState(false);
    let onSuccessHandler = async () => { }
    let onFailureHandler = async () => { }
    let declineFn = async () => {
        try {
            let res = await fetch(`/api/orders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ state: "declined" })
            });
            if (res.ok) {
                return res.json()
            } else {
                throw res.json()
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    return <>
        <Button onClick={
            e => {
                toggleShowDialog(true)
            }
        } >Decline</Button>
        {showDialog ? <MyDialog
            dialogText="Decline booking request"
            onSuccess={onSuccessHandler}
            onFailure={onFailureHandler}
            fnToRun={declineFn}
        /> : null}
    </>
}


function MyDialog({ dialogText = "", onSuccess, onFailure, fnToRun = async () => { } }) {
    let [openState, changeOpenState] = useState(true);
    let { orderData } = useContext(OrderContext)
    let { id, trackingId, spaceMeta, } = orderData
    let handleClose = (e) => {
        changeOpenState(false)
    }
    let handleContinue = async (e) => {
        try {
            let res = await fnToRun()
            onSuccess(res)
        } catch (error) {
            console.log(error);
            onFailure(error)
        } finally {
            changeOpenState(false)
        }
    }
    return <>
        <Dialog
            open={openState}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title"></DialogTitle>
            <DialogContent>
                {dialogText}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleContinue} color="primary" autoFocus>Continue</Button>
            </DialogActions>
        </Dialog>
    </>
}