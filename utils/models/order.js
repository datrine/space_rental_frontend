let order = {
    trackingId: 0,
    billingInfo: {},
    userId: 0,
    state: "begun",
    spaceId: 0,
    paymentInfo: {
        via: "e-payment",
        platform: "paystack",
        platformMeta: {},
        type: "full" || "split",
        state: "none" || "incomplete" || "completed"
    }
}

export default order;