import { Container, FormControl, Grid, Input, InputAdornment } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import {MyPaystack} from "./via_paystack";

import {paymentEnums} from "./index"
/**
 * 
 * @param {object} param0 
 * @param {paymentEnums} param0.paymentProp 
 * @returns 
 */
export function PaymentOpts(params) {
    return <>
        <Container>
            <Grid>
                <MyPaystack/>
            </Grid>
        </Container>
    </>
}