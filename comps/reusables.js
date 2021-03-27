const { Container, Grid, Paper, Button, Input, TextField } = require("@material-ui/core"); import { faArrowCircleRight, faArrowLeft, faBars, faStar, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Search, Star, StarHalf } from "@material-ui/icons";
import Carousel from 'react-bootstrap/Carousel';
import Image from "next/image"
import PropTypes from "prop-types"
import { useEffect, useState, Fragment } from "react";
import View from "./view";

function SearchMiniApp({ width = "100%", placeholderText = "Search..." }) {
    return <>
        <Container style={{
            borderRadius: "30px", borderWidth: "2px", borderStyle: "solid",
            paddingTop: 10, paddingBottom: 10, width, boxShadow: "3px 3px grey"
        }} >
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

function ItemTemplate({ imgSrc = "/room_placeholder.jpeg", imgProps: { width = 200, height = 200 } = {} }) {
    return <>
        <Container>
            <Grid direction="column" alignItems="stretch" justify="center" >
                {Array.isArray(imgSrc) ? <Carousel>
                    {imgSrc.map((src) => <Carousel.Item>
                        <Image width={width} height={height} src={imgSrc} />
                    </Carousel.Item>)}

                </Carousel> : <Image layout="responsive" width={width} height={height} src={imgSrc} />}
                <Rating />
            </Grid>
        </Container>
    </>
}

function Rating() {
    let [rating, changeRating] = useState(0)
    let rateBtns = [];
    for (let btnIndex = 1; btnIndex <= 5; btnIndex++) {
        rateBtns.push(<StarBtn starValue={btnIndex} ratingProps={rating} hookChangeRating={changeRating} />)
    }
    useEffect(() => {
        console.log(rating)
    })
    return <>
        <Paper>
            <Grid justify="space-between"
            >
                {rateBtns.map((elem, index) => <Fragment key={index} >{elem}</Fragment>)}
                {rating === 0 ? <span>Unrated...</span> : null}</Grid>
        </Paper>
    </>
}

function StarBtn({ starValue, ratingProps, hookChangeRating }) {
    console.log("btnIndex" + starValue)
    let click = "none"
    if (ratingProps >= starValue) {
        click = "full"
    } else if (ratingProps === (starValue - 0.5)) {
        click = "half"
    }
    else
        if (ratingProps < (starValue - 1)) {
            click = "none"
        }
    return <>
        <button className="w3-btn" onClick={
            e => {
                let rating = ratingProps
                if (click === "none" || (click !== "half" && click !== "full")) {
                    rating = (starValue - 1) + 0.5;
                    hookChangeRating(rating)
                }
                else if (click === "half") {
                    rating = starValue;
                    hookChangeRating(rating)
                }
                else if (click === "full") {
                    rating = starValue - 1;
                    hookChangeRating(rating)
                    if (ratingProps <= starValue - 1) {
                    }
                }
                console.log(rating)
            }
        } style={{ padding: 0, paddingLeft: 0, paddingRight: 0, marginRight: "10px" }} >
            {click === "none" ? <Star className="w3-text-grey" /> :
                (click === "half" ? <StarHalf className="w3-text-blue" /> :
                    click === "full" ? <Star className="w3-text-blue" /> :
                        <Star className="w3-text-grey" />)}
        </button></>
}


ItemTemplate.propTypes = {
    imgSrc: PropTypes.string,
    imgProps: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    })
}


export { ItemTemplate, SearchMiniApp, View }