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
        console.log(Object.keys(error));
        errMsg = "Unable to get response";
        errType = "Network"
    } else {
        errMsg = error.message;
        errType = "Other"
    }
    return { err, errMsg, errType };
}