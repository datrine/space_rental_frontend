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
    console.log(req.method)
    try {
        if (req.method === "GET") {
            let { id } = req.query
            if(!id){
                throw "No id"
            }
            console.log("id of userSettings: "+id)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/settings/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.jwt}`
                }
            })
            let settingsObj = response.data
            console.log(settingsObj)
            return res.json(settingsObj);
        }
        else if (req.method === "PUT") {
            let { id } = req.query
            let data = req.body
            //console.log(data)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/settings/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.jwt}`
                },
                data
            })
            let space = response.data
            return res.json(space);
        }
    } catch (error) {
        let errObj = serverError(error)
        let { err, ...errRest } = errObj;
        console.log(errRest)
        res.status(errObj.statusCode);
        return res.json(errObj);
    }
}