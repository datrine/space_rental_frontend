import Cors from "cors"
import axios from 'axios';
import { middlewareRunner } from "../../../utils/utilFns";
import { serverError } from "../../../utils/errors";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    console.log(req.method)
    if (req.method === "POST") {
        try {
            let { email } = req.body
            console.log(email);
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${fetchHost}/auth/forgot-password`,
                method: "post",
                data: { email }
            })
            //console.log(response)
            if (response.status === 200) {
                return res.json({ ...response.data });
            }
        } catch (error) {
            let errObj = serverError(error);
            let {err,...rest}=errObj
            console.log(rest)
            return res.json(errObj);
        }
    }
}