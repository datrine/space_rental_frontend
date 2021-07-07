import { middlewareRunner } from "../../../../utils/utilFns"
import Cors from "cors"
import axios from 'axios';
import { serverError } from "../../../../utils/errors";
let fetchHost = process.env.CMS_URL
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let data = req.body
            await middlewareRunner(req, res, cors);
            let response = await axios(
                {
                    method: "POST",
                    url: "https://api.flutterwave.com/v3/accounts/resolve",
                    headers: {
                        "Authorization": `Bearer FLWSECK-572d8206b308ef15cb08bb7a6781e30c-X`,
                        "Proxy-Authorization": `Bearer FLWSECK-572d8206b308ef15cb08bb7a6781e30c-X`,
                    },
                    data: {
                        "account_number": `${data.account_number}`,
                        "account_bank": `${data.account_bank}`
                    }
                });
            ({ data } = response);
            console.log(data)
            if (data.status === "success") {
                data = data.data
                return res.json({ accountNumber: data.account_number, accountName: data.account_name })
            }
        } catch (error) {
            let errObj = serverError(error)
            console.log(errObj.errMsg)
            res.status(errObj.statusCode)
            return res.json(errObj);
        }
    }
}