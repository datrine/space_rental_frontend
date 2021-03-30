const { Container, Grid, Paper, Button, Input, TextField } = require("@material-ui/core");
import { faArrowCircleRight, faArrowLeft, faBars, faHeart as faHeartSolid, faStar, faTimes } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ArrowUpward, Search, Star, StarHalf } from "@material-ui/icons";
import Carousel from 'react-bootstrap/Carousel';
import Image from "next/image"
import PropTypes from "prop-types"
import { useEffect, useState, Fragment } from "react";
import View from "./view";

function SearchMiniApp({ width = "100%", placeholderText = "Search..." }) {
    return <>
        <Container style={{
            borderRadius: "30px", borderWidth: "1px", borderStyle: "solid",
            paddingTop: 5, paddingBottom: 5, width, boxShadow: "3px 3px grey"
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

function ItemTemplate({ imgSrc = "/room_placeholder.jpeg" || [], imgProps: { width = 200, height = 200 } = {} }) {
    console.log(process.env)
    return <>
        <Container style={{
            borderWidth: 1, borderStyle: "solid",
            borderColor: "green", borderRadius: "20px", paddingTop: "10px"
        }}>
            <Grid direction="column" alignItems="stretch" justify="center" >
                {Array.isArray(imgSrc) && imgSrc.length > 0 ? <Carousel>
                    {imgSrc.map((src) => <Carousel.Item>
                        <Image layout="responsive" width={width} height={height}
                            src={src ? src : "/room_placeholder.jpeg"} />
                    </Carousel.Item>)}

                </Carousel> :
                    <Image layout="responsive" width={width} height={height}
                        src="/room_placeholder.jpeg" />}
                <Rating />
                <Grid container direction="column" >
                    <span>Co-working desk @ Abuja</span>
                    <span>₦50 per day</span>
                </Grid>
            </Grid>
            <Container style={{ borderTopStyle: "solid", borderTopWidth: "1px" }} >
                <p style={{ textAlign: "center" }}>
                    <SaveBtn />
                </p>
            </Container>
        </Container>
    </>
}
function SaveBtn() {
    let [isClicked, toggleIsClicked] = useState(false)
    return <>
        <Button onClick={
            e => {
                toggleIsClicked(!isClicked)
            }
        } >
            <FontAwesomeIcon icon={isClicked ? faHeartSolid : faHeartRegular} style={{
                color: "green", fontSize: "2em"
            }} />
        </Button>
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

function ToTheTop() {
    return <>
        <Button href="#" style={{}} >
            <ArrowUpward />
        </Button>
    </>
}

export { ItemTemplate, SearchMiniApp, View }