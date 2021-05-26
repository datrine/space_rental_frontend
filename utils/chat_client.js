import { nanoid } from "nanoid";
import { getSession } from "next-auth/client";
import { chatTemplate } from "./socket_template";

const { Manager, Socket } = require("socket.io-client");
   let startSocket= async () => {
        /**
         * @type {Manager}
         */
        let manager;
        /**
         * @type {Socket}
         */
        let socket;
        let timer1;
        let room_id= await getRoomId()
        manager = new Manager(`${process.env.NEXT_PUBLIC_SOCKET_URL}/`, {
            reconnectionDelayMax: 10000,
            query: {
                serviceId: "myspace4you"
            },
            autoConnect: true,
            path: "/",
        });
        console.log("Socket manager")
        socket = manager.socket("/",{
            auth:{
                room_id,

            }
        });

        socket.on("connect", () => {
            console.log("Connected to server...")
        });

        socket.onAny((evt,data,ack)=>{
            console.log(evt)
            console.log(data)
        })

        //self-trigger after 5secs of lack of response from server
        timer1 = setTimeout(() => {
            (async () => {
                let room_id = await getRoomId()
                socket.emit("room_id", { room_id }, ack => {
                    console.log("Server has registered room_id..." + data.room_id);
                    ack({ msg: "'room_registered' event acknowledged" });
                })();
            });
        }, 5000);


        //self-trigger after 5secs of lack of response from server
        setInterval(() => {
            let data = chatTemplate
            data.msg = "Hello"
            let sender_id= data.sender_id|| socket.auth.room_id;
            data.sender_id=sender_id
            socket.emit("to_client", data, ack => {
                console.log("Message sent to recipient..." + data.reciepient_id);
                ack({ msg: "client message sent" });
            });
        }, 10000);

        //
        socket.on("no_sender_id", (data, ack) => {
            console.log(data);
        });

        return socket;
    }


async function getRoomId() {
    let session = await getSession();
    let room_id = session?.user?.email || nanoid();
    console.log("room_id generated: " + room_id)
    return room_id
}

export { startSocket};