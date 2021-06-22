import { nanoid } from "nanoid";
import { getSession } from "next-auth/client";
import { chatTemplate } from "./socket_template";
import PubSub from 'pubsub-js'
let mode = "fast";
let fetchCount = 0;
let msgCount = 0;
let opts = {
    skip: 0, earliestTimeReadISO: "", earliestId: "", latestTimeReadISO: "",
    latestId: "", limit: 5, currentPeer: "", currentGroup: "",
    mode: "fast"
}
const { Manager, Socket } = require("socket.io-client");
let startSocket = async () => {
    /**
     * @type {Manager}
     */
    let manager;
    /**
     * @type {Socket}
     */
    let socket;
    let timer1;
    let room_id = await getRoomId()
    manager = new Manager(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
        reconnectionDelayMax: 10000,
        query: {
            serviceId: "myspace4you"
        },
        autoConnect: true,
        path: "/chats",
    });
    console.log("Socket manager");

    socket = manager.socket("/", {
        auth: {
            room_id,
            ...opts
        }
    });

    socket.on("connect", () => {
        console.log("Connected to server...")
    });

    socket.onAny((evt, data, ack) => {
        //console.log(evt)
        // console.log(data)
    })

    socket.on("client_msg", (data, ack) => {
        data.time_stamp_client_received = new Date().toISOString()
        opts.latestId = data._id;
        opts.latestTimeReadISO = data.time_stamp_server_received
        if (mode === "sync") {
            ack({ mode, ...opts });
        } else if (mode === "fast") {
            ack({ fetchCache: false });
        }
    });

    socket.on("back_log", (data, ack) => {
        data.time_stamp_client_received = new Date().toISOString()
        opts.earliestId = data._id;
        opts.earliestTimeReadISO = data.time_stamp_server_received
        fetchCount += 1
        if (data.start === true) {
            console.log("Start");
        }
        if (data.end === true) {
            msgCount = 0;
            let fetchDirectives = { limit: 5, ...opts }
            if (fetchCount <= 50) {
                ack(fetchDirectives)
            }
        }
    });

    //
    socket.on("no_sender_id", (data, ack) => {
    });

    return socket;
}


async function getRoomId() {
    let session = await getSession();
    let room_id = session?.user?.email || nanoid();
    // console.log("room_id generated: " + room_id)
    return room_id
}

export { startSocket, PubSub };