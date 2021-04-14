import { Button, Container, Tab, Tabs } from "@material-ui/core"
const { Comment, ArrowBack } = require("@material-ui/icons")
const { useState, useEffect } = require("react");
import ChatNotif from "./chat_notif";
import MessagesStack from "./messages";
import PropTypes from "prop-types"
import ChatPage from "./chat_page";
import { ChatHeadNav } from "./chatNav";
import { manager, socket } from "../../../utils/chat_client";
import { useSession } from "next-auth/client";

export default function ChatApp({ tabValue = "messages" }) {
    let [tabValueState, changeTabValue] = useState(tabValue)
    let[session,loading]= useSession()
    useEffect(()=>{
        if(session){
        console.log("gfgvvgh")
        socket.emit("hello",{sender:session.user.username})}
    },)
    return <>
        <ChatHeadNav showBackUrl={false} />
        <Container>
            <Tabs value={tabValueState} indicatorColor="primary" onChange={
                (e, value) => {
                    changeTabValue(value);
                }
            } >
                <Tab label="Messages" value="messages" />
                <Tab label="Notification" value="chat_notif" />
            </Tabs>
            <TabPanel value="messages" index={tabValueState}>
                <Container>
                    <MessagesStack hookChangeTabValue={changeTabValue} />
                </Container>
            </TabPanel>
            <TabPanel value="chat_notif" index={tabValueState}>
                <Container>
                    <ChatNotif />
                </Container>
            </TabPanel>
        </Container>
    </>
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div className="container-fluid p-0"
            role="tabpanel"
            hidden={value !== index}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

