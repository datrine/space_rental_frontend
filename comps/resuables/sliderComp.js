import { Grid, Slider, Typography } from "@material-ui/core";
import { ArrowLeftRounded, ArrowRightRounded, Cancel } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../searchNfilter";
import { appColor } from "../../utils/utilFns";
/**
 * 
 * @param {{Ctx:SearchContext}} 
 * @returns 
 */
export default function SliderComp({ }) {
    let { params, changeParams } = useContext(SearchContext)
    let { lowerBudget = 15000, upperBudget = 65000 } = params
    let [slideRange, changeSlideRange] = useState([lowerBudget, upperBudget]);
    let [maxState, changeMaxState] = useState(100000);

    const handleChange = (event, newValue) => {
        params.lowerBudget = newValue[0];
        params.upperBudget = newValue[1];
        changeParams({ ...params })
    };
    let slideUpper = slideRange[1]
    let slideLower = slideRange[0]
    useEffect(() => {
        if ((slideUpper / maxState) >= 0.9999) {
            if (maxState < 10000000) {
                changeMaxState(maxState * 10)
            }
        }
        else if ((slideUpper / maxState) <= 0.0001) {
            if (maxState > 100) {
                changeMaxState(maxState / 10)
            }
        }
    }, [slideUpper]);

    function marksup(max) {
        let marks = []
        let step = 10
        let divider = 10
        let suffix = ""
        if (max >= 0 && max <= 10) {
            divider = 1
            for (let index = 0; index <= max; index += divider) {
                let obj = {
                    value: index,
                    label: `${index}`
                }
                marks.push(obj)
            }
        }
        if (max > 10 && max <= 100) {
            divider = 10
            for (let index = 0; index <= max; index += divider) {
                let obj = {
                    value: index,
                    label: `${index}`
                }
                marks.push(obj)
            }
        }
        else if (max > 100 && max <= 1000) {
            divider = 200
            for (let index = 0; index <= max; index += divider) {
                let obj = {
                    value: index,
                    label: `${index}`
                }
                marks.push(obj)
            }
        }
        else if (max > 1000 && max <= 10000) {
            suffix = "k"
            divider = 2000
            for (let index = 0; index <= max; index += divider) {
                let obj = {
                    value: index,
                    label: `${index / 1000}${suffix}`
                }
                marks.push(obj)
            }
        }
        else if (max > 10000 && max <= 100000) {
            suffix = "k"
            divider = 25000
            for (let index = 0; index <= max; index += divider) {
                let obj = {
                    value: index,
                    label: `${index / 1000}${suffix}`
                }
                marks.push(obj)
            }
        }
        else if (max > 100000 && max <= 1000000) {
            suffix = "k"
            divider = 250000
            for (let index = 0; index <= max; index += divider) {
                let obj;
                if (index === 1000000) {
                    obj = {
                        value: index,
                        label: `1m`
                    }
                }
                else {
                    obj = {
                        value: index,
                        label: `${index / 1000}${suffix}`
                    }
                }
                marks.push(obj)
            }
        }
        else if (max > 1000000 && max <= 10000000) {
            suffix = "m"
            divider = 2500000
            for (let index = 0; index <= max; index += divider) {
                let obj = {
                    value: index,
                    label: `${index / 1000000}${suffix}`
                }
                marks.push(obj)
            }
        }
        else if (max > 10000000 && max <= 100000000) {
            suffix = "m"
            divider = 25000000
            for (let index = 0; index <= max; index += divider) {
                let obj = {
                    value: index,
                    label: `${index / 1000000}${suffix}`
                }
                marks.push(obj)
            }
        }
        //console.log(divider + " : " + max)
        return marks;
    }

    function valuetext(value) {
        return `${value[0]}-${value[1]}`;
    }

    return <>
        <Typography id="range-slider" gutterBottom>
            Budget range
    </Typography>
        <Grid container >
            <Grid item container xs={1} >
                <span onClick={
                    e => {
                        if (maxState > 100) {
                            changeMaxState(maxState / 10)
                        }
                    }
                } > <ArrowLeftRounded />
                </span> </Grid>
            <Grid item container xs={10} >
                <Slider max={maxState} marks={marksup(maxState)}
                    value={[params.lowerBudget, params.upperBudget]}
                    onChange={handleChange} getAriaValueText={valuetext} />
            </Grid>
            <Grid item container xs={1} >
                <span onClick={
                    e => {
                        if (maxState < 10000000) {
                            changeMaxState(maxState * 10)
                        }
                    }
                } > <ArrowRightRounded />
                </span>
            </Grid> </Grid>
    </>
}