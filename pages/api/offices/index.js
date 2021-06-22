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
    let userFromSession;
    let session = await getSession({ req })
    if (session) {
        let { user } = session
        userFromSession = user
    }
    //get a (filtered) list of spaces
    if (req.method === "GET") {
        try {
            let filter = req.query
            const myURL = new URL(`${process.env.CMS_URL}/offices`);
            let params = new URLSearchParams(filter)
            myURL.search = params;
            console.log(myURL.href)

            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${myURL}`,
                method: "get",
                headers: {
                    "Content-Type": "application/json"
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
            if (!userFromSession) {
                res.status = 403
                throw "No Auth"
            }
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/offices`,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userFromSession.jwt}`
                },
                data
            })

            let space = response.data
            return res.json({ space });

        } catch (error) {
            let errorObj = serverError(error)
            return res.json(errorObj);
        }
    }
}