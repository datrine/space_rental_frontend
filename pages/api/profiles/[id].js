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
    try {
        let { id } = req.query
        let data = req.body
        let session = await getSession({ req });
        console.log("id: "+id)
        let jwt = session.user.jwt
        await middlewareRunner(req, res, cors);
        let response;
        if (req.method === "GET") {
            response = await axios({
                url: `${process.env.CMS_URL}/userprofiles/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                data
            });
        }
        else if (req.method === "PUT") {
            response = await axios({
                url: `${process.env.CMS_URL}/userprofiles/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
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