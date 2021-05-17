import { Container, FormControl, Input, InputAdornment } from "@material-ui/core";
import { Email } from "@material-ui/icons";

export function BillingInfo(params) {
    return <>
        <Container>
            <form className="container-fluid mt-2" style={{ maxWidth: "350px" }} >
                <FormControl fullWidth>
                    <Input onChange={formik.handleChange} value={formik.values.email}
                        placeholder="Email..." fullWidth
                        startAdornment={
                            <InputAdornment position="start">
                                <Email style={{ color: formik?.errors?.email ? "red" : "green" }} /></InputAdornment>
                        } type="email" name="email"
                        className={classes.textField} />
                </FormControl>
            </form>
        </Container>
    </>
}