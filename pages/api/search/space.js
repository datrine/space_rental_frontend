import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import { serverError } from "../../../utils/errors";
import { getSession } from "next-auth/client";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    let session = await getSession({ req })
    let { user } = session
    console.log(req.method)
    try {

        if (req.method === "GET") {
            let params=new URLSearchParams(req.query);
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/spaces/customSearch?${params}`,
                method: "GET"
            })
            let spaces = response.data
            console.log("length of search result: "+spaces.length)
            return res.json(spaces);
        }
    } catch (error) {
        let errObj = serverError(error)
        let { err, ...errRest } = errObj;
        console.log(errRest)
        res.status(errObj.statusCode);
        return res.json(errObj);
    }
}