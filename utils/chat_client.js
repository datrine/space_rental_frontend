
const { Manager } = require("socket.io-client");

const manager = new Manager(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
    reconnectionDelayMax: 10000,
    query: {
        serviceId: "roomServices001"
    },
    autoConnect:true
});

export { manager };