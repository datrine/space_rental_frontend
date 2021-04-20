import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let { strapiToken, strapiProfileId } = req.body
            console.log(req.body)
            await middlewareRunner(req, res, cors);
            let url=`${process.env.CMS_URL}/userprofiles/${strapiProfileId}`;
            let response = await fetch(url, {
                method: "get",
                mode:"cors",
                headers: {
                    "Authorization": `Bearer ${strapiToken}`
                }
            })

            let data =await response.json()
            let user = data

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
            return res.json({ isAccount: false, err: errMsg, errType });
        }
    }
}