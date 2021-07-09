import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Select } from "@material-ui/core";
import { createContext, useContext } from "react";
import { IPanelContext } from "./contextInterfaces"
export default function JustAPanel(params) {
    useContext(IPanelContext)
    return <>
        <Grid container justify="space-between"  >
            <Prev />
            <Limit />
            <Next />
        </Grid>
    </>
}

function Next(params) {
    let { dataOfPanel, changeContext } = useContext(IPanelContext)
    return <>
        <button className="w3-btn" disabled={dataOfPanel.disableNext} onClick={
            e => {
                let { limit, offset } = dataOfPanel;
                offset = limit + offset
                if (offset > 0) {
                    dataOfPanel.disablePrev = false
                }
                changeContext({ ...dataOfPanel, offset })
            }
        } ><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
    </>
}

function Prev(params) {
    let { dataOfPanel, changeContext } = useContext(IPanelContext)
    return <>
        <button className="w3-btn" disabled={dataOfPanel.disablePrev} onClick={
            e => {
                let { limit, offset } = dataOfPanel;
                offset = Math.max(offset - limit, 0);
                if (offset === 0) {
                    dataOfPanel.disablePrev = true
                }
                changeContext({ ...dataOfPanel, offset })
            }
        } ><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
    </>
}

function Limit(params) {
    let { dataOfPanel, changeContext } = useContext(IPanelContext)
    return <>
        <span className="w3-padding" >Items per page: </span>
        <select
            value={dataOfPanel.limit}
            onChange={e => {
                let limit = e.target.value;
                changeContext({ ...dataOfPanel, limit })
            }}
        >
            <option aria-label="None" value="">Limit</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
        </select>

    </>
}