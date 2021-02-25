import { middlewareRunner } from "../../../utils/utilFns"
import Cors from "cors"
import got from "got";
let fetchHost = "http://localhost:1337"
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let {
                query: { usernameOrEmail }
            } = req
            await middlewareRunner(req, res, cors);
            let response = await got.post(`renters/${usernameOrEmail}`, {
                prefixUrl: fetchHost,
                json: {
                    usernameOrEmail
                },responseType:"json"
            })
            let body = response.body
            console.log(body[0]);
            console.log(Array.isArray(body));
            if (Array.isArray(body)) {
                console.log(body);
                if (body.length > 0) {
                    return res.json({ isAccount: true, ...body[0] });
                } else {
                    res.json({ isAccount: false })
                }
            }
            else {
                res.json({ isAccount: false })
            }
        } catch (error) {
            res.statusCode = 401;
            console.log(error)
            return res.json({ isAccount: false, err: error, ...body });
        }
    }
}