import { FormControl, MenuItem, Select } from "@material-ui/core"
import { useContext, useState } from "react"
import { appColor } from "../../../../utils/utilFns"
import { useStyles } from "../../profile/styles"
import { SpaceContext } from "../../../resuables/contextInterfaces"

export default function GenderSelect({ flatmateIndex }) {
    let classes = useStyles()
    let ctx = useContext(SpaceContext)
    let { spaceData,changeSpaceContext } = ctx
    let { flatmateInfo } = spaceData
    let genders = [
        { value: "male", text: "Male" },
        { value: "female", text: "Female" },
        { value: "nonbinary", text: "Non Binary" },
    ];
    let currentGender=flatmateInfo[flatmateIndex].gender
    return <>
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
            <h5 style={{ color: "white", backgroundColor: appColor, paddingLeft: "5px" }}>Select Gender</h5>
            <Select
                displayEmpty
                className={classes.textField}
                inputProps={{
                    'aria-label': 'Without label',
                    onChange: e => {
                        let gender = e.target.value;
                        flatmateInfo[flatmateIndex].gender = gender;
                        changeSpaceContext({ ...spaceData, flatmateInfo })
                    },
                    value: (currentGender || ""),
                    name: "gender"
                }}
            >
                {genders.map(({ value, text }, index) => <MenuItem
                    key={index} value={value} >{text}</MenuItem>)}
            </Select></FormControl>

    </>
}