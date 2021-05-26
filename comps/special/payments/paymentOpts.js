import { Container, FormControl, Grid, Input, InputAdornment } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { MyPaystack } from "./via_paystack";

import { paymentEnums } from "./index"
import { useContext } from "react";
import { SpaceContext } from "../space/index_desc";
/**
 * 
 * @param {object} param0 
 * @param {paymentEnums} param0.paymentProp 
 * @returns 
 */
export function PaymentOpts(params) {
    return <>
        <Container>
            <BillSummary />
            <Grid>
                <MyPaystack />
            </Grid>
        </Container>
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
        <Container style={{height:"50vh",overflow:"scroll"}} >
            <p>Length of stay: {spaceAvailabiltyInfo.lengthOfStay} days</p>
            {datesInfo.dateMode === "asRange" ? <div>
                <p>From: {datesInfo.dateRangeStrings.from}</p>
                <p>To: {datesInfo.dateRangeStrings.to}</p>
            </div> : <div>
                {datesInfo.singleDatesStrings.map((str, index) => <p key={index} >
                    {new Date (str) .toLocaleDateString()}</p>)}
            </div>}
        </Container>
    </>
}