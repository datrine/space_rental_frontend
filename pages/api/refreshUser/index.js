import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import { serverError } from "../../../utils/errors";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let { strapiToken, strapiProfileId } = req.body
            console.log(req.body)
            await middlewareRunner(req, res, cors);
            let url=`${process.env.CMS_URL}/userprofiles/${strapiProfileId}`;
            let response = await fetch(url, {
                method: "get",
                mode:"cors",
                headers: {
                    "Authorization": `Bearer ${strapiToken}`
                }
            })

            let data =await response.json();

            let profile = data
            return res.json({ profile });

        } catch (error) {
            let errObj = serverError(error)
            let { err, ...errRest } = errObj;
            console.log(errRest)
            res.status(errObj.statusCode);
            return res.json(errObj);
        }
    }
}