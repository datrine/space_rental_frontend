import { middlewareRunner } from "../../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
const { validatePayload } = require('verify-aws-sns-signature');
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    console.log(req.method)
    if (req.method === "POST") {
        try {
            await middlewareRunner(req, res, cors);
            let payload = JSON.parse(req.body)
            console.log("payload")
            let snsPayloadVerified = await validatePayload(payload)
            console.log(snsPayloadVerified)
            let response = await axios.get(payload.SubscribeURL)
            console.log(response.data)
        } catch (error) {
            console.log(error)
            return res.json({ err: error, });
        }
    }
}