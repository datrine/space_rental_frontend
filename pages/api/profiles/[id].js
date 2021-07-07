import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import strapiErrors from "../../../utils/strapiErrors";
import { getSession } from "next-auth/client";
import { serverError } from "../../../utils/errors";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @returns 
 */
export default async function handler(req, res) {
    let userFromSession;
    let session = await getSession({ req })
    if (session) {
        let { user } = session
        userFromSession = user
    }
    try {
        let { id } = req.query
        let data = req.body
        await middlewareRunner(req, res, cors);
        let response;
        let headers = {
            "Content-Type": "application/json",
        }
        if (userFromSession) {
            headers["Authorization"] = `Bearer ${userFromSession.jwt}`
        }
        if (req.method === "GET") {
            response = await axios({
                url: `${process.env.CMS_URL}/userprofiles/${id}`,
                method: "GET",
                headers,
                data
            });
        }
        else if (req.method === "PUT") {
            let headers = {
                "Content-Type": "application/json",
            }
            if (userFromSession) {
                headers["Authorization"] = `Bearer ${userFromSession.jwt}`
            }
            response = await axios({
                url: `${process.env.CMS_URL}/userprofiles/${id}`,
                method: "PUT",
                headers,
                data
            })
        }
        let profile = response.data
        return res.json(profile);
    } catch (error) {
        let errObj = serverError(error)
        let { err, ...errRest } = errObj;
        console.log(errRest)
        res.status(errObj.statusCode);
        return res.json(errObj);
    }
}