import { faDoorOpen, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Grid, Input } from "@material-ui/core";
import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import View from "../../view";
import _ from "lodash";
import { space, session } from "../../../utils/models/exportModels";
import { SpaceContext } from "../../../pages/spaces/[id]";
import { ItemTemplate, JustAPanel } from "../../resuables/";
import MobileFilter from "../../filterApp";
import { ProfileMenu } from "../dashboard/resuables";

/**
 * 
 * @param {space} spaceDataProps 
 * @returns 
 */

export const SpaceToBookContext = createContext({
    spaceToBookData: _.clone({
        spaceId: 0,
        spaceMeta: {
            datesToStayInfo: {
                dateMode: "asRange",
                singleDatesStrings: [],
                dateRangeStrings: {
                    from: new Date().toDateString(),
                    to: new Date().toDateString()
                }
            }
        }
    }), changeContext: () => { }
});

function Spaces({ spacesDataProps }) {
    let params = {
        lowerBudget: 800,
        upperBudget: 1000,
        typeOfSpace: "",
        cityOrTown: "",
    }
    //let [paramsState, changeParamsState] = useState(params)
    let itemsWithContexts =
        spacesDataProps.map((spaceDataItem) => <SpaceContext.Provider
            value={{ spaceData: spaceDataItem }}>
            <SpaceToBookContextProvider>
                <ItemTemplate />
            </SpaceToBookContextProvider>
        </SpaceContext.Provider>);
    return <>
        <View
            mobileView={<MobileView itemComps={itemsWithContexts} />}
            pcView={<PCView itemComps={itemsWithContexts} />}
        />
    </>
}

function SpaceToBookContextProvider({ children }) {
    let { spaceData } = useContext(SpaceContext)
    let { spaceToBookData } = useContext(SpaceToBookContext)
    let [spaceToBookDataState, changeSpaceToBookDataState] = useState({
        ...spaceToBookData,
        spaceId: spaceData.spaceId ? spaceData.spaceId : spaceData.id
    });
    return <>
        <SpaceToBookContext.Provider
            value={{
                spaceToBookData: spaceToBookDataState,
                changeContext: changeSpaceToBookDataState
            }} >
            {children}
        </SpaceToBookContext.Provider>
    </>
}

function MobileView({ itemComps }) {
    return <>
        <ProfileMenu />
        <Container style={{ padding: 0, marginTop: 70 }} >
            <SearchSpaces />
            <JustAPanel />
            <Grid container justify="center" >
                {itemComps.
                    map((item, index) => <div key={index} className="w3-padding" >{item}</div>)}
                {itemComps.length < 1 ? <p>No items...</p> : null}
            </Grid>
        </Container>
    </>
}

function PCView({ itemComps }) {
    return <>
        <ProfileMenu />
        <Container style={{ padding: 0, marginTop: 70 }} >
            <SearchSpaces />
            <JustAPanel />
            <Grid container justify="center" >
                {itemComps.
                    map((item, index) => <div key={index} className="w3-padding" >{item}</div>)}
                {itemComps.length < 1 ? <p>No items...</p> : null}
            </Grid>
        </Container>
    </>
}

function SearchSpaces() {
    let [showSearchAppState, changeShowSearchAppState] = useState(false);
    return <>
        <div style={{ textAlign: "center", marginTop: "50px" }} >
            <Grid container justify="center">
                <Grid xs={8} sm={4} item container justify="center" style={{
                    borderRadius: "20px", borderStyle: "solid",
                    borderColor: "green", borderWidth: 0.5, textShadow: "2px 2px"
                }} >
                    <Grid xs={1} item container ></Grid>
                    <Grid xs={9} item container>
                        <Input fullWidth placeholder="Search..." style={{ border: "none" }} />
                    </Grid>
                    <Grid xs={2} item container>
                        <button className="w3-btn" >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        <Button onClick={
            e => {
                changeShowSearchAppState(true)
            }
        } >
            Filter
        </Button>
        {showSearchAppState ? <MobileFilter openSearchApp={showSearchAppState}
            hookOpenFilterApp={changeShowSearchAppState} /> : null
        }
    </>
}
export { Spaces, SpaceContext }