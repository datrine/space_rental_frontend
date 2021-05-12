import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Input, } from "@material-ui/core";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { getImgUrl, uploader } from "../../../../utils/utilFns";
import { SpaceContext } from "../index_desc";

function CaroImageView({ }) {
    return <>
        <Caroo />
    </>
}

function Caroo({ imgObjUrls = [] }) {
    let ctx=useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { space_pics=[] } = spaceData
    return <>
        <Carousel>
            {space_pics.map((imgObj, index) => imgObj ? <Carousel.Item key={index}
             style={{width:"100vw",height:"50vh"}} >
                <Image layout="fill" src={getImgUrl(imgObj)} />
            </Carousel.Item> : null)}
        </Carousel>
    </>
}

export { CaroImageView }