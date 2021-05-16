import axios from "axios";

async function verifyAccount(data = { account_number, account_bank }) {
    try {
        let res = await fetch("/api/payment/bank/verifyAccount", {
            method:"post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            let fetched = await res.json()
            //console.log(fetched)
            return fetched
        } else {
            throw await res.json()
        }
    } catch (error) {
        console.log(error)
    }
}


async function getBankCodes() {
    try {
        let res = await axios.get("/api/payment/bank/getBankCodes",
            {
                headers: {
                    "Content-Type": "application/json"
                },
            })
        let data = res.data
        //console.log(data)
        data = data.map(({ code, name }) => ({ bankCode: code, bankName: name }))
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export { verifyAccount, getBankCodes }