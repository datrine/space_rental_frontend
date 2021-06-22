import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import nanoid from "nanoid"
import { getSession } from "next-auth/client";
import { serverError } from "../../../utils/errors";
import qs from "qs";
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
    let session = await getSession({ req })
    let { user } = session
    if (req.method === "GET") {
        try {
            let { query } = req
            let params= qs.stringify(query)
            //let url = new URL(req.url)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${fetchHost}/orders/fetch?${params}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.jwt}`
                },
                method: "get"
            });
            let orders = response.data
            console.log("orders");
            console.log(orders&&orders.length);
            return res.json(orders);
        } catch (error) {
            let errObj = serverError(error);
            console.log(errObj.errMsg);
            res.status(errObj.statusCode);
            return res.json(errObj);
        }
    }
}