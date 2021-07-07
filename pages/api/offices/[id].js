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
    let userFromSession;
    let session = await getSession({ req })
    if (session) {
        let { user } = session
        userFromSession = user
    }
    try {
        if (req.method === "GET") {
            let { id } = req.query
            if (!id) {
                throw "No id"
            }
            console.log("id: " + id)
            await middlewareRunner(req, res, cors);
            let headers = {
                "Content-Type": "application/json",
            }
            if (userFromSession) {
                headers["Authorization"] = `Bearer ${userFromSession.jwt}`
            }
            let response = await axios({
                url: `${process.env.CMS_URL}/offices/${id}`,
                method: "GET",
                headers,
            })
            let space = response.data
            //console.log(space)
            if (space)
                return res.json(space);
            else {

            }
        }
        else if (req.method === "PUT") {
            if (!userFromSession) {

            }
            let { id } = req.query
            let data = req.body;
            await middlewareRunner(req, res, cors);
            let headers = {
                "Content-Type": "application/json",
            }
            if (userFromSession) {
                headers["Authorization"] = `Bearer ${userFromSession.jwt}`
            }
            let response = await axios({
                url: `${process.env.CMS_URL}/offices/${id}`,
                method: "PUT",
                headers,
                data
            })
            let space = response.data
            return res.json(space);
        }
    } catch (error) {
        let errObj = serverError(error)
        let { err, ...errRest } = errObj;
        console.log(errRest)
        res.status(errObj.statusCode);
        return res.json(errObj);
    }
}