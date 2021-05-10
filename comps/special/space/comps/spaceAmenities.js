import { Checkbox, Container, Grid, makeStyles, Button, Input } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import _ from "lodash";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { IdObj } from "../../../../utils/utilFns";
import { SpaceContext } from "..";

function SpaceAmenityDiv(params) {
    return <>
        <Container style={{ padding: 0, marginTop: "20px" }} >
            <h4 className="w3-padding"
                style={{ backgroundColor: "#60941a", color: "white", marginBottom: 0 }} >Space Amenities</h4>
            <Container style={{
                borderWidth: 1, borderStyle: "solid", borderColor: "#60941a",
                paddingTop: 20
            }}>
                <SpaceAmenities />
            </Container>
        </Container>
    </>
}

function SpaceAmenities(params) {
    const [checked, setChecked] = useState(true);
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { spaceAmenities } = spaceData
    spaceAmenities = spaceAmenities.map((amenity) => IdObj(amenity));
    return <>
        <>
            <Container style={{ padding: 0 }}>
                <h5>Select Amenity</h5>
                <Grid container style={{ padding: 0 }}>
                    {spaceAmenities.map(({ id, desc }, index) => <Grid key={index} item container
                        xs={6} alignItems="flex-end" style={{ padding: 0 }}>
                        <Grid xs={3} sm={2} item alignItems="flex-end" container style={{ padding: 0 }} >
                            <Checkbox
                                checked={checked} name={id}
                                onChange={(event, checked) => {
                                    if (checked) {
                                        spaceAmenities[index] = { id, desc }
                                        changeSpaceContext({ ...spaceData, spaceAmenities })
                                    } else {
                                        spaceAmenities.splice(index, 1)
                                        changeSpaceContext({ ...spaceData, spaceAmenities })
                                    }
                                }}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> </Grid>
                        <Grid xs={9} sm={10} item alignItems="flex-end" container><span> {desc}</span></Grid></Grid>)}
                </Grid>

            </Container>
            <AmenityAdd />
        </> </>
}

function AmenityAdd({ }) {
    let ctx = _.cloneDeep(useContext(SpaceContext))
    let {spaceData, changeSpaceContext } = ctx
    let { spaceAmenities } = spaceData
    let [spaceAmenitiesToAdd, changeSpaceAmenitiesToAdd] = useState([{ desc: "" }])
    return <>
        <Container >
            {spaceAmenitiesToAdd.map((obj, index) => <Grid key={index} container >
                <Grid xs={8} item container >
                    <Input value={obj.desc} onChange={
                        e => {
                            obj.desc = e.target.value
                            obj = IdObj(obj)
                            changeSpaceAmenitiesToAdd([...spaceAmenitiesToAdd])
                        }
                    } fullWidth />
                </Grid>
                <Grid xs={4} item container >
                    <button className="w3-btn" onClick={
                        e => {
                            let objToAdd = spaceAmenitiesToAdd.splice(index, 1)[0]
                            changeSpaceAmenitiesToAdd([...spaceAmenitiesToAdd])
                            spaceAmenities.push(objToAdd)
                            changeSpaceContext({ ...spaceData, spaceAmenities })
                        }
                    } style={{ padding: 0, marginRight: 5, }} ><Add /></button>
                    <button className="w3-btn" onClick={
                        e => {
                            spaceAmenitiesToAdd.splice(index, 1)
                            changeSpaceAmenitiesToAdd([...spaceAmenitiesToAdd])
                        }
                    } style={{ padding: 0 }}><Delete /></button>
                </Grid>
            </Grid>)}
            <p style={{ marginTop: 10 }} >
                <Button style={{ backgroundColor: "green" }} onClick={
                    e => {
                        let obj = { desc: "" }
                        spaceAmenitiesToAdd.push(IdObj(obj))
                        changeSpaceAmenitiesToAdd([...spaceAmenitiesToAdd])
                    }
                } >Add Amenity</Button></p>
        </Container>
    </>
}

export {SpaceAmenityDiv,}