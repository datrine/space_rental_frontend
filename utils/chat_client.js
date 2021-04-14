
const { Manager } = require("socket.io-client");
let manager = {}
let socket = {};
if (typeof window !== "undefined") {
    manager = new Manager(`${process.env.NEXT_PUBLIC_SOCKET_URL}/`, {
        reconnectionDelayMax: 10000,
        query: {
            serviceId: "roomServices001"
        },
        autoConnect: true
    });
    socket = manager.socket()
    console.log("gffgdfdfddd")
    socket.emit("hello", { sender: "client" })
    socket.on("welcome", (msg) => {
        console.log(msg)
    })
}
export { manager, socket };