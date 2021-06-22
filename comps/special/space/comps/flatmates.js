import { Button, Container, } from "@material-ui/core";
import { MyInput, } from "../../../resuables/index";
import GenderSelect from "../../profile/gender";
import { useContext, useState } from "react";
import { SpaceContext } from "..";
import { Delete } from "@material-ui/icons";
import React from "react";
import { IdObj } from "../../../../utils/utilFns";

function FlatmateDiv(params) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let flatmateInfo = spaceData.flatmateInfo.map(info => IdObj(info))
    return <>
        {spaceData.typeOfSpace === "residence" ?
            <Container style={{ padding: 0, marginTop: "20px", }} >
                <h4 className="w3-padding"
                    style={{ backgroundColor: "#60941a", color: "white", marginBottom: 0 }} >Flatmate(s) Details</h4>
                <Container style={{ borderWidth: 1, borderStyle: "solid", borderColor: "#60941a" }}>
                    {flatmateInfo.map((info, index) => <Container key={info.id} >
                        <Flatmate
                            indexProp={index} />
                    </Container>)}
                    <p style={{ marginTop: "10px" }}>
                        <Button onClick={
                            e => {
                                let fms = [...flatmateInfo]
                                let obj = { name: "", gender: "male" }
                                fms.push(obj)
                                flatmateInfo = [...fms]
                                changeSpaceContext({ ...spaceData, flatmateInfo })
                            }
                        } style={{ backgroundColor: "#60941a" }}>Add Flatmate</Button></p>

                </Container>
            </Container>

            : null}
    </>
}

function Flatmate({ indexProp, }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let flatmateInfo = spaceData.flatmateInfo
    let oneFlatmateInfo = flatmateInfo[indexProp]
    let { name = "", gender = "", occupation = "" } = oneFlatmateInfo

    let handerGender = (e) => {
        oneFlatmateInfo.gender = e.target.value
    }

    return <>
        <Container style={{ borderStyle: "solid", borderWidth: 1, borderColor: "#60941a", marginTop: 10 }} >
            <MyInput placeholder="Flatmate name" value={name} handleChangeProps={
                e => {
                    oneFlatmateInfo.name = e.target.value
                }} />
            <MyInput placeholder="Flatmate Occupation" value={occupation} handleChangeProps={
                e => {
                    oneFlatmateInfo.occupation = e.target.value
                }} />
            <GenderSelect genderProps={gender} handleChangeProps={handerGender} />
            <Button onClick={
                e => {
                    flatmateInfo.splice(indexProp, 1);
                    changeSpaceContext({ ...spaceData, flatmateInfo })
                    //ctx.flatmateInfo=[...flatmatesState]
                }
            }><Delete /></Button>
        </Container>

    </>
}

export { FlatmateDiv, }