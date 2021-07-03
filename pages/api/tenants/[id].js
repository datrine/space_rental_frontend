import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import { serverError } from "../../../utils/errors";
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
                url: `${process.env.CMS_URL}/tenants/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                data
            })
            let tenant = response.data
            return res.json(tenant);
        }catch(error){
            let errObj = serverError(error)
            let { err, ...errRest } = errObj;
            console.log(errRest)
            res.status(errObj.statusCode);
            return res.json(errObj);
        }
    }
    else if (req.method === "PUT") {
        try {
            let { id } = req.query
            let data = req.body
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/tenants/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                data
            })
            let tenant = response.data
            return res.json(tenant);
        } catch (error) {
            let errObj = serverError(error)
            let { err, ...errRest } = errObj;
            console.log(errRest)
            res.status(errObj.statusCode);
            return res.json(errObj);
        }
    }
}