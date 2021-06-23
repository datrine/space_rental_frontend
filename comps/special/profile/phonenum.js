import { FormControl, Input, InputAdornment } from "@material-ui/core"
import { Phone } from "@material-ui/icons"
import { useContext } from "react";
import { ProfileContext } from "../../../pages/profile";
import { useStyles } from "./styles"


export default function PhoneNum({ }) {
    let classes = useStyles()
    let { profile, changeContext } = useContext(ProfileContext);
    return <>
        <FormControl fullWidth>
            <Input onChange={e => {
                profile.phonenum = e.target.value;
                changeContext({ ...profile });
            }} value={profile.phonenum} fullWidth
                startAdornment={<InputAdornment position="start">
                    <Phone /></InputAdornment>}
                name="phonenum" placeholder="Phone number..."
                className={classes.textField} />
        </FormControl>
    </>
}