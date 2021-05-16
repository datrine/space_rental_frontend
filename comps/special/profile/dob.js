import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Input, } from "@material-ui/core";
import { DateTime } from "luxon";
import React, { useContext, useState } from "react";
import DayPicker, { DateUtils } from 'react-day-picker';
import { ProfileContext } from "../../../pages/profile";
import { appColor } from "../../../utils/utilFns";

export function Calendar({ }) {
    let { profile, changeContext } = useContext(ProfileContext)
    let dateO = DateTime.fromISO(profile.dob).toFormat("yyyy-MM-dd")
    return (
        <Container style={{ padding: 0 }} >
            <h4 style={{
                color: "white", backgroundColor: appColor, paddingLeft: "5px"
            }}>Date of birth</h4>
            <Input className="container-fluid" onChange={
                e => {
                    profile.dob = e.target.valueAsDate.toISOString();
                    changeContext({ ...profile })
                }
            } type="date" id="start" name="dob"
                value={dateO} max="2005-12-31" />
        </Container>
    );
}