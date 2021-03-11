import { middlewareRunner } from "../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
let fetchHost = "http://localhost:1337"
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let body = JSON.parse(req.body)
            //console.log(typeof body)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${fetchHost}/users`,
                method: "post",
                data: body
            })
            //console.log(response)
            let { data: user, jwt } = response
            return res.json({ user, jwt });
        } catch (error) {
            console.table(error?.response?.data?.message[0]?.messages)
            return res.json({ err: error, });
        }
    }
}