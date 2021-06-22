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
                url: `${process.env.CMS_URL}/renters/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                data
            })
            let renter = response.data
            return res.json(renter);
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
                url: `${process.env.CMS_URL}/renters/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                data
            })
            let renter = response.data
            return res.json(renter);
        } catch (error) {
            let errObj = serverError(error)
            let { err, ...errRest } = errObj;
            console.log(errRest)
            res.status(errObj.statusCode);
            return res.json(errObj);
        }
    }
}