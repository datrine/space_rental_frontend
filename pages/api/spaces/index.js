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
    if (req.method === "GET") {
        try {
            let filter = req.query
            const myURL = new URL(`${process.env.CMS_URL}/spaces`);
            let params = new URLSearchParams(filter)
            myURL.search = params;

            await middlewareRunner(req, res, cors);
            let headers = {
                "Content-Type": "application/json",
            }
            if (userFromSession) {
                headers["Authorization"] = `Bearer ${userFromSession.jwt}`
            }
            let response = await axios({
                url: `${myURL}`,
                method: "get",
                headers
            })

            let spaces = response.data
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
            let headers = {
                "Content-Type": "application/json",
            }
            if (userFromSession) {
                headers["Authorization"] = `Bearer ${userFromSession.jwt}`
            }
            let response = await axios({
                url: `${process.env.CMS_URL}/spaces`,
                method: "post",
                headers,
                data
            })

            let space = response.data
            return res.json( space);

        } catch (error) {
            let errorObj = serverError(error)
            return res.json(errorObj);
        }
    }
}