import axios from "axios";

async function verifyAccount(data = { account_number: "", account_bank: "" }) {
    try {
        let res = await axios.post("https://api.flutterwave.com/v3/accounts/resolve",
            {
                headers: {
                    "Content-Type": "application/json"
                },
                data
            })
        let fetched = res.data
        console.log(fetched)
    } catch (error) {
        console.log(error)
    }
}

export { verifyAccount }