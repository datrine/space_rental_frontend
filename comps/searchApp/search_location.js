import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Input, AppBar, Toolbar, Slider, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { useContext, useState } from "react";
import { appColor } from "../../utils/utilFns";
import { ItemTemplate, MiniItemTemplate, MySelect } from "../resuables";
import { SearchContext, Search_N_FilterContextProvider } from "../searchNfilter";
import { ISpaceContext } from "../resuables/contextInterfaces";
import { SearchTab } from "../filterApp/tab_of_filter";


export function SearchByLocation() {
    let { params, changeParams } = useContext(SearchContext)
    let [paramsState, changeParamsState] = useState(params)
    return <>
        <Container>
            <Input value={paramsState.cityOrTown} onChange={
                e => {
                    changeParamsState({ ...paramsState, cityOrTown: e.target.value })
                }
            } placeholder="City, town or area" fullWidth />
        </Container>
    </>
}