import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import {nanoid} from "nanoid"
import { serverError } from "../../../utils/errors";
import { getSession } from "next-auth/client";
import qs from "qs";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    let session=await getSession({req})
    let {user}=session
    if (req.method === "GET") {
        try {
            let {query} = req
            let params= qs.stringify(query)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${fetchHost}/orders?${params}`,
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${user.jwt}`
                },
            });
            let orders = response.data
            console.log(orders);
            return res.json(orders );
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
            data.trackingId = nanoid();
            data.userId = user.userId;
            console.log(`${fetchHost}/orders`)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${fetchHost}/orders`,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${user.jwt}`
                },
                data
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