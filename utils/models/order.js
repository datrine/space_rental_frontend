let order = {
    trackingId: null,
    billingInfo: {},
    userId: null,
    state: "begun",
    spaceId: null,
    amountToPay:undefined,
    paymentInfo: {
        via: "e-payment",
        platform: "paystack",
        platformMeta: {},
        type: "full" || "split",
        state: "none" || "incomplete" || "completed"
    },
    spaceMeta: {
        "datesToStayInfo": {
            "dateMode": "",
            "dateRangeStrings": {
                "to": "",
                "from": ""
            },
            "singleDatesStrings": []
        }
    }
}

export default order;