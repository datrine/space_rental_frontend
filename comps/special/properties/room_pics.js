import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Input, } from "@material-ui/core";

import { Carousel } from "react-bootstrap";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { SpaceChargesDiv } from './spaceBills';
import { SpaceAvailabilityDiv } from './spaceAvail';
import { getImgUrl, uploader } from "../../../utils/utilFns";
import { RoomContext } from "./room_prop";

function AddImageView({ urlsProps = [], onSuccess = () => { }, onFail = () => { } }) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let { room_pics } = roomData
    return <>
        <Container>
            <Grid justify="center" container >
                {room_pics.length > 0 ? <Caroo imgObjUrls={room_pics} /> :
                    <Image width={300} height={300} src="/camera_placeholder.jpg" />}
            </Grid>
        </Container>
        <Container style={{ width: 300, marginTop: 20 }} >
            <Grid justify="space-evenly" container >
                <AddBtn index={0} />
                <AddBtn index={1} />
                <AddBtn index={2} />
                <AddBtn index={3} />
                <AddBtn index={4} />
            </Grid>
        </Container>
    </>
}

function Caroo({ imgObjUrls = [] }) {
    return <>
        <Carousel>
            {imgObjUrls.map((imgObj, index) => imgObj ? <Carousel.Item key={index} >
                <img width={300} height={300} src={getImgUrl(imgObj)} />
            </Carousel.Item> : null)}
        </Carousel>
    </>
}

function AddBtn({ index, }) {
    let ctx = useContext(RoomContext)
    let { roomData, changeRoomContext } = ctx
    let [isPic, changeIsPic] = useState(roomData.room_pics[index] ? true : false)
    return <>
        <label className="w3-btn" style={{
            backgroundColor: isPic ? "#60941a" : "rgba(189, 195, 199, 1)",
        }}>
            <Input type="file" onChange={
                async e => {
                    try {
                        let files = e.target.files
                        let { data: dataUploaded, err } = await uploader({
                            files,
                            ref: "file",
                            refId: index,
                            field: "room_pics",
                            source: "upload",
                        })
                        if (dataUploaded) {
                            roomData.room_pics[index] = dataUploaded[0]
                            changeIsPic(true)
                            changeRoomContext({ ...roomData })
                        }

                    } catch (error) {
                        console.log(error)
                    }
                }
            } style={{ display: "none" }} />
            <span>
                <FontAwesomeIcon size="1x" icon={faPlus}
                    style={{
                        color: isPic ? "white" : "#60941a",
                    }} />
            </span>
        </label>
    </>
}

export {
    AddImageView,
}