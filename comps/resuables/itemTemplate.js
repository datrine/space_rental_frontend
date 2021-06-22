const { Container, Grid, Paper, Button } = require("@material-ui/core");
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Info, Star, StarHalf } from "@material-ui/icons";
import Carousel from 'react-bootstrap/Carousel';
import Image from "next/image"
import PropTypes from "prop-types"
import { useEffect, useState, Fragment, useContext } from "react";
import { SpaceContext, Spaces } from "../special/spaces";
import { appColor, getImgUrl } from "../../utils/utilFns";
import { useRouter } from "next/router";
import { UserSessionContext } from "../../pages/_app";

function ItemTemplate({ imgProps: { width = 200, height = 200 } = {} }) {
    let { pathname } = useRouter();
    let itemPath = "spaces"
    switch (pathname) {
        case "/spaces":
            itemPath = "spaces"
            break;
        case "/offices":
            itemPath = "offices"
            break;
        case "/residences":
            itemPath = "residences"
            break;
        default:
            break;
    }
    let { spaceData:
        { id, locationInfo, space_pics, spaceInfo,
            nameOfSpace, spaceBills, typeOfSpace } } = useContext(SpaceContext)
    let imgSrc = space_pics.map((data) => getImgUrl(data))
        || "/room_placeholder.jpeg"
    return <>
        <Container style={{
            width: 300,
            borderWidth: 1, borderStyle: "solid",
            borderColor: "green", borderRadius: "20px", paddingTop: "10px"
        }}>
            <div >
                {Array.isArray(imgSrc) && imgSrc.length > 0 ? <Carousel>
                    {imgSrc.map((src, index) => <Carousel.Item key={index} >
                        <Image layout="responsive" width={width} height={height}
                            src={src ? src : "/room_placeholder.jpeg"} />
                    </Carousel.Item>)}

                </Carousel> :
                    <Image layout="responsive" width={width} height={height}
                        src="/room_placeholder.jpeg" />}
                <Rating />
                <Grid container direction="column" >
                    <span>{nameOfSpace || spaceInfo.houseType} @ {locationInfo.cityOrTown}</span>
                    <span>₦{spaceBills.charge} per {spaceBills.billFormat}</span>
                </Grid>
            </div>
            <Container style={{}} >
                <p style={{ textAlign: "center" }}>
                    <SaveBtn />
                    <a style={{ backgroundColor: appColor,color:"white" }}
                        className="w3-btn" href={`${pathname}/${id}`} >Book</a>
                </p>
            </Container>
        </Container>
    </>
}

function SaveBtn() {
    let [isClicked, toggleIsClicked] = useState(false)
    let { session: { user } } = useContext(UserSessionContext)
    if (!user.id) {
        return <></>
    }
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
    })
    return <>
        <Paper>
            <Grid container justify="space-between" style={{ width: 200 }}
            >
                {rateBtns.map((elem, index) => <Fragment key={index} >{elem}</Fragment>)}
            </Grid>
        </Paper>
    </>
}

function StarBtn({ starValue, ratingProps, hookChangeRating }) {
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

export {
    ItemTemplate,
}