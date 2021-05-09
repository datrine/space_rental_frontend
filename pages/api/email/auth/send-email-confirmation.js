import Cors from "cors"
import axios from 'axios';
import { middlewareRunner } from "../../../../utils/utilFns";
import { serverError } from "../../../../utils/errors";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let { email } = req.body
            console.log(email)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${fetchHost}/auth/send-email-confirmation`,
                method: "post",
                data: { email }
            })
            console.log(response.data)
            if (response.status >= 200 &&response.status<300) {
                return res.json({ ...response.data });
            }else{
               throw  response
            }
        } catch (error) {
            console.log( error)
            let errObj= serverError(error);
            return res.json(errObj);
        }
    }
}