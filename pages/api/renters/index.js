import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import qs from "qs";
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
            let { query } = req
            let params = qs.stringify(query)
            await middlewareRunner(req, res, cors);
            let headers = {
                "Content-Type": "application/json",
            }
            if (userFromSession) {
                headers["Authorization"] = `Bearer ${userFromSession.jwt}`
            }
            let response = await axios({
                url: `${fetchHost}/renters?${params}`,
                method: "get",
                headers,
            });
            let renters = response.data
            console.log(renters)
            return res.json(renters);
        } catch (error) {
            let errObj = serverError(error);
            console.log(errObj.errMsg);
            res.status(errObj.statusCode);
            return res.json(errObj);
        }
    }
    if (req.method === "POST") {
        try {
            let data = req.body
            await middlewareRunner(req, res, cors);
            let headers = {
                "Content-Type": "application/json",
            }
            if (userFromSession) {
                headers["Authorization"] = `Bearer ${userFromSession.jwt}`
            }
            let response = await axios({
                url: `${process.env.CMS_URL}/renters/`,
                method: "POST",
                headers,
                data
            })
            let user = response.data
            return res.json({ user });
        } catch (error) {
            let errMsg = ""
            let errType = ""
            if (error.response) {
                let errors = error.response.data;
                errMsg = errors.error
                if (errors.message) {
                    errors.message.forEach(msgObj => {
                        msgObj.messages.forEach(errObj => {
                            errMsg += ": " + errObj.message;
                            if (errObj.message.includes("password")) {
                                errType = "Parameter_Error"
                            }
                        });
                    });
                }
            } else if (error.request) {
                console.log("error.request");
                errMsg = "Unable to get response";
                errType = "Network"
            } else {
                //console.log('Error', error.message);
                errMsg = error.message;
            }
            return res.json({ err: errMsg, errType });
        }
    }
}