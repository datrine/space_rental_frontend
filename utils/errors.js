import strapiErrors from "./strapiErrors";

export let serverError = (error) => {
    let errMsg = ""
    let errType = ""
    let err = error;
    if (error.response) {
        let { statusCode, statusMsg, errObj } = strapiErrors(error.response, 'axios')
        errType = "Response"
        errMsg = statusMsg;
        return { err, errMsg, errType, statusCode, errObj };
    } else if (error.request) {
        let statusCode = 503;
        console.log(Object.keys(error));
        errMsg = "Unable to get response";
        errType = "Network"
        return { statusCode: 503, err, errMsg, errType };
    } else {
        let statusCode = 500;
        errMsg = error.message;
        errType = "Other"
        return { statusCode: 500, err, errMsg, errType };
    }
}