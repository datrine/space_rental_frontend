import { middlewareRunner } from "../../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
const {validatePayload} = require('verify-aws-sns-signature');
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            await middlewareRunner(req, res, cors);
            let payload=req.body
            console.log(payload)
            let snsPayloadVerified= await validatePayload(payload)
            if (snsPayloadVerified) {
               let res= await axios.get(payload.SubscribeURL)
               console.log(res.data)
            }
        } catch (error) {
            console.table(error?.response?.data?.message[0]?.messages)
            return res.json({ err: error, });
        }
    }
}