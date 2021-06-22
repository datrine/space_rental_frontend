import { FormControl, MenuItem, Select } from "@material-ui/core"
import { useContext, useState } from "react"
import { ProfileContext } from "../../../pages/profile"
import { appColor } from "../../../utils/utilFns"
import { useStyles } from "./styles"

export default function GenderSelect({ genderProps, handleChangeProps }) {
    let classes = useStyles()
    let { profile, changeContext } = useContext(ProfileContext)
    let [genderState, changeGenderState] = useState(profile.gender)
    let { gender } = profile
    let genders = [
        { value: "male", text: "Male" },
        { value: "female", text: "Female" },
        { value: "nonbinary", text: "Non Binary" },
    ]
    return <>
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
            <h5 style={{ color: "white", backgroundColor:appColor,paddingLeft:"5px" }}>Select Gender</h5>
            <Select
                displayEmpty
                className={classes.textField}
                inputProps={{
                    'aria-label': 'Without label',
                    onChange: e => {
                        changeContext(e.target.value)
                        handleChangeProps(e)
                    }, value: (gender || ""), name: "gender"
                }}
            >
                {genders.map(({ value, text }, index) => <MenuItem
                    key={index} value={value} >{text}</MenuItem>)}
            </Select></FormControl>

    </>
}