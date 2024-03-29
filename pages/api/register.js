import { middlewareRunner } from "../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let body = JSON.parse(req.body)
            console.log(body)
            let { repass, ...filteredData } = body
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${fetchHost}/userprofiles`,
                method: "post",
                data: filteredData
            })
            console.log(response.data)
            let { user } = response.data
            return res.json({ user });
        } catch (error) {
            console.table(error?.response?.data?.message[0]?.messages)
            return res.json({ err: error, });
        }
    }
}