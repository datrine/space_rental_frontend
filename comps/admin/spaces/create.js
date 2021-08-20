import { Grid,Button } from "@material-ui/core";
import { getSession } from "next-auth/client";
import { useContext, useState } from "react";
import { MyInput, MySelect } from "../../resuables";
import { SpaceContext } from "../../resuables/contextInterfaces";
import { SpaceAmenityDiv } from "../../special/space/comps/spaceAmenities";
import { LocationDiv } from "../../special/space/comps/spaceLocation";
import { AddImageView } from "../../special/space/comps/space_pics";

function CreateSpace({ hookChangeActiveTab }) {
    let ctx = useContext(SpaceContext)
    let [spaceDataState, changeSpaceData] = useState(ctx.spaceData)
    return <>
        <SpaceContext.Provider value={{ spaceData: spaceDataState, changeContext: changeSpaceData }} >
            <Grid container justify="center" >
                <Grid container item md={6} >
                    <AddImageView />
                    <SpaceMode />
                    <SpaceAmenityDiv />
                    <LocationDiv />

                    <p><Button variant="primary" onClick={async e => {
                        await saveSpace(spaceDataState)
                    }}>Create</Button></p>
                </Grid>
            </Grid>
        </SpaceContext.Provider>
    </>
}

function SpaceMode(params) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeContext } = ctx
    return <>
        <MySelect labelTitle="Select Mode of Space" valueProps={spaceData.space_mode}
            selectMenuArr={[
                { value: "rentable", text: "Rentable" },
                { value: "investable", text: "Investable" },
                { value: "buyable", text: "Buyable" },
            ]} handleChangeProps={
                e => {
                    let newValue = e.target.value
                    changeContext({ ...spaceData, space_mode: newValue })
                }
            } />
    </>
}

async function saveSpace(space) {
    try {
        let
            res = await fetch("/api/spaces", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(space)
            });

        if (res.ok) {
            let data = await res.json();
            if (data.id) {
                let space = data;
                alert("Saved")
            }
        } else {
            throw await res.json();
        }
    } catch (error) {

    }
}

function UnitInfo(params) {
    return<>
    <MyInput/>
    </>
}

export default CreateSpace;