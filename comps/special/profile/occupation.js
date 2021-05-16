import { Container, FormControl, Grid, Input, InputAdornment } from "@material-ui/core"
import { Person, Work } from "@material-ui/icons"
import { useContext } from "react"
import { ProfileContext } from "../../../pages/profile"
import { useStyles } from "./styles"
export default function Occupation({ f_name, handleChange }) {
    let classes = useStyles()
    let { profile, changeContext } = useContext(ProfileContext)
    return <>
        <FormControl fullWidth >
            <Input onChange={e=>{
                    profile.occupation = e.target.value
                changeContext({...profile})
            }} value={profile.occupation||""}
                placeholder="Occupation..." fullWidth
                startAdornment={
                    <InputAdornment position="start">
                         <Work /></InputAdornment>
                } name="occupation"
                className={classes.textField} />
        </FormControl></>
}