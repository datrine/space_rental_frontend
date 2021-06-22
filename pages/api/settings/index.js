import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import { getSession } from "next-auth/client";
import { serverError } from "../../../utils/errors";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    let session = await getSession({ req })
    let { user } = session
    //console.log(user)
    //get a (filtered) list of spaces
    if (req.method === "GET") {
        try {
            let filter = req.query
            const myURL = new URL(`${process.env.CMS_URL}/settings`);
            let params = new URLSearchParams(filter)
            myURL.search = params;
            console.log(myURL.href)

            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${myURL}`,
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.jwt}`
                }
            })

            let spaces = response.data
            console.log(spaces.length)
            return res.json(spaces);

        } catch (error) {
            let errObj = serverError(error)
            let { err, ...errRest } = errObj;
            console.log(errRest)
            res.status(errObj.statusCode);
            return res.json(errObj);
        }
    }
    //create a space ad
    if (req.method === "POST") {
        try {
            let data = req.body
            console.log(data)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/settings`,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.jwt}`
                },
                data
            })

            let setting = response.data
            return res.json(setting );

        } catch (error) {
            let errorObj = serverError(error)
            return res.json(errorObj);
        }
    }
}