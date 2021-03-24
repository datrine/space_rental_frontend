const { Container, Grid, Paper, Button, Input, TextField } = require("@material-ui/core"); import { faArrowCircleRight, faArrowLeft, faBars, faStar, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Search, Star, StarHalf } from "@material-ui/icons";
import Image from "next/image"
import PropTypes from "prop-types"
import { useState } from "react";
import View from "./view"

function SearchMiniApp({width="100%", placeholderText = "Search..." }) {
    return <>
        <Container style={{ borderRadius: "30px", borderWidth: "2px", borderStyle: "solid",
        paddingTop:10,paddingBottom:10,width,boxShadow:"3px 3px grey" }} >
            <Grid container justify="space-between" alignItems="stretch" >
                <Grid item xs={10} sm={11} >
                    <TextField fullWidth placeholder={placeholderText}
                        style={{ paddingLeft: "10px" }} /></Grid>
                <Grid item xs={2} sm={1}>
                    <Button>
                        <Search />
                    </Button>
                </Grid>
            </Grid>

        </Container>
    </>
}

function ItemTemplate({ imgSrc, imgProps: { width = 200, height = 200 } }) {
    return <>
        <Container>
            <Grid direction="column" alignItems="stretch" justify="center" >
                <Image width={imgProps.width} height={imgProps.height} src={imgSrc} />
                <Rating />
            </Grid>
        </Container>
    </>
}

function Rating() {
    let [rating, changeRating] = useState(0)
    return <>
        <Paper>
            <Grid>
                <StarBtn hookChangeRating={changeRating} />
            </Grid>
        </Paper>
    </>
}

function StarBtn({ hookChangeRating }) {
    let [clickState, changeClickState] = useState(null)
    return <>
        <Button onClick={
            e => {
                if (clickState === "none" || (clickState !== "half" && clickState !== "full")) {
                    changeClickState("half")
                }
                else if (clickState === "half") {
                    changeClickState("full")
                }
                else if (clickState === "full") {
                    changeClickState("none")
                }
            }
        } >
            {clickState === "none" ? <Star className="w3-white" /> :
                (clickState === "half" ? <StarHalf className="w3-blue" /> :
                    clickState === "full" ? <Star className="w3-blue" /> :
                        <Star className="w3-white" />)}
        </Button></>
}


ItemTemplate.propTypes = {
    imgSrc: PropTypes.string,
    imgProps: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    })
}


export { ItemTemplate, SearchMiniApp, View }