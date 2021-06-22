import { faDoorOpen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Grid, Input } from "@material-ui/core";
import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import View from "../../view";
import _ from "lodash";
import { space, session } from "../../../utils/models/exportModels";
import { SpaceContext } from "../../../pages/spaces/[id]";
import { ItemTemplate } from "../../resuables/";
import MobileFilter from "../../filterApp";
import { SearchContext } from "../../searchNfilter";
import { Filter } from "@material-ui/icons";

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
    let [showSearchAppState, changeShowSearchAppState] = useState(false);
    let params = {
        lowerBudget: 800,
        upperBudget: 1000,
        typeOfSpace: "",
        cityOrTown: "",
    }
    let [paramsState, changeParamsState] = useState(params)
    let itemsWithContexts =
        spacesDataProps.map((spaceDataItem) => <SpaceContext.Provider
            value={{ spaceData: spaceDataItem }}>
            <SpaceToBookContextProvider>
                <ItemTemplate />
            </SpaceToBookContextProvider>
        </SpaceContext.Provider>)
    return <>
        <SearchContext.Provider value={{ params: paramsState, changeParams: changeParamsState }} >
            <View mobileView={<MobileView itemComps={itemsWithContexts} />} />
        </SearchContext.Provider>
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
        <Container style={{ padding: 0 }} >
            <SearchSpaces />
            <Grid container justify="center" >
                {itemComps.
                    map((item, index) => <div key={index} className="w3-padding" >{item}</div>)}
            </Grid>
        </Container>
    </>
}

function SearchSpaces() {
    let [showSearchAppState, changeShowSearchAppState] = useState(false);
    return <>

        <div style={{ textAlign: "center", marginTop: "50px" }} >
            <div style={{
                width: "80vw", marginLeft: "10vw",
                borderRadius: "20px", borderStyle: "solid",
                borderColor: "green", borderWidth: 0.5, textShadow: "2px 2px"
            }} >
                <Grid container >
                    <Grid xs={1} item container ></Grid>
                    <Grid xs={9} item container>
                        <Input fullWidth />
                    </Grid>
                    <Grid xs={2} item container>
                        <button className="w3-btn" >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </Grid>
                </Grid>
            </div>
        </div>
        <Button onClick={
            e => {
                changeShowSearchAppState(true)
            }
        } >
            <Filter />
        </Button>
        {showSearchAppState ? <MobileFilter openSearchApp={showSearchAppState}
            hookOpenFilterApp={changeShowSearchAppState} /> : null
        }
    </>
}
export { Spaces, SpaceContext }