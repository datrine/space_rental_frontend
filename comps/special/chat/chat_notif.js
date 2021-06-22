import { Container } from "@material-ui/core";
import {socket} from "../../../pages/_app"
export default function ChatNotif(params) {
socket.on("connect", () => {
    console.log("Connected to server, view is chatnotif...")
});
    return <><Container>
        <p>fgxcfxfcfxdfgxdzd</p>
    </Container></>
}