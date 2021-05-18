import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import nanoid from "nanoid"
import { getSession } from "next-auth/client";
import { serverError } from "../../../utils/errors";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    let session=await getSession({req})
    let {user}=session
    if (req.method === "GET") {
        try {
            let {userId} =req.query
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${fetchHost}/orders/fetch?userId=${userId}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${user.jwt}`
                },
                method: "get"
            });
            let order = response.data
            console.log(order);
            return res.json({ order });
        } catch (error) {
            let errObj = serverError(error);
            console.log(errObj.errMsg);
            res.status(errObj.statusCode);
            return res.json(errObj);
        }
    }
}