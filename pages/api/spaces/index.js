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
    let session=await getSession({req})
    let {user}=session
//console.log(user)
    //get a (filtered) list of spaces
    if (req.method === "GET") {
        try {
            let filter = req.query
            const myURL = new URL(`${process.env.CMS_URL}/spaces`);
            let params= new URLSearchParams(filter)
            myURL.search=params;
            console.log( myURL.href)
           
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${myURL}`,
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${user.jwt}`
                }
            })

            let spaces = response.data
            console.log(spaces.length)
            return res.json({ spaces });

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
    //create a space ad
    if (req.method === "POST") {
        try {
            let data = req.body
            console.log(data)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/spaces`,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${user.jwt}`
                },
                data
            })

            let space = response.data
            return res.json({ space });

        } catch (error) {
            let errorObj=serverError(error)
            return res.json(errorObj);
        }
    }
}