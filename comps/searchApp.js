import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Input, AppBar, Toolbar, Slider, Typography } from "@material-ui/core";
import { ArrowLeftRounded, ArrowRightRounded, Cancel } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { appColor } from "../utils/utilFns";
import { MySelect } from "./reusables";

export default function SearchApp({ openSearchApp, hookOpenSearchApp }) {
    let handleClose = () => {
        hookOpenSearchApp(false)
    }
    return <> <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" style={{
            paddingTop: 2, paddingBottom: 2,
            backgroundColor: "#474545"
        }} >
            <Grid container style={{}} >
                <Grid item container xs={10} ><h3 style={{ color: "white" }} >Search</h3> </Grid>
                <Grid item container xs={2} >
                    <Button onClick={handleClose} color="primary" autoFocus>
                        <Cancel style={{ color: "red" }} />
                    </Button></Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            <Container style={{ padding: 0 }} >
                <BtnsToggle />
                <br />
                <Container>
                    <Input placeholder="City, town or area" fullWidth />
                </Container>
                <br />
                <Container>
                <Categories /></Container>
                <br />
                <SliderComp />
                <p style={{ textAlign: "center" }}>
                    <button className="w3-btn"
                        style={{ color: "white", backgroundColor: appColor }} >Search</button>
                </p>
            </Container>
        </DialogContent>
    </Dialog>

    </>
}

function BtnsToggle(params) {
    let [currentBtnIndex, changeCurrentBtnIndex] = useState(0)
    return <>
        <Grid container justify="space-between" style={{ backgroundColor: "#E0DEDE" }} >
            <Button style={{
                backgroundColor: currentBtnIndex === 0 ? appColor : "inherit",
                color: currentBtnIndex === 0 ? "white" : "inherit"
            }} onClick={
                e => {
                    changeCurrentBtnIndex(0)
                }
            } >Rent</Button>
            <Button style={{
                backgroundColor: currentBtnIndex === 1 ? appColor : "inherit",
                color: currentBtnIndex === 1 ? "white" : "inherit"
            }} onClick={
                e => {
                    changeCurrentBtnIndex(1)
                }
            } >Buy</Button>
            <Button style={{
                backgroundColor: currentBtnIndex === 2 ? appColor : "inherit",
                color: currentBtnIndex === 2 ? "white" : "inherit"
            }} onClick={
                e => {
                    changeCurrentBtnIndex(2)
                }
            } >Invest</Button>
            <Button style={{
                backgroundColor: currentBtnIndex === 3 ? appColor : "inherit",
                color: currentBtnIndex === 3 ? "white" : "inherit"
            }} onClick={
                e => {
                    changeCurrentBtnIndex(3)
                }
            } >Flatmate</Button>

        </Grid>
    </>
}

function Categories(params) {
    return <>
        <MySelect labelTitle="Type of Space" valueProps={"office"} selectMenuArr={[
            { value: "residence", text: "Residence" },
            { value: "office", text: "Office" },
        ]} handleChangeProps={
            e => {
                let typeOfStay = e.target.value
            }
        } />
    </>
}

function SliderComp(params) {
    let [slideRange, changeSlideRange] = useState([15000, 65000]);
    let [maxState, changeMaxState] = useState(100000);

    const handleChange = (event, newValue) => {
        // console.log(newValue)
        changeSlideRange(newValue);
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
                <Slider max={maxState} marks={marksup(maxState)} value={slideRange}
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