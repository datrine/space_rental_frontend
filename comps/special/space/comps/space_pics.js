import { faCheckCircle, faExclamationCircle, faPlus, faSpinner, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, Input, } from "@material-ui/core";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { getImgUrl, uploader } from "../../../../utils/utilFns";
import { SpaceContext } from "../../../resuables/contextInterfaces"

function AddImageView({ }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { space_pics } = spaceData
    return <>
        <Container>
            <Grid justify="center" container >
                {space_pics.length > 0 ? <Caroo imgObjUrls={space_pics} /> :
                    <Image width={300} height={300} src="/camera_placeholder.jpg" />}
            </Grid>
        </Container>
        <Container style={{  marginTop: 20 ,padding:0}} >
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
    let screenWidth = window.screen.width
    return <>
        <Carousel>
            {imgObjUrls.map((imgObj, index) => imgObj ? <Carousel.Item key={index} >
                <img width={Math.min((screenWidth * 80 / 100), 300)} height={300} src={getImgUrl(imgObj)} />
            </Carousel.Item> : null)}
        </Carousel>
    </>
}

function AddBtn({ index, }) {
    let ctx = useContext(SpaceContext)
    let { spaceData, changeSpaceContext } = ctx
    let { space_pics } = spaceData
    let [isPic, changeIsPic] = useState((space_pics[index] && space_pics[index].id) ? true : false);
    let [uploadingState, changeUploadingState] = useState(isPic ? "success" : "none");
    let view = null;
    switch (uploadingState) {
        case "none":
            view = <>
                <Input type="file" onChange={
                    async e => {
                        try {
                            let files = e.target.files
                            changeUploadingState("uploading")
                            let { data: dataUploaded, err } = await uploader({
                                files,
                                ref: "file",
                                refId: spaceData.id || index,
                                path: "spaces",
                                field: "space_pics",
                                source: "upload",
                            })
                            if (dataUploaded) {
                                spaceData.space_pics[index] = dataUploaded[0]
                                changeIsPic(true)
                                changeSpaceContext({ ...spaceData })
                                changeUploadingState("success")
                            }
                        } catch (error) {
                            console.log("error")
                            changeUploadingState("failure")
                            setTimeout(() => {
                                changeUploadingState("none")
                            }, 5000)
                        }
                    }
                } style={{ display: "none" }} />
                <span>
                    <FontAwesomeIcon size="1x" icon={faPlus}
                        style={{
                            color: isPic ? "white" : "#60941a",
                        }} />
                </span>
            </>
            break;
        case "uploading":
            view = <>
                <span>
                    <FontAwesomeIcon size="1x" icon={faSpinner} spin
                        style={{
                            color: "white"
                        }} />
                </span></>
            break;
        case "success":
            view = <>
                <span>
                    <FontAwesomeIcon size="1x" icon={faCheckCircle}
                        style={{
                            color: "white",
                        }} />
                </span></>
            break;
        case "failure":
            view = <>
                <span>
                    <FontAwesomeIcon size="1x" icon={faExclamationCircle}
                        style={{
                            color: "red",
                        }} />
                </span></>
            break;
        default:
            break;
    }
    return <>
        <label className="w3-btn" style={{
            backgroundColor: isPic ? "#60941a" : "rgba(189, 195, 199, 1)",
        }}>
            {view}
        </label>
    </>
}

export { AddImageView }