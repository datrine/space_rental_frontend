import { FormControl, MenuItem, Select } from "@material-ui/core"
import { useContext, useState } from "react"
import { appColor } from "../../../../utils/utilFns"
import { useStyles } from "../../profile/styles"
import { SpaceContext } from "../../../resuables/contextInterfaces"

export default function AgeRangeSelect({ flatmateIndex }) {
    let classes = useStyles()
    let ctx = useContext(SpaceContext)
    let { spaceData,changeSpaceContext } = ctx
    let { flatmateInfo } = spaceData
    let ageRanges = [
        { value: "20s", text: "20-29" },
        { value: "30s", text: "30-39" },
        { value: "40s", text: "40-49" },
    ]
    let currentAgeRange=flatmateInfo[flatmateIndex].ageRange
    return <>
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
            <h5 style={{ color: "white", backgroundColor: appColor, paddingLeft: "5px" }}>Select Age Range</h5>
            <Select
                displayEmpty
                className={classes.textField}
                inputProps={{
                    'aria-label': 'Without label',
                    onChange: e => {
                        let ageRange = e.target.value;
                        flatmateInfo[flatmateIndex].ageRange = ageRange;
                        changeSpaceContext({ ...spaceData, flatmateInfo })
                    },
                    value: (currentAgeRange || ""),
                    name: "ageRange"
                }}
            >
                {ageRanges.map(({ value, text }, index) => <MenuItem
                    key={index} value={value} >{text}</MenuItem>)}
            </Select></FormControl>

    </>
}