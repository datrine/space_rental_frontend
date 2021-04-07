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
            let { filter="" } = req.body
            //console.log(req.body)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/rooms?${filter}`,
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            let rooms = response.data
            console.log(response.data)
            return res.json({ rooms });

        } catch (error) {
            let errMsg = ""
            let errType = ""
            if (error.response) {
                let errors = error.response?.data;
                errMsg = errors.error
                if (errors?.message) {
                    console.log( errors.message)
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
                console.log(error.request);
                errMsg = "Unable to get response";
                errType = "Network"
            } else {
                console.log('Error', error.message);
                errMsg = error.message;
            }
            return res.json({ err: errMsg, errType });
        }
    }
}