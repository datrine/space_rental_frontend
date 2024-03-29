let order = {
    id:undefined,
    trackingId: null,
    billingInfo: {},
    userId: null,
    tenantId: null,
    renterId: null,
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