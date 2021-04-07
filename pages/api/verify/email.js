import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            let {
                query: { email }
            } = req;
            await middlewareRunner(req, res, cors);
            console.log("hereyy")
            let response = await axios.get(`${fetchHost}/users?email_eq=${email}`);
            console.log(response.data)
            if (response.data.length>0) {
                return res.json({ isExistingEmail:true });
            } else {
                res.json({ isExistingEmail: false })
            }
        } catch (error) {
            res.statusCode = 401;
            console.log(error)
            return res.json({ isExistingEmail: false, err: error });
        }
    }
}