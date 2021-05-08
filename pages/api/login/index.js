import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import strapiErrors from "../../../utils/strapiErrors"
import { serverError } from "../../../utils/errors";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let { body } = req
            let { identifier, password, role } = body
            console.log(body)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/userprofiles/login`,
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    identifier, password, role
                }
            })
            //console.log(response.data)

            let { user, jwt } = response.data

            return res.json({ user, jwt });
        } catch (error) {
           let serverErrResponse= serverError(error)
           res.json(serverErrResponse) 
        }
    }
}