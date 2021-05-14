import { Container, FormControl, Grid, Input, InputAdornment } from "@material-ui/core"
import { Person } from "@material-ui/icons"
import { useContext } from "react"
import { ProfileContext } from "../../../utils/contexts"
import { useStyles } from "./styles"
export default function Firstname({ f_name, handleChange }) {
    let classes = useStyles()
    let { profile, changeContext } = useContext(ProfileContext)
    return <>
        <FormControl fullWidth>
            <Input onChange={e=>{
                console.log("shsshsh")
                    profile.f_name = e.target.value
                changeContext({...profile})
            }} value={profile.f_name}
                placeholder="First name ..." fullWidth
                startAdornment={
                    <InputAdornment position="start">
                         <Person /></InputAdornment>
                } name="f_name"
                className={classes.textField} />
        </FormControl></>
}