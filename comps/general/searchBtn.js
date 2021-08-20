import { useState, useEffect } from "react"
import { Tabs, TextField, makeStyles, } from '@material-ui/core';

import SearchApp from '../searchApp';

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        top: 0,
        height: 60
    },

    btnStacked: {
        display: 'flex',
        justifyContent: "center",
        flexDirection: "column",
        borderWidth: 0,
        backgroundColor: "transparent"
    },
}));

let SearchBtn = () => {
    let classes = useStyles();
    let [viewState, changeViewState] = useState(false);
    let [showSearchAppState, changeShowSearchAppState] = useState(false);
    return <>
        <TextField placeholder="Search..." onFocus={
            e => {
                changeShowSearchAppState(true)
                e.currentTarget.blur()
            }
        } size="small" variant="outlined" InputLabelProps={{ shrink: true }} style={{
            visibility: viewState ? "hidden" : "visible", marginRight: "10px", marginTop: "10px"
        }} />
        {showSearchAppState ?
            <SearchApp openSearchApp={showSearchAppState}
                hookOpenSearchApp={changeShowSearchAppState} /> : null
        }
    </>
}

export default SearchBtn