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
    let userFromSession;
    let session = await getSession({ req })
    if (session) {
        let { user } = session
        userFromSession=user
    }
    try {
        if (req.method === "GET") {
            let { id } = req.query
            if(!id){
                throw "No id"
            }
            console.log("id of residence: "+id)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/residences/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let space = response.data
            //console.log(space)
            if(space)
            return res.json(space);
            else{

            }
        }
        else if (req.method === "PUT") {
            if (!userFromSession) {
                res.status=403;
                throw "No Auth"
            }
            let { id } = req.query
            if (!id) {
                res.status=400;
                throw "No Id"
            }
            let data = req.body
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/residences/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userFromSession.jwt}`
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