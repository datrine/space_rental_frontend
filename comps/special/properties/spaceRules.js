import { Checkbox, Container, Grid, makeStyles, Button, Input } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { IdObj } from "../../../utils/utilFns";
import { RoomContext } from "./room_prop";

const useStyles = makeStyles((theme) => ({
    container: {
    },
    form: {
        marginTop: "30px"
    },
    textField: {
        marginBottom: "5px",
        paddingLeft: "5px",
        borderWidth: 0.5,
        borderBottomStyle: "solid",
        //borderRadius: "5px"
    },
    textArea: {
        marginBottom: "5px",
        paddingLeft: "5px",
        borderWidth: 1,
        borderStyle: "solid",
        //borderRadius: "5px"
    },
    formDiv: {
        width: "100%",
        marginBottom: "25px",
        marginLeft: "10%",
    },
}));

function SpaceRulesDiv(params) {
    return <>
        <Container style={{ padding: 0, marginTop: "20px" }} >
            <h4 className="w3-padding"
                style={{ backgroundColor: "#60941a", color: "white", marginBottom: 0 }} >Space Rules</h4>
            <Container style={{
                borderWidth: 1, borderStyle: "solid", borderColor: "#60941a",
                paddingTop: 20
            }}>
                <SpaceRules />
            </Container>
        </Container>
    </>
}

function SpaceRules(params) {
    const [checked, setChecked] = useState(true);
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let spaceRules = roomData.spaceRules;
    let rules = spaceRules.map((rule) => IdObj(rule))
    let [rulesState, changeRulesState] = useState(rules)
    return <>
        <Container style={{ padding: 0 }}>
            <h5>Select Amenity</h5>
            <Grid container style={{ padding: 0 }}>
                {rulesState.map(({ id, desc }, index) => <Grid key={index} item container
                    xs={6} alignItems="flex-end" style={{ padding: 0 }}>
                    <Grid xs={3} sm={2} item alignItems="flex-end" container style={{ padding: 0 }} >
                        <Checkbox
                            checked={checked} name={id}
                            onChange={(event, checked) => {
                                if (checked) {
                                    spaceRules[index] = { id, desc }
                                    changeRulesState([...spaceRules])
                                } else {
                                    spaceRules.splice(index, 1)
                                    changeRulesState([...spaceRules])
                                }
                                changeRoomContext({ ...roomData, spaceRules })
                            }}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> </Grid>
                    <Grid xs={9} sm={10} item alignItems="flex-end" container><span> {desc}</span></Grid></Grid>)}
            </Grid>
        </Container>
        <RulesAdd rulesProps={rulesState}
            changeRoomsProp={changeRulesState} />
    </>
}

function RulesAdd({ rulesProps, changeRoomsProp }) {
    const [checked, setChecked] = useState(true);
    let ctx = useContext(RoomContext)
    let spaceRules = ctx.spaceRules;
    let [spaceRulesToAdd, changeSpaceRulesToAdd] = useState([])
    return <>
        <RoomContext.Provider value={spaceRules} >
            <Container >
                {spaceRulesToAdd.map((obj, index) => <Grid key={index} container >
                    <Grid xs={8} item container >
                        <Input value={obj.desc} onChange={
                            e => {
                                obj.desc = e.target.value
                                obj = IdObj(obj)
                                changeSpaceRulesToAdd([...spaceRulesToAdd])
                            }
                        } fullWidth />
                    </Grid>
                    <Grid xs={4} item container >
                        <button className="w3-btn" onClick={
                            e => {
                                let objToAdd = spaceRulesToAdd.splice(index, 1)[0]
                                changeSpaceRulesToAdd([...spaceRulesToAdd])
                                rulesProps.push(objToAdd)
                                spaceRules.push(objToAdd)
                                changeRoomsProp([...rulesProps])
                            }
                        } style={{ padding: 0, marginRight: 5, }} ><Add /></button>
                        <button className="w3-btn" onClick={
                            e => {
                                spaceRulesToAdd.splice(index, 1)
                                changeAmenitiesState([...spaceRulesToAdd])
                            }
                        } style={{ padding: 0 }}><Delete /></button>
                    </Grid>
                </Grid>)}
                <p style={{ marginTop: 10 }} >
                    <Button style={{ backgroundColor: "green" }} onClick={
                        e => {
                            let obj = { desc: "" }
                            spaceRulesToAdd.push(IdObj(obj))
                            changeSpaceRulesToAdd([...spaceRulesToAdd])
                        }
                    } >Add Rule</Button></p>
            </Container>
        </RoomContext.Provider> </>
}


export {
    SpaceRulesDiv
}