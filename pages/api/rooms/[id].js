import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            let { id } = req.query
            let data = req.body
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/rooms/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
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
    else if (req.method === "PUT") {
        try {
            let { id } = req.query
            let data = req.body
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/rooms/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                data
            })
            let room = response.data
            return res.json({ room });
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