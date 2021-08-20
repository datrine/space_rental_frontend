const { Container, Grid, Paper, Button, Input, TextField, makeStyles, FormControl, Select, MenuItem } = require("@material-ui/core");
import { faArrowCircleRight, faArrowLeft, faBars, faHeart as faHeartSolid, faStar, faTimes } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ArrowUpward, Info, Search, Star, StarHalf } from "@material-ui/icons";
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from "prop-types"
import { useEffect, useState, Fragment } from "react";
import View from "../view";
import { useSpring, animated } from 'react-spring'
import { useSession } from "next-auth/client";

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
    const animProps = useSpring({ opacity: 1, from: { opacity: 0 } });

    switch (state) {
        //if state===Loading
        case 1:
            view = <animated.div style={animProps} > <Container name="" fullWidth style={{
                backgroundColor: "rgba(0,0,0,0.5)"
            }} >
                <Grid container justify="center" alignItems="center" style={{ height: "100%" }} >
                    <LogoSVG roofColor={"rgba(96,148,26,0.7)"} bodyColor={"rgba(96,148,26,0.7)"} />

                </Grid>
            </Container>
            </animated.div>
            break;
        case 2:
            view = <Container fullWidth style={{
                backgroundColor: "rgba(0,0,0,0.8)"
            }} >
                <Grid container justify="center" alignItems="center" style={{ height: "100vh" }}>
                    <LogoSVG roofColor={"rgba(96,148,26,0.7)"} bodyColor={"rgba(96,148,26,0.7)"} />
                </Grid>
            </Container>
            break;
        //same as state==Loading
        default:
            view = <animated.div style={animProps} > <Container name="" style={{
                backgroundColor: "rgba(0,0,0,0.5)"
            }} >
                <Grid container justify="center" alignItems="center" style={{ height: "100%" }} >
                    <LogoSVG roofColor={"rgba(96,148,26,0.7)"} bodyColor={"rgba(96,148,26,0.7)"} />

                </Grid>
            </Container>
            </animated.div>
            break;
    }

    return <>
        {view}
    </>
}

export {
    View, LogoSVG, Loading,
}