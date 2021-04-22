const { Container, Grid, Paper, Button, Input, TextField, makeStyles, FormControl, Select, MenuItem } = require("@material-ui/core");
import { faArrowCircleRight, faArrowLeft, faBars, faHeart as faHeartSolid, faStar, faTimes } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ArrowUpward, Info, Search, Star, StarHalf } from "@material-ui/icons";
import Carousel from 'react-bootstrap/Carousel';
import Image from "next/image"
import PropTypes from "prop-types"
import { useEffect, useState, Fragment } from "react";
import View from "./view";
import { useSpring, animated } from 'react-spring'
import { useSession } from "next-auth/client";

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

function ItemTemplate({ id, imgSrc = "/room_placeholder.jpeg" || [], imgProps: { width = 200, height = 200 } = {} }) {
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
                    <a href={`/listings/rooms/${id}`} ><Info /></a>
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
    let body = document.body;
    let html = document.documentElement
    let height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    console.log(window.screen)
    console.log(height)
    return <>
        <a href="#">
            <button className="" style={{
                position: "fixed", bottom: 70, right: 20, width: 40, height: 40, textAlign: "center",
                borderRadius: "50%", border: 0, backgroundColor: "rgba(96,148,26,0.7)"
            }} >
                <ArrowUpward style={{ color: "white" }} />
            </button></a>
    </>
}

function LogoSVG({ roofColor = "white", bodyColor = "white" }) {
    return <>       <svg width="147" height="144" viewBox="0 0 147 144" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M102.087 41.5679V90.9117C102.087 105.281 90.4457 116.939 76.0717 116.939H70.9283C56.5658 116.939 44.9128 105.292 44.9128 90.9117V41.5679C30.1715 50.9979 20.4128 67.5033 20.4128 86.3059C20.4128 115.641 44.1781 139.417 73.5 139.417C102.822 139.417 126.587 115.641 126.587 86.3059C126.587 67.5033 116.828 50.9979 102.087 41.5679Z"
            stroke={bodyColor} strokeWidth="8" strokeMiterlimit="10" />
        <path d="M4.59229 49.5275L73.5 4.59424L142.408 49.5275" stroke={roofColor} strokeWidth="8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    </>
}

function Loading({ state }) {
    let view = null
    const animProps = useSpring({ opacity: 1, from: { opacity: 0 } })

    //if state===Loading
    if (state === 1) {
        view = <animated.div style={animProps} > <Container name="" fullWidth style={{
            backgroundColor: "rgba(0,0,0,0.5)"
        }} >
            <Grid container justify="center" alignItems="center" style={{ height: "100%" }} >
                <LogoSVG roofColor={"rgba(96,148,26,0.7)"} bodyColor={"rgba(96,148,26,0.7)"} />

            </Grid>
        </Container>
        </animated.div>
    }
    else if (state === 2) {
        view = <Container fullWidth style={{
            backgroundColor: "rgba(0,0,0,0.8)"
        }} >
            <Grid container justify="center" alignItems="center" style={{ height: "100vh" }}>
                <LogoSVG roofColor={"rgba(96,148,26,0.7)"} bodyColor={"rgba(96,148,26,0.7)"} />
            </Grid>
        </Container>
    }
    return <>
        {view}
    </>
}

function SessionState({ placeholder, }) {
    let [session, loading] = useSession()
    if (session) {
        return <>
            {children}
        </>
    }
    return <>
        {placeholder ? placeholder : null}
    </>
}

const useStyles = makeStyles((theme) => ({
    container: {
    },
    form: {
        marginTop: "30px"
    },
    textField: {
        marginBottom: "5px",
        paddingLeft: "5px",
        borderWidth: 0.5,
        borderBottomStyle: "solid",
        //borderRadius: "5px"
    },
    textArea: {
        marginBottom: "5px",
        paddingLeft: "5px",
        borderWidth: 1,
        borderStyle: "solid",
        //borderRadius: "5px"
    },
    formDiv: {
        width: "100%",
        marginBottom: "25px",
        marginLeft: "10%",
    },
}));

/**
 * 
 * @param {Object} props
 * @param {String} props.labelTitle
 * @param {String} props.valueProps
 * @param {String} props.nameProps
 * @param {(e:InputEvent)=>{}} props.handleChangeProps
 * @param {[{value:String|Number,text:""}]} props.selectMenuArr
 * @param {React.CSSProperties} props.stylesProps
 * @param {Boolean} props.required
 * @returns 
 */
function MySelect(props = {
    labelTitle: "", valueProps, selectMenuArr, nameProps, required, stylesProps: undefined,
    handleChangeProps: (e) => {
    }
}) {
    let { labelTitle, valueProps, nameProps, selectMenuArr, stylesProps, handleChangeProps } = props
    let classes = useStyles()
    console.log(nameProps)
    return <>
        <FormControl fullWidth style={{ marginBottom: "30px" }}>
            <h5 style={{ color: "black", }}>{labelTitle}</h5>
            <Select id={nameProps}
                value={valueProps}
                onChange={e=>{
                    console.log(e.target.value)
                    return handleChangeProps(e)
                }}
                displayEmpty
                className={classes.textField}
                inputProps={{ 'aria-label': 'Without label'}}
                style={stylesProps}

            >
                {selectMenuArr.map(({ value, text }, index) => <MenuItem
                    key={index} value={value} >{text}</MenuItem>)}
            </Select></FormControl>
    </>
}

/**
 * 
 * @param {Object} props
 * @param {String} props.labelTitle
 * @param {String} props.valueProps
 * @param {String} props.type
 * @param {String} props.placeholder
 * @param {(e:InputEvent)=>{}} props.handleChangeProps
 * @param {[{value:String|Number,text:""}]} props.selectMenuArr
 * @param {React.CSSProperties} props.stylesProps
 * @param {Boolean} props.required
 * @returns 
 */
function MyInput(props = {
    labelTitle: "", valueProps,placeholder, type, selectMenuArr, required, stylesProps: undefined,
    handleChangeProps: (e) => {
    }
}) {
    let { labelTitle, valueProps,placeholder, selectMenuArr, stylesProps, type, handleChangeProps } = props
    let classes = useStyles()
    return <>

        <FormControl fullWidth style={{ marginBottom: "30px" }}>
            <h5 style={{ color: "black", }}>{labelTitle}</h5>
            <Input onChange={handleChangeProps} value={valueProps} placeholder={placeholder}
                name="email" type={type}
                className={classes.textField} />
        </FormControl>
    </>
}

export {
    ItemTemplate, SearchMiniApp, View, LogoSVG, ToTheTop, Loading,
    SessionState, MySelect, MyInput
}