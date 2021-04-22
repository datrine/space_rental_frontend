import { FormControl, MenuItem, Select } from "@material-ui/core"
import { useState } from "react"
import { MySelect } from "../../reusables"
import { useStyles } from "./styles"

export default function GenderSelect({ genderProps, handleChangeProps }) {
    let classes = useStyles()
    let [genderState, changeGenderState] = useState(genderProps)
    let genders = [
        { value: "male", text: "Male" },
        { value: "female", text: "Female" },
        { value: "nonbinary", text: "Non Binary" },
    ]
    return <>
        <FormControl fullWidth style={{ marginBottom: "30px" }}>
            <h5 style={{ color: "black", textAlign:"center"}}>Select Gender</h5>
            <Select
                displayEmpty
                className={classes.textField}
                inputProps={{
                    'aria-label': 'Without label',
                    onChange: e => {
                        changeGenderState(e.target.value)
                        handleChangeProps(e)
                    }, value: genderProps, name: "gender"
                }}
            >
                {genders.map(({ value, text }, index) => <MenuItem
                    key={index} value={value} >{text}</MenuItem>)}
            </Select></FormControl>

    </>
}