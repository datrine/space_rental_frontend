import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import strapiErrors from "../../../utils/strapiErrors";
import { getSession } from "next-auth/client";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "PUT") {
        try {
            let { id } = req.query
            let data = req.body
            console.log("data")
            let session=await getSession({req});
            console.log("data")
            let jwt=session.user.jwt
            console.log(jwt)
            await middlewareRunner(req, res, cors);
            let response = await axios({
                url: `${process.env.CMS_URL}/userprofiles/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${jwt}`
                },
                data
            })
            let user = response.data
            console.log(user)
            return res.json({ user });
        } catch (error) {
           let sorted= strapiErrors(error)
           console.log(sorted)
        }
    }
}