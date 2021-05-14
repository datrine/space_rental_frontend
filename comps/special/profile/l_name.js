import { FormControl, Input, InputAdornment } from "@material-ui/core"
import { Person } from "@material-ui/icons"
import { useContext } from "react"
import { ProfileContext } from "../../../utils/contexts"
import { useStyles } from "./styles"
export default function Lastname({ l_name, handleChange }) {
    let classes = useStyles()
    let { profile, changeContext } = useContext(ProfileContext)
    return <>
        <FormControl fullWidth>
            <Input onChange={
                e => {
                    profile.l_name = e.target.value
                    changeContext({...profile });
                }
            } value={profile.l_name || ""}
                placeholder="Last name..." fullWidth
                startAdornment={
                    <InputAdornment position="start">
                        <Person /></InputAdornment>
                } name="l_name"
                className={classes.textField} />
        </FormControl>
    </>
}