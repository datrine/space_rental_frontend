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
            let body = req.body
            console.log(body)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${fetchHost}/auth/reset-password`,
                method: "post",
                data: body
            })
            console.log(response.data)
            if (response.status >= 200 && response.status < 300) {
                return res.json({ ...response.data });
            } else {
                throw response
            }
        } catch (error) {
            let errObj = serverError(error);
            let {err,...rest}=errObj
            console.log(rest)
            return res.json(errObj);
        }
    }
}