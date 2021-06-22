import { Container, FormControl, Grid, Input, InputAdornment, Paper } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { MyPaystack } from "./via_paystack";

import { paymentEnums } from "./index"
import { useContext, useState } from "react";
import { SpaceContext } from "../space/index_desc";
import { Success, Failure } from "./responses";
/**
 * 
 * @param {object} param0 
 * @param {paymentEnums} param0.paymentProp 
 * @returns 
 */

export function PaymentOpts({ paymentProp, hookChangePaymentProp, }) {
    let resView = null
    let onSuccess = ({ paymentInfo, message }) => {
        toggleDialog(true)
        changeResType("success");
        changeSuccessResponse({paymentInfo, message})
    }
    let onFailure = ({ errMsg, message }) => {
        toggleDialog(true)
        changeResType("failure");
        changeFailureResponse({errMsg, message})
    }
    let [successResponse, changeSuccessResponse] = useState(null)
    let [failureResponse, changeFailureResponse] = useState(null)
    let [resType, changeResType] = useState(null)
    let [openDialog, toggleDialog] = useState(false)
    switch (resType) {
        case "success":
            resView = <Success successResponse={successResponse}
                openDialog={openDialog} hookToggleDialog={toggleDialog} />
            break;

        case "failure":
            resView = <Failure failureResponse={failureResponse}
                openDialog={openDialog} hookToggleDialog={toggleDialog} />
            break;
        default:
            break;
    }
    return <>
        <Container>
            <Grid justify="center" alignItems="center" container style={{ height: "80vh" }} >
                <Paper>
                    <MyPaystack onFailure={onFailure} onSuccess={onSuccess} />
                </Paper>
            </Grid>
        </Container>
        {resView}
    </>
}

function BillSummary(params) {
    let { spaceData } = useContext(SpaceContext)
    return <>
        <Container>
            <SummaryAvail />
        </Container>
    </>
}

function SummaryAvail(params) {
    let { spaceData: { spaceAvailabiltyInfo } } = useContext(SpaceContext);
    let { datesInfo } = spaceAvailabiltyInfo
    console.log(datesInfo)
    return <>
        <Container style={{ height: "50vh", overflow: "scroll" }} >
            <p>Length of stay: {spaceAvailabiltyInfo.lengthOfStay} days</p>
            {datesInfo.dateMode === "asRange" ? <div>
                <p>From: {datesInfo.dateRangeStrings.from}</p>
                <p>To: {datesInfo.dateRangeStrings.to}</p>
            </div> : <div>
                {datesInfo.singleDatesStrings.map((str, index) => <p key={index} >
                    {new Date(str).toLocaleDateString()}</p>)}
            </div>}
        </Container>
    </>
}