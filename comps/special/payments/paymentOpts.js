import { Container, FormControl, Grid, Input, InputAdornment } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import {MyPaystack} from "./via_paystack";

export function PaymentOpts(params) {
    return <>
        <Container>
            <Grid>
                <MyPaystack/>
            </Grid>
        </Container>
    </>
}