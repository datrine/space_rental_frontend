import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Input, } from "@material-ui/core";
import { Carousel } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { getImgUrl, uploader } from "../../../../utils/utilFns";
import { SpaceContext } from "../index_desc";

function CaroImageView({ }) {
    return <>
        <Caroo />
    </>
}

function Caroo({ imgObjUrls = [] }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { space_pics = [] } = spaceData
    return <>
        <Carousel>
            {space_pics.length > 0 ?
                space_pics.map((imgObj, index) => <Carousel.Item key={index}
                    style={{ width: "100vw", height: "50vh" }} >
                    <img layout="fill" src={getImgUrl(imgObj)} style={{width:"100vw",height:"60vh"}} />
                </Carousel.Item>) : <Carousel.Item style={{ width: "100vw", height: "50vh" }} >
                    <img layout="fill" src="/room_placeholder.jpeg" style={{width:"100vw",height:"60vh"}} />
                </Carousel.Item>}
        </Carousel>
    </>
}

export { CaroImageView }