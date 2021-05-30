import { faFile, faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, Grid, Tab, Tabs, TextField } from "@material-ui/core"
import { socket } from "../../../pages/_app";
import { ChatHeadNav } from "./chatNav";
const { Comment, ArrowBack, EmojiEmotions, Send, PictureInPicture, FileCopyRounded, PictureInPictureAltRounded } = require("@material-ui/icons")
const { useState } = require("react");

export default function ChatPage({ }) {
    return <>
        <ChatHeadNav backUrl="/chats" showBackUrl={true} />
        <Container>
            <Container style={{ position: "absolute", bottom: 10, padding: 0 }} >
                <Grid container>
                    <Grid item xs={1}>
                        <EmojiEmotions />
                    </Grid>
                    <Grid container item xs={8}>
                        <TextField fullWidth style={{ display: "inline" }} />
                    </Grid>
                    <Grid item xs={3} >
                        <button className="btn" style={{ padding: 0, marginLeft: "5px" }}>
                            <FontAwesomeIcon icon={faPhotoVideo} /></button>
                        <button onClick={
                            e=>{
                                socket
                            }
                        } className="btn" style={{ padding: 0, marginLeft: "5px" }}>
                            <Send /></button>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    </>
}


