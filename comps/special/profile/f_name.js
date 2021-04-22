import { Container, FormControl, Grid, Input, InputAdornment } from "@material-ui/core"
import { Person } from "@material-ui/icons"
import { useStyles } from "./styles"
export default function Firstname({ f_name, handleChange }) {
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <Input onChange={handleChange} value={f_name}
                placeholder="First name ..." fullWidth
                startAdornment={
                    <InputAdornment position="start">
                         <Person /></InputAdornment>
                } name="f_name"
                className={classes.textField} />
        </FormControl></>
}