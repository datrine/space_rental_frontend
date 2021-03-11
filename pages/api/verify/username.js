import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
let fetchHost = "http://localhost:1337"
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            let {
                query: { username }
            } = req;
            await middlewareRunner(req, res, cors);
            console.log("hereeeyy")
            console.log(username)
            let response = await axios.get(`${fetchHost}/users?username_eq=${username}`);
            console.log(response.data)
            if (response.data.length>0) {
                return res.json({ isExistingUsername:true });
            } else {
                res.json({ isExistingUsername: false })
            }
        } catch (error) {
            res.statusCode = 401;
            console.log(error)
            return res.json({ isExistingUsername: false, err: error });
        }
    }
}