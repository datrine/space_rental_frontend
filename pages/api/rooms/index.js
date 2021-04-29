import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import { getSession } from "next-auth/client";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    let session=await getSession({req})
    let {user}=session
//console.log(user)
    //get a (filtered) list of rooms
    if (req.method === "GET") {
        try {
            let filter = req.query
            const myURL = new URL(`${process.env.CMS_URL}/rooms`);
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

            let rooms = response.data
            console.log(rooms.length)
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
    //create a room ad
    if (req.method === "POST") {
        try {
            let data = req.body
            //console.log(data)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/rooms`,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${user.jwt}`
                },
                
                data
            })

            let room = response.data
            return res.json({ room });

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