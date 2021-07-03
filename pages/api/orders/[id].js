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
    let session = await getSession({ req })
    let { user } = session
    try {
        if (req.method === "GET") {
            let { id } = req.query
            if (!Number.isInteger(Number(id))) {
                throw "Id is not a number"
            }
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/orders/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let order = response.data
            //console.log(space)
            return res.json(order);
        }
        else if (req.method === "PUT") {
            let { id } = req.query
            let data = req.body
            //console.log(data)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/orders/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.jwt}`
                },
                data
            })
            let order = response.data
            return res.json(order);
        }
    } catch (error) {
        let errObj = serverError(error)
        let { err, ...errRest } = errObj;
        console.log(errRest)
        res.status(errObj.statusCode);
        return res.json(errObj);
    }
}