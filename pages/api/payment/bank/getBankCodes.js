import { middlewareRunner } from "../../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import { serverError } from "../../../../utils/errors";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            await middlewareRunner(req, res, cors);
            let response = await axios.get("https://api.flutterwave.com/v3/banks/NG",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer FLWSECK-572d8206b308ef15cb08bb7a6781e30c-X`
                    },
                });
            let { data } = response
            if (data.status === "success") {
                //console.log(data)
                return res.json([...data.data]);
            } else {
                res.status(400).json(data)
            }
        } catch (error) {
            //console.log(error)
            let errObj = serverError(error)
            res.status(errObj.statusCode)
            return res.json(errObj);
        }
    }
}