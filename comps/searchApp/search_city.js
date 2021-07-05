import { Grid } from "@material-ui/core"
import { useContext, useState } from "react"
import { appColor } from "../../utils/utilFns";
import { SearchContext } from "../searchNfilter";


export function BtnsToggle() {
    let [currentBtnIndex, changeCurrentBtnIndex] = useState(0)
    let {params,changeParams}=useContext(SearchContext);
    return <>
        <Grid container justify="space-between" style={{ backgroundColor: "#E0DEDE" }} >
            <button className="w3-btn" style={{
                backgroundColor: currentBtnIndex === 0 ? appColor : "inherit",
                color: currentBtnIndex === 0 ? "white" : "inherit",padding:2,borderRadius:2
            }} onClick={
                e => {
                    changeCurrentBtnIndex(0)
                }
            } >Rent</button>
            <button className="w3-btn" style={{
                backgroundColor: currentBtnIndex === 1 ? appColor : "inherit",
                color: currentBtnIndex === 1 ? "white" : "inherit",padding:2,borderRadius:2
            }} onClick={
                e => {
                    changeCurrentBtnIndex(1)
                }
            } >Buy</button>
            <button className="w3-btn" style={{
                backgroundColor: currentBtnIndex === 2 ? appColor : "inherit",
                color: currentBtnIndex === 2 ? "white" : "inherit",padding:2,borderRadius:2
            }} onClick={
                e => {
                    changeCurrentBtnIndex(2)
                }
            } >Invest</button>
            <button className="w3-btn" style={{
                backgroundColor: currentBtnIndex === 3 ? appColor : "inherit",
                color: currentBtnIndex === 3 ? "white" : "inherit",padding:2,borderRadius:2
            }} onClick={
                e => {
                    changeCurrentBtnIndex(3)
                }
            } >Flatmate</button>
        </Grid>
    </>
}