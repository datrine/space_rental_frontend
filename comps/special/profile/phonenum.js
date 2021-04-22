import { FormControl, Input, InputAdornment } from "@material-ui/core"
import { Phone } from "@material-ui/icons"
import { useStyles } from "./styles"


export default function PhoneNum({ phonenum, phonenumError, handleChange }) {
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <Input onChange={handleChange} value={phonenum} fullWidth
                startAdornment={<InputAdornment position="start">
                    <Phone /></InputAdornment>}
                name="phonenum" placeholder="Phone number..."
                className={classes.textField} />
        </FormControl>
        <p>
            {phonenumError ? <span className="w3-text-red" >
                {phonenumError}</span> : null}</p>
    </>
}