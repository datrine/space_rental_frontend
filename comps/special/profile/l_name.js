import { FormControl, Input, InputAdornment } from "@material-ui/core"
import { Person } from "@material-ui/icons"
import { useStyles } from "./styles"

export default function Lastname({ l_name, handleChange }) {
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <Input onChange={handleChange} value={l_name}
                placeholder="Last name..." fullWidth
                startAdornment={
                    <InputAdornment position="start">
                         <Person /></InputAdornment>
                } name="l_name"
                className={classes.textField} />
        </FormControl>
    </>
}