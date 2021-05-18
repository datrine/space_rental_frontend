import { Container, FormControl, Grid, Input, InputAdornment } from "@material-ui/core"
import { LocationCity, Person } from "@material-ui/icons"
import { useContext } from "react"
import { ProfileContext } from "../../../pages/profile"
import { useStyles } from "./styles"
export default function Address({ f_name, handleChange }) {
    let classes = useStyles()
    let { profile, changeContext } = useContext(ProfileContext)
    return <>
        <FormControl fullWidth>
            <Input multiline onChange={e=>{
                    profile.address = e.target.value
                changeContext({...profile})
            }} value={profile.address||""}
                placeholder="Address ..." fullWidth
                startAdornment={
                    <InputAdornment position="start">
                         <LocationCity /></InputAdornment>
                } name="address"
                className={classes.textField} />
        </FormControl></>
}